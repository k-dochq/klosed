import { createSupabaseServerClient } from 'shared/lib/supabase/server-client';

/**
 * 기본 인증 서비스 인터페이스
 */
export interface IAuthService {
  /**
   * 사용자 로그인 처리 (기본)
   */
  loginUser(params: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }>;
}

/**
 * 기본 인증 서비스 구현체
 */
export abstract class AuthService implements IAuthService {
  async loginUser(params: { email: string; password: string }) {
    try {
      const supabase = await createSupabaseServerClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email.trim(),
        password: params.password,
      });

      if (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Login service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
