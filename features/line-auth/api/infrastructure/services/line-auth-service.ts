import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';
import { createSupabaseServerClient } from 'shared/lib/supabase/server-client';
import { AuthService } from './auth-service';

/**
 * LINE 인증 서비스 인터페이스
 */
export interface ILineAuthService {
  /**
   * LINE 사용자용 계정 생성
   */
  createLineUser(params: {
    email: string;
    lineId: string;
    nickname: string;
    pictureUrl?: string;
  }): Promise<{ userId: string | null }>;

  /**
   * LINE 계정으로 로그인 처리
   */
  loginWithLineAccount(params: { email: string }): Promise<{ success: boolean; error?: string }>;
}

/**
 * LINE 인증 서비스 구현체
 * 기본 AuthService를 상속받아 LINE 관련 기능을 확장
 */
export class LineAuthService extends AuthService implements ILineAuthService {
  async createLineUser(params: {
    email: string;
    lineId: string;
    nickname: string;
    pictureUrl?: string;
  }) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: PASSWORDLESS_AUTH_PASSWORD, // passwordless 가입
      options: {
        data: {
          provider: 'line',
          lineId: params.lineId,
          nickname: params.nickname,
          pictureUrl: params.pictureUrl,
        },
      },
    });

    if (error) {
      console.error('Supabase signUp error:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return { userId: data.user?.id || null };
  }

  async loginWithLineAccount(params: { email: string }) {
    try {
      // Supabase 서버 클라이언트 생성
      const supabase = await createSupabaseServerClient();

      // LINE 계정으로 이메일 로그인 (passwordless)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email.trim(),
        password: PASSWORDLESS_AUTH_PASSWORD,
      });

      if (error) {
        console.error('LINE login error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('LINE login service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
