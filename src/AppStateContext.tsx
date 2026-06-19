import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { UserStats, CertificateInfo, GitHubInfo } from './types';
import { db, auth } from './lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, GithubAuthProvider, onAuthStateChanged, signOut, User, getAdditionalUserInfo } from 'firebase/auth';

interface AppStateContextType {
  stats: UserStats;
  user: User | null;
  loading: boolean;
  theme: 'light' | 'dark';
  toggleSolved: (id: string) => void;
  isSolved: (id: string) => boolean;
  updateVJudgeId: (id: string) => void;
  requestCertificate: (topicSlug: string, topicName: string, recipientName: string) => Promise<void>;
  completeLesson: (lessonId: string, xpReward: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  toggleTheme: () => void;
  loginWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
  setGitHubInfo: (info: GitHubInfo) => void;
  checkGitHubStar: () => Promise<boolean>;
}

const DEFAULT_STATS: UserStats = {
  solvedIds: [],
  certificates: {},
  solvedAt: {},
  xp: 0,
  completedLessonIds: []
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codepath_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);

  // Persistence Key
  const LOCAL_STORAGE_KEY = 'codepath_stats';

  // 1. Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        // Carry over local storage if not logged in
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localData) {
          try {
            setStats({ ...DEFAULT_STATS, ...JSON.parse(localData) });
          } catch (e) {}
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Sync from Firestore (if logged in)
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsub = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as UserStats;
        setStats(prev => ({
          ...prev,
          ...data,
          // Keep local session info like tokens if they were just acquired
          github: { ...data.github, ...prev.github } as GitHubInfo 
        }));
      } else {
        // Initial sync: push local stats to Firestore
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            setDoc(doc(db, 'users', user.uid), parsed);
          } catch (e) {}
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  // 3. Save to Local & Remote
  const saveStats = useCallback(async (newStats: UserStats) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStats));
    
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), newStats);
      } catch (e) {
        console.error("Firestore sync error", e);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      saveStats(stats);
    }
  }, [stats, loading, saveStats]);

  // Optimization: Pre-calculate Sets for O(1) lookups
  const solvedSet = useMemo(() => new Set(stats.solvedIds), [stats.solvedIds]);
  const completedLessonSet = useMemo(() => new Set(stats.completedLessonIds || []), [stats.completedLessonIds]);

  const toggleSolved = useCallback((id: string) => {
    setStats(prev => {
      const alreadySolved = prev.solvedIds.includes(id);
      const now = Date.now();
      const newSolvedAt = { ...(prev.solvedAt || {}) };

      if (alreadySolved) {
        delete newSolvedAt[id];
      } else {
        newSolvedAt[id] = now;
      }

      return {
        ...prev,
        solvedIds: alreadySolved
          ? prev.solvedIds.filter(i => i !== id)
          : [...prev.solvedIds, id],
        solvedAt: newSolvedAt
      };
    });
  }, []);

  const isSolved = useCallback((id: string) => solvedSet.has(id), [solvedSet]);

  const updateVJudgeId = useCallback((vjudgeId: string) => {
    setStats(prev => ({ ...prev, vjudgeId }));
  }, []);

  const setGitHubInfo = useCallback((info: GitHubInfo) => {
    setStats(prev => ({ ...prev, github: info }));
  }, []);

  const loginWithGitHub = useCallback(async () => {
    const provider = new GithubAuthProvider();
    provider.addScope('user,public_repo');
    
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const firebaseUser = result.user;
      const additionalInfo = getAdditionalUserInfo(result);
      
      if (token) {
        setGitHubInfo({
          token,
          username: (additionalInfo?.profile as any)?.login || firebaseUser.displayName || 'user',
          name: firebaseUser.displayName || (additionalInfo?.profile as any)?.login || 'User',
          avatar: firebaseUser.photoURL || '',
          isStarred: false
        });
      }
    } catch (error) {
      console.error("GitHub Login failed", error);
    }
  }, [setGitHubInfo]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setStats(DEFAULT_STATS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error("Logout failed", e);
    }
  }, []);

  const checkGitHubStar = useCallback(async (): Promise<boolean> => {
    if (!stats.github?.token || !stats.github?.username) return false;
    
    try {
      const res = await fetch('/api/github/check-star', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: stats.github.token,
          username: stats.github.username
        })
      });
      const data = await res.json();
      
      if (data.starred) {
        setStats(prev => ({
          ...prev,
          github: { ...(prev.github!), isStarred: true }
        }));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Star check failed", e);
      return false;
    }
  }, [stats.github]);

  const requestCertificate = useCallback(async (topicSlug: string, topicName: string, recipientName: string) => {
    // Generate unique ID
    const certId = `CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    
    setStats(prev => {
      const certInfo: CertificateInfo = {
        id: certId,
        status: 'issued',
        recipientName,
        topicSlug,
        topicName,
        issuedAt: Date.now(),
        githubUsername: prev.github?.username,
        verificationUrl: `${window.location.origin}/verify/${certId}`
      };

      return {
        ...prev,
        certificates: {
          ...(prev.certificates || {}),
          [topicSlug]: certInfo
        }
      };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, xpReward: number) => {
    setStats(prev => {
      const completed = prev.completedLessonIds || [];
      if (completed.includes(lessonId)) return prev;

      return {
        ...prev,
        completedLessonIds: [...completed, lessonId],
        xp: (prev.xp || 0) + xpReward
      };
    });
  }, []);

  const isLessonCompleted = useCallback((lessonId: string) => completedLessonSet.has(lessonId), [completedLessonSet]);

  const contextValue = useMemo(() => ({
    stats, user, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme,
    setGitHubInfo, checkGitHubStar, loginWithGitHub, logout
  }), [
    stats, user, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme,
    setGitHubInfo, checkGitHubStar, loginWithGitHub, logout
  ]);

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
