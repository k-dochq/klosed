import { LINE_CONFIG } from 'shared/config';
import {
  LineTokenResponse,
  LineTokenExchangeError,
  LineProfileFetchError,
  LineEmailNotFoundError,
} from 'features/line-auth/api/entities';
import { LineProfile } from '@/shared/model/types';

/**
 * LINE API 서비스 인터페이스
 */
export interface ILineApiService {
  exchangeCodeForToken(code: string, redirectUri: string): Promise<LineTokenResponse>;
  getProfile(accessToken: string): Promise<LineProfile>;
}

/**
 * LINE API 서비스 구현
 */
export class LineApiService implements ILineApiService {
  /**
   * LINE 인증 코드를 액세스 토큰으로 교환
   */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<LineTokenResponse> {
    try {
      const response = await fetch(LINE_CONFIG.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: LINE_CONFIG.CHANNEL_ID,
          client_secret: LINE_CONFIG.CHANNEL_SECRET,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new LineTokenExchangeError(`Token exchange failed: ${response.status} ${errorText}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof LineTokenExchangeError) {
        throw error;
      }
      throw new LineTokenExchangeError(
        `Token exchange error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * LINE 액세스 토큰으로 프로필 정보 조회
   */
  async getProfile(accessToken: string): Promise<LineProfile> {
    try {
      const response = await fetch(LINE_CONFIG.PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new LineProfileFetchError(`Profile fetch failed: ${response.status} ${errorText}`);
      }

      const profileData = await response.json();

      return profileData;
    } catch (error) {
      if (error instanceof LineProfileFetchError) {
        throw error;
      }
      if (error instanceof LineEmailNotFoundError) {
        throw error;
      }
      throw new LineProfileFetchError(
        `Profile fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
