import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, CertificateInfo } from './types';
import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, handleFirestoreError, OperationType } from './lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove, collection, serverTimestamp } from 'firebase/firestore';

interface AppStateContextType {
  stats: UserStats;
  user: User | null;
  loading: boolean;
  theme: 'light' | 'dark';
  login: () => Promise<void>;
  logout: () => Promise<void>;
  toggleSolved: (id: string) => Promise<void>;
  isSolved: (id: string) => boolean;
  updateVJudgeId: (id: string) => Promise<void>;
  requestCertificate: (topicSlug: string, vjudgeId: string) => Promise<void>;
  toggleTheme: () => void;
}

const DEFAULT_STATS: UserStats = {
  solvedIds: [],
  certificates: {}
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codepath_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('codepath_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Clear stats on logout or load guest state
        const saved = localStorage.getItem('codepath_stats_guest');
        setStats(saved ? JSON.parse(saved) : DEFAULT_STATS);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('codepath_stats_guest', JSON.stringify(stats));
      return;
    }

    const userDoc = doc(db, 'users', user.uid);
    const unsubscribeStats = onSnapshot(userDoc, (docSnap) => {
      let currentStats: UserStats;
      if (docSnap.exists()) {
        currentStats = docSnap.data() as UserStats;
      } else {
        // Initialize user in firestore
        currentStats = { ...DEFAULT_STATS };
        setDoc(userDoc, currentStats).catch(err => handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`));
      }

      // Hardcoded admin check for the user
      if (user.email === 'ismailtonmoy478@gmail.com') {
        currentStats.isAdmin = true;
      }
      
      setStats(currentStats);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
    });

    return () => unsubscribeStats();
  }, [user]);

  const login = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn('Login popup was closed before completion.');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Authentication popup was blocked by your browser. Please allow popups for this site or try a different browser.');
      } else if (error.code === 'auth/unauthorized-domain') {
        alert(`This domain is not authorized for Firebase Authentication. Please add it to the Authorized Domains in your Firebase Console.`);
      } else {
        console.error('Login error:', error);
        alert('Login failed: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSolved = async (id: string) => {
    const alreadySolved = stats.solvedIds.includes(id);
    const now = Date.now();
    
    // Optimistic update
    setStats(prev => {
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

    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      const updates: any = {
        solvedIds: alreadySolved ? arrayRemove(id) : arrayUnion(id)
      };

      if (alreadySolved) {
        updates[`solvedAt.${id}`] = null;
      } else {
        updates[`solvedAt.${id}`] = now;
      }

      try {
        await updateDoc(userDoc, updates);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    }
  };

  const isSolved = (id: string) => stats.solvedIds.includes(id);

  const updateVJudgeId = async (vjudgeId: string) => {
    if (!user) return;
    const userDoc = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDoc, { vjudgeId });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const requestCertificate = async (topicSlug: string, vjudgeId: string) => {
    if (!user) return;
    const certInfo: CertificateInfo = {
      status: 'pending',
      vjudgeId,
      topicSlug
    };
    
    const userDoc = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDoc, {
        [`certificates.${topicSlug}`]: certInfo,
        vjudgeId
      });

      await setDoc(doc(db, 'certificate_requests', `${user.uid}_${topicSlug}`), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        topicSlug,
        vjudgeId,
        status: 'pending',
        requestedAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `certificate_requests/${user.uid}_${topicSlug}`);
    }
  };

  return (
    <AppStateContext.Provider value={{ 
      stats, user, loading, theme, login, logout, 
      toggleSolved, isSolved, updateVJudgeId, requestCertificate, toggleTheme
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
