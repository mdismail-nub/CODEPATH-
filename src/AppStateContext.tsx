import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codepath_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('codepath_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('codepath_stats', JSON.stringify(stats));
  }, [stats]);

  const toggleSolved = (id: string) => {
    const alreadySolved = stats.solvedIds.includes(id);
    const now = Date.now();
    
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
  };

  const isSolved = (id: string) => stats.solvedIds.includes(id);

  const updateVJudgeId = (vjudgeId: string) => {
    setStats(prev => ({ ...prev, vjudgeId }));
  };

  const requestCertificate = (topicSlug: string, vjudgeId: string) => {
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

    // In a simple guest-only version, we can just "approve" it immediately 
    // or leave it as pending to show progress. 
    // Let's leave it as pending for now to maintain the UI flow.
  };

  return (
    <AppStateContext.Provider value={{ 
      stats, loading, theme, 
      toggleSolved, isSolved, updateVJudgeId, requestCertificate, toggleTheme
    }}>
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
