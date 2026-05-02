import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, CertificateInfo } from './types';
import { supabase, Profile } from './lib/supabase';
import { User } from '@supabase/supabase-js';

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
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        const saved = localStorage.getItem('codepath_stats_guest');
        setStats(saved ? JSON.parse(saved) : DEFAULT_STATS);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      if (!loading) {
        localStorage.setItem('codepath_stats_guest', JSON.stringify(stats));
      }
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const initialStats = {
            id: user.id,
            solved_ids: [],
            certificates: {},
            is_admin: user.email === 'ismailtonmoy478@gmail.com'
          };
          const { error: insertError } = await supabase.from('profiles').insert(initialStats);
          if (insertError) throw insertError;
          
          setStats({
            solvedIds: [],
            certificates: {},
            isAdmin: initialStats.is_admin
          });
        } else if (error) {
          throw error;
        } else {
          setStats({
            solvedIds: data.solved_ids || [],
            certificates: data.certificates || {},
            isAdmin: data.is_admin || user.email === 'ismailtonmoy478@gmail.com',
            vjudgeId: data.vjudge_id,
            solvedAt: data.solved_at || {}
          });
        }
      } catch (err) {
        console.error('Error fetching/creating profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Set up realtime subscription for profile changes
    const channel = supabase
      .channel(`profile:${user.id}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'profiles', 
        filter: `id=eq.${user.id}` 
      }, (payload: any) => {
        const data = payload.new;
        setStats({
          solvedIds: data.solved_ids || [],
          certificates: data.certificates || {},
          isAdmin: data.is_admin || user.email === 'ismailtonmoy478@gmail.com',
          vjudgeId: data.vjudge_id,
          solvedAt: data.solved_at || {}
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
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
      const newSolvedIds = alreadySolved 
        ? stats.solvedIds.filter(i => i !== id)
        : [...stats.solvedIds, id];
      
      const newSolvedAt = { ...(stats.solvedAt || {}) };
      if (alreadySolved) {
        delete newSolvedAt[id];
      } else {
        newSolvedAt[id] = now;
      }

      try {
        await supabase
          .from('profiles')
          .update({ 
            solved_ids: newSolvedIds,
            solved_at: newSolvedAt
          })
          .eq('id', user.id);
      } catch (err) {
        console.error('Error updating solved status:', err);
      }
    }
  };

  const isSolved = (id: string) => stats.solvedIds.includes(id);

  const updateVJudgeId = async (vjudgeId: string) => {
    if (!user) return;
    try {
      await supabase
        .from('profiles')
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
      const newCertificates = {
        ...(stats.certificates || {}),
        [topicSlug]: certInfo
      };

      await supabase
        .from('profiles')
        .update({
          certificates: newCertificates,
          vjudge_id: vjudgeId
        })
        .eq('id', user.id);

      await supabase
        .from('certificate_requests')
        .upsert({
          id: `${user.id}_${topicSlug}`,
          user_id: user.id,
          user_email: user.email,
          user_name: user.user_metadata.full_name || user.email,
          topic_slug: topicSlug,
          vjudge_id: vjudgeId,
          status: 'pending',
          requested_at: new Date().toISOString()
        });
    } catch (err) {
      console.error('Error requesting certificate:', err);
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
