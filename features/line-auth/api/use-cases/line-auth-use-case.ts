import {
  ILineApiService,
  IUserRepository,
  IAuthService,
} from 'features/line-auth/api/infrastructure';
import {
  LineAuthState,
  LineStateValidationError,
  LineProfile,
} from 'features/line-auth/api/entities';
import { LineAuthRequest, LineAuthResult } from './types';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';
import { parseJWT } from 'shared/lib/jwt';

/**
 * LINE 인증 Use Case
 */
export class LineAuthUseCase {
  constructor(
    private lineApiService: ILineApiService,
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

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
      const redirectUri = this.buildRedirectUri(request.requestUrl, request.state);
      const tokenResponse = await this.lineApiService.exchangeCodeForToken(
        request.code,
        redirectUri,
      );

      // 3. id_token에서 프로필 정보 추출
      const jwtPayload = parseJWT(tokenResponse.id_token);
      const lineProfile = LineProfile.fromJWTPayload(jwtPayload);

      // 4. Supabase와 통합 및 email 반환
      const result = await this.integrateWithSupabase(lineProfile);

      return {
        success: true,
        userId: lineProfile.userId,
        displayName: lineProfile.userId,
        email: result.email,
        isNewUser: result.isNewUser,
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
   * 콜백 URL 생성 (state에서 저장된 redirect_uri 사용)
   */
  private buildRedirectUri(requestUrl: string, state?: string): string {
    if (state) {
      try {
        const stateData = JSON.parse(atob(state));
        if (stateData.redirectUri) {
          // state에 저장된 redirect_uri를 그대로 사용
          return stateData.redirectUri;
        }
      } catch (error) {
        // state 파싱 실패 시 기본 경로 사용
        console.warn('Failed to parse state for redirectUri:', error);
      }
    }

    // fallback: 현재 요청 URL 기반으로 생성
    const url = new URL(requestUrl);
    return `${url.protocol}//${url.host}/auth/line/callback`;
  }

  /**
   * Supabase와 LINE 계정 통합
   */
  private async integrateWithSupabase(
    lineProfile: LineProfile,
  ): Promise<{ email: string; isNewUser: boolean }> {
    try {
      const email = lineProfile.email;

      // 1. 사용자 존재 여부 확인 및 처리
      const userExists = await this.checkAndHandleExistingUser(email);
      if (userExists) {
        return { email, isNewUser: false };
      }

      // 2. 새 사용자 생성 및 로그인
      await this.createAndLoginNewUser(lineProfile);
      return { email, isNewUser: true };
    } catch (error) {
      console.error('Error integrating with Supabase:', error);
      throw error;
    }
  }

  /**
   * 기존 사용자 확인 및 로그인 처리
   */
  private async checkAndHandleExistingUser(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      console.log('User already exists for email:', email, '(ID:', existingUser.id + ')');
      await this.loginUser(email);
      return true;
    }

    return false;
  }

  /**
   * 새 사용자 생성 및 로그인 처리
   */
  private async createAndLoginNewUser(lineProfile: LineProfile): Promise<void> {
    const email = lineProfile.email;

    console.log('Creating new user for email:', email);
    const result = await this.authService.createLineUser({
      email: email,
      lineId: lineProfile.userId.toLowerCase(),
      nickname: lineProfile.userId,
      pictureUrl: undefined,
    });

    console.log('User successfully created:', result.userId);
    await this.loginUser(email);
  }

  /**
   * 사용자 로그인 처리
   */
  private async loginUser(email: string): Promise<void> {
    const loginResult = await this.authService.loginWithLineAccount({ email });
    if (!loginResult.success) {
      throw new Error(`Failed to login user: ${loginResult.error}`);
    }
  }
}
