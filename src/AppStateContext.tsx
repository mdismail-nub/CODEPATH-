import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, CertificateInfo } from './types';

interface AppStateContextType {
  stats: UserStats;
  solvedSet: Set<string>;
  completedLessonsSet: Set<string>;
  loading: boolean;
  theme: 'light' | 'dark';
  toggleSolved: (id: string) => void;
  isSolved: (id: string) => boolean;
  updateVJudgeId: (id: string) => void;
  requestCertificate: (topicSlug: string, recipientName: string) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  toggleTheme: () => void;
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
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('codepath_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATS, ...parsed };
      } catch (e) {
        return DEFAULT_STATS;
      }
    }
    return DEFAULT_STATS;
  });
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codepath_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = React.useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('codepath_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('codepath_stats', JSON.stringify(stats));
  }, [stats]);

  // Performance Optimization: Use Sets for O(1) lookups instead of O(N) array includes
  const solvedSet = React.useMemo(() => new Set(stats.solvedIds), [stats.solvedIds]);
  const completedLessonsSet = React.useMemo(() =>
    new Set(stats.completedLessonIds || []),
    [stats.completedLessonIds]
  );

  const toggleSolved = React.useCallback((id: string) => {
    const now = Date.now();
    
    setStats(prev => {
      const alreadySolved = prev.solvedIds.includes(id);
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

  const isSolved = React.useCallback((id: string) => solvedSet.has(id), [solvedSet]);

  const updateVJudgeId = React.useCallback((vjudgeId: string) => {
    setStats(prev => ({ ...prev, vjudgeId }));
  }, []);

  const requestCertificate = React.useCallback((topicSlug: string, recipientName: string) => {
    const certInfo: CertificateInfo = {
      status: 'issued',
      recipientName,
      topicSlug,
      issuedAt: Date.now()
    };
    
    setStats(prev => ({
      ...prev,
      certificates: {
        ...(prev.certificates || {}),
        [topicSlug]: certInfo
      }
    }));
  }, []);

  const completeLesson = React.useCallback((lessonId: string, xpReward: number) => {
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

  const isLessonCompleted = React.useCallback((lessonId: string) =>
    completedLessonsSet.has(lessonId),
    [completedLessonsSet]
  );

  const providerValue = React.useMemo(() => ({
    stats, solvedSet, completedLessonsSet, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme
  }), [
    stats, solvedSet, completedLessonsSet, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme
  ]);

  return (
    <AppStateContext.Provider value={providerValue}>
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
