import 'server-only';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';
import { createSupabaseServerClient } from 'shared/lib/supabase/server-client';
import type { IAdminService } from 'shared/lib/server-only';
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
  constructor(adminService: IAdminService) {
    super(adminService);
  }
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

    // 회원가입 성공 후 자동으로 이메일 인증 수행
    if (data.user?.id && this.adminService) {
      const confirmResult = await this.adminService.confirmUserEmail(data.user.id);
      if (!confirmResult.success) {
        console.warn('Failed to auto-confirm email for user:', data.user.id, confirmResult.error);
        // 이메일 인증 실패해도 회원가입은 성공으로 처리 (나중에 수동으로 인증 가능)
      } else {
        console.log('Email auto-confirmed for user:', data.user.id);
      }
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
