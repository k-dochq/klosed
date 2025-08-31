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
    if (!this.adminService) {
      throw new Error('AdminService is not available');
    }

    // AdminService를 사용하여 사용자 생성 (이메일 인증 상태로)
    const result = await this.adminService.createUser({
      email: params.email,
      password: PASSWORDLESS_AUTH_PASSWORD,
      emailConfirm: true, // 최초부터 인증 상태로 생성
      userMetadata: {
        provider: 'line',
        lineId: params.lineId,
        nickname: params.nickname,
        pictureUrl: params.pictureUrl,
      },
    });

    if (!result.success) {
      console.error('Admin create user error:', result.error);
      throw new Error(`Failed to create user: ${result.error}`);
    }

    console.log('User created successfully with email confirmed:', result.user?.id);
    return { userId: result.user?.id || null };
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
