import { createAdminClient } from 'shared/lib/supabase/admin';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';

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

  /**
   * 기존 LINE 사용자 정보 업데이트
   */
  updateLineUser(params: {
    userId: string;
    nickname: string;
    pictureUrl?: string;
  }): Promise<{ success: boolean }>;

  /**
   * 이메일/패스워드로 로그인
   */
  loginWithEmailPassword(params: {
    email: string;
    password: string;
  }): Promise<{ userId: string | null; session: any }>;
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

    const { data, error } = await supabase.auth.admin.createUser({
      email: params.email,
      password: PASSWORDLESS_AUTH_PASSWORD, // passwordless 가입
      user_metadata: {
        provider: 'line',
        lineId: params.lineId,
        nickname: params.nickname,
        pictureUrl: params.pictureUrl,
        full_name: params.nickname, // LINE displayName을 full_name으로 저장
      },
      email_confirm: true, // 이메일 확인 없이 바로 활성화
    });

    if (error) {
      console.error('Supabase createUser error:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }

    // 사용자 생성 후 display_name 필드 업데이트
    if (data.user?.id) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        data.user.id,
        {
          user_metadata: {
            ...data.user.user_metadata,
            provider: 'line',
            lineId: params.lineId,
            nickname: params.nickname,
            pictureUrl: params.pictureUrl,
            full_name: params.nickname,
            display_name: params.nickname, // display_name도 user_metadata에 저장
          },
        }
      );

      if (updateError) {
        console.error('Failed to update user display_name:', updateError);
        // 사용자는 생성되었지만 display_name 업데이트 실패 - 경고만 로그
      } else {
        console.log('Successfully updated user display_name:', params.nickname);
      }
    }

    return { userId: data.user?.id || null };
  }

  async updateLineUser(params: {
    userId: string;
    nickname: string;
    pictureUrl?: string;
  }) {
    const supabase = createAdminClient();

    try {
      const { error } = await supabase.auth.admin.updateUserById(
        params.userId,
        {
          user_metadata: {
            nickname: params.nickname,
            pictureUrl: params.pictureUrl,
            full_name: params.nickname,
            display_name: params.nickname, // display_name도 user_metadata에 저장
          },
        }
      );

      if (error) {
        console.error('Failed to update LINE user:', error);
        return { success: false };
      }

      console.log('Successfully updated LINE user display_name:', params.nickname);
      return { success: true };
    } catch (error) {
      console.error('Error updating LINE user:', error);
      return { success: false };
    }
  }

  async loginWithEmailPassword(params: { email: string; password: string }) {
    const supabase = createAdminClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      console.error('Supabase signInWithPassword error:', error);
      throw new Error(`Failed to login: ${error.message}`);
    }

    return {
      userId: data.user?.id || null,
      session: data.session,
    };
  }
}
