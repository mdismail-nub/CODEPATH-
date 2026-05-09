import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserStats, CertificateInfo } from './types';

interface AppStateContextType {
  stats: UserStats;
  loading: boolean;
  theme: 'light' | 'dark';
  toggleSolved: (id: string) => void;
  isSolved: (id: string) => boolean;
  updateVJudgeId: (id: string) => void;
  requestCertificate: (topicSlug: string, vjudgeId: string) => void;
  toggleTheme: () => void;
}

const DEFAULT_STATS: UserStats = {
  solvedIds: [],
  certificates: {},
  solvedAt: {}
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('codepath_stats');
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });
  const [loading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codepath_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  // Optimization: Use a Set for O(1) lookups of solved problem IDs
  const solvedSet = useMemo(() => new Set(stats.solvedIds), [stats.solvedIds]);

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

  const requestCertificate = useCallback((topicSlug: string, vjudgeId: string) => {
    const certInfo: CertificateInfo = {
      status: 'pending',
      vjudgeId,
      topicSlug
    };
    
    setStats(prev => ({
      ...prev,
      certificates: {
        ...(prev.certificates || {}),
        [topicSlug]: certInfo
      },
      vjudgeId
    }));
  }, []);

  // Optimization: Memoize context value to prevent unnecessary re-renders of all consumers
  const value = useMemo(() => ({
    stats, loading, theme,
    toggleSolved, isSolved, updateVJudgeId, requestCertificate, toggleTheme
  }), [stats, loading, theme, toggleSolved, isSolved, updateVJudgeId, requestCertificate, toggleTheme]);

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
