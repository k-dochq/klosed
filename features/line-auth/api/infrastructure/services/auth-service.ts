import { createAdminClient } from 'shared/lib/supabase/admin';

/**
 * 인증 서비스 인터페이스
 */
export interface IAuthService {
  /**
   * LINE 사용자용 계정 생성
   */
  createLineUser(params: {
    email: string;
    lineId: string;
    nickname: string;
    pictureUrl?: string;
  }): Promise<{ userId: string | null }>;
}

/**
 * Supabase를 사용한 인증 서비스 구현체
 */
export class AuthService implements IAuthService {
  async createLineUser(params: {
    email: string;
    lineId: string;
    nickname: string;
    pictureUrl?: string;
  }) {
    const supabase = createAdminClient();

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: 'passwordless-auth', // passwordless 가입
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
}
