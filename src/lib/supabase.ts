import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'undefined' && 
  supabaseUrl !== 'null' &&
  supabaseUrl.includes('.')
);

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn('Supabase URL or Anon Key is missing or invalid. Authentication and progress storage will be disabled. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable these features.');
}

const realSupabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co', 
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder'
);

// Proxy to prevent any calls if not configured, or just return the real one if it is
export const supabase = new Proxy(realSupabase, {
  get(target, prop, receiver) {
    if (!isSupabaseConfigured && prop !== 'auth') {
      // Return a dummy for .from() etc.
      if (prop === 'from') {
        return () => ({
          select: () => ({ order: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }), eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null }),
          update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
          upsert: () => Promise.resolve({ data: null, error: null }),
        });
      }
      if (prop === 'channel') {
        return () => ({
          on: () => ({ subscribe: () => ({}) }),
          subscribe: () => ({})
        });
      }
      if (prop === 'removeChannel') {
        return () => {};
      }
    }
    
    if (prop === 'auth' && !isSupabaseConfigured) {
      return {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOAuth: () => Promise.resolve({ data: {}, error: new Error('Supabase not configured') }),
        signUp: () => Promise.resolve({ data: {}, error: new Error('Supabase not configured') }),
        signInWithPassword: () => Promise.resolve({ data: {}, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
      };
    }

    return Reflect.get(target, prop, receiver);
  }
});

export type Profile = {
  id: string;
  vjudge_id?: string;
  is_admin: boolean;
  solved_ids: string[];
  certificates: Record<string, any>;
};

export type CertificateRequest = {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  topic_slug: string;
  vjudge_id: string;
  status: 'pending' | 'issued';
  requested_at: string;
};
