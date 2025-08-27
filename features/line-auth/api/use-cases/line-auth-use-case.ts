import { ILineApiService } from 'features/line-auth/api/infrastructure';
import {
  LineProfile,
  LineAuthState,
  LineStateValidationError,
} from 'features/line-auth/api/entities';
import { LineAuthRequest, LineAuthResult } from './types';

/**
 * LINE 인증 Use Case
 */
export class LineAuthUseCase {
  constructor(private lineApiService: ILineApiService) {}

  /**
   * LINE 인증 프로세스 실행
   */
  async execute(request: LineAuthRequest): Promise<LineAuthResult> {
    try {
      // 1. State 검증 (CSRF 방지)
      if (request.state) {
        this.validateState(request.state);
      }

      // 2. 액세스 토큰 교환
      const redirectUri = this.buildRedirectUri(request.requestUrl);
      const tokenResponse = await this.lineApiService.exchangeCodeForToken(
        request.code,
        redirectUri,
      );

      // 3. LINE 프로필 정보 조회
      const lineProfile = await this.lineApiService.getProfile(tokenResponse.access_token);

      // 4. Supabase와 통합
      await this.integrateWithSupabase(lineProfile);

      return {
        success: true,
        userId: lineProfile.userId,
        displayName: lineProfile.displayName,
      };
    } catch (error) {
      console.error('LINE auth use case error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * State 파라미터 검증
   */
  private validateState(state: string): void {
    try {
      const stateData: LineAuthState = JSON.parse(atob(state));
      const timeDiff = Date.now() - stateData.timestamp;

      if (timeDiff > 10 * 60 * 1000) {
        // 10분 초과 시 만료
        throw new LineStateValidationError('State expired');
      }
    } catch (error) {
      if (error instanceof LineStateValidationError) {
        throw error;
      }
      throw new LineStateValidationError('Invalid state parameter');
    }
  }

  /**
   * 콜백 URL 생성
   */
  private buildRedirectUri(requestUrl: string): string {
    const url = new URL(requestUrl);
    return `${url.protocol}//${url.host}/auth/line/callback`;
  }

  /**
   * Supabase와 LINE 계정 통합 (임시로 비워둠)
   */
  private async integrateWithSupabase(lineProfile: LineProfile): Promise<void> {
    console.log('LINE profile received:', {
      userId: lineProfile.userId,
      displayName: lineProfile.displayName,
      email: lineProfile.email,
      pictureUrl: lineProfile.pictureUrl,
    });

    // TODO: Supabase 통합 로직 구현 예정
    // 현재는 LINE 프로필 정보만 로그로 출력
  }
}