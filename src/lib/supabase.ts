import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Login might not work until configured.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

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
