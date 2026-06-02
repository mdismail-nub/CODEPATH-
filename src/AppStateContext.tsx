import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserStats, CertificateInfo } from './types';

/**
 * ⚡ BOLT: AppStateContext uses Set-based lookups and memoized handlers to ensure O(1) performance
 * for status checks and prevent unnecessary app-wide re-renders of consuming components.
 */

interface AppStateContextType {
  stats: UserStats;
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

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('codepath_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('codepath_stats', JSON.stringify(stats));
  }, [stats]);

  // ⚡ BOLT: Convert arrays to Sets for O(1) lookups during render
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

  const requestCertificate = useCallback((topicSlug: string, recipientName: string) => {
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

  // ⚡ BOLT: Memoize context value to prevent unnecessary re-renders of all consuming components
  const contextValue = useMemo(() => ({
    stats, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme
  }), [
    stats, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme
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
