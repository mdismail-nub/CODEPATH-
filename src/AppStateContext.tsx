import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, CertificateInfo } from './types';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AppStateContextType {
  stats: UserStats;
  user: User | null;
  loading: boolean;
  theme: 'light' | 'dark';
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
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
    // Check initial auth state
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (!session?.user) {
        const saved = localStorage.getItem('codepath_stats_guest');
        setStats(saved ? JSON.parse(saved) : DEFAULT_STATS);
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (!session?.user) {
        const saved = localStorage.getItem('codepath_stats_guest');
        setStats(saved ? JSON.parse(saved) : DEFAULT_STATS);
        setLoading(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('codepath_stats_guest', JSON.stringify(stats));
      return;
    }

    const fetchUserStats = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          const currentStats: UserStats = {
            solvedIds: data.solved_ids || [],
            solvedAt: data.solved_at || {},
            certificates: data.certificates || {},
            isAdmin: data.is_admin || user.email === 'ismailtonmoy478@gmail.com'
          };
          setStats(currentStats);
        } else {
          // Initialize user in Supabase
          const newStats = { ...DEFAULT_STATS };
          newStats.isAdmin = user.email === 'ismailtonmoy478@gmail.com';
          
          await supabase.from('users').insert({
            id: user.id,
            email: user.email,
            solved_ids: newStats.solvedIds,
            solved_at: newStats.solvedAt,
            certificates: newStats.certificates,
            is_admin: newStats.isAdmin
          });
          
          setStats(newStats);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const login = async (email: string, password: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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
      try {
        const newSolvedIds = alreadySolved
          ? stats.solvedIds.filter(i => i !== id)
          : [...stats.solvedIds, id];

        const newSolvedAt = { ...(stats.solvedAt || {}) };
        if (alreadySolved) {
          delete newSolvedAt[id];
        } else {
          newSolvedAt[id] = now;
        }

        await supabase
          .from('users')
          .update({
            solved_ids: newSolvedIds,
            solved_at: newSolvedAt
          })
          .eq('id', user.id);
      } catch (err) {
        console.error('Error updating solved problems:', err);
      }
    }
  };

  const isSolved = (id: string) => stats.solvedIds.includes(id);

  const updateVJudgeId = async (vjudgeId: string) => {
    if (!user) return;
    try {
      await supabase
        .from('users')
        .update({ vjudge_id: vjudgeId })
        .eq('id', user.id);
    } catch (err) {
      console.error('Error updating VJudge ID:', err);
    }
  };

  const requestCertificate = async (topicSlug: string, vjudgeId: string) => {
    if (!user) return;
    const certInfo: CertificateInfo = {
      status: 'pending',
      vjudgeId,
      topicSlug
    };
    
    try {
      // Update user certificates
      const newCerts = { ...(stats.certificates || {}) };
      newCerts[topicSlug] = certInfo;

      await supabase
        .from('users')
        .update({
          certificates: newCerts,
          vjudge_id: vjudgeId
        })
        .eq('id', user.id);

      // Create certificate request
      await supabase
        .from('certificate_requests')
        .insert({
          user_id: user.id,
          user_email: user.email,
          user_name: user.user_metadata?.display_name || user.email,
          topic_slug: topicSlug,
          vjudge_id: vjudgeId,
          status: 'pending'
        });
    } catch (err) {
      console.error('Error requesting certificate:', err);
    }
  };

  return (
    <AppStateContext.Provider value={{ 
      stats, user, loading, theme, login, signup, logout, 
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
