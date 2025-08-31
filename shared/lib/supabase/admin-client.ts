import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Admin 클라이언트
 * 서비스 롤 키를 사용하여 관리자 권한으로 작업 수행
 */
export const createSupabaseAdminClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables for admin client');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
};
