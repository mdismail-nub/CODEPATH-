import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserStats, CertificateInfo } from './types';

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
  const [loading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codepath_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('codepath_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('codepath_stats', JSON.stringify(stats));
  }, [stats]);

  const solvedIdsSet = useMemo(() => new Set(stats.solvedIds), [stats.solvedIds]);
  const completedLessonIdsSet = useMemo(() => new Set(stats.completedLessonIds || []), [stats.completedLessonIds]);

  const toggleSolved = useCallback((id: string) => {
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

  const isSolved = useCallback((id: string) => solvedIdsSet.has(id), [solvedIdsSet]);

  const updateVJudgeId = useCallback((vjudgeId: string) => {
    setStats(prev => ({ ...prev, vjudgeId }));
  }, []);

  const requestCertificate = useCallback((topicSlug: string, recipientName: string) => {
    const now = Date.now();
    setStats(prev => {
      const certInfo: CertificateInfo = {
        status: 'issued',
        recipientName,
        topicSlug,
        issuedAt: now
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

  const isLessonCompleted = useCallback((lessonId: string) => completedLessonIdsSet.has(lessonId), [completedLessonIdsSet]);

  const value = useMemo(() => ({
    stats, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme
  }), [
    stats, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate,
    completeLesson, isLessonCompleted, toggleTheme
  ]);

  return (
    <AppStateContext.Provider value={value}>
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
