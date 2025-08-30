import { LINE_CONFIG } from 'shared/config';
import { LineTokenResponse, LineTokenExchangeError } from 'features/line-auth/api/entities';

/**
 * LINE API 서비스 인터페이스
 */
export interface ILineApiService {
  exchangeCodeForToken(code: string, redirectUri: string): Promise<LineTokenResponse>;
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
}
