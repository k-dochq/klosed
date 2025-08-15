import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
  provider?: string;
}

export function mapSupabaseUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    fullName: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
    avatarUrl: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
    provider: supabaseUser.app_metadata?.provider,
  };
}
