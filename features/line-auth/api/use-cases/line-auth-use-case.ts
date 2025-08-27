import {
  ILineApiService,
  IUserRepository,
  IAuthService,
} from 'features/line-auth/api/infrastructure';
import {
  LineProfile,
  LineAuthState,
  LineStateValidationError,
} from 'features/line-auth/api/entities';
import { LineAuthRequest, LineAuthResult } from './types';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';

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
   * Supabase와 LINE 계정 통합
   */
  private async integrateWithSupabase(lineProfile: LineProfile): Promise<void> {
    try {
      const email = lineProfile.userId.toLowerCase() + '@line.me';

      // 1. 사용자 존재 여부 확인
      const existingUser = await this.userRepository.findByEmail(email);

      // 2. 사용자가 이미 존재하는 경우 로그인 처리
      if (existingUser) {
        console.log('User already exists for email:', email, '(ID:', existingUser.id + ')');

        // 기존 사용자도 로그인 처리
        console.log('Logging in existing user:', email);
        const loginResult = await this.authService.loginWithEmailPassword({
          email: email,
          password: PASSWORDLESS_AUTH_PASSWORD,
        });

        console.log('Existing user successfully logged in:', loginResult);
        return;
      }

      // 3. 사용자가 존재하지 않는 경우에만 계정 생성
      console.log('Creating new user for email:', email);
      const result = await this.authService.createLineUser({
        email: email,
        lineId: lineProfile.userId.toLowerCase(),
        nickname: lineProfile.displayName,
        pictureUrl: lineProfile.pictureUrl,
      });

      console.log('User successfully created:', result.userId);

      // 4. 계정 생성 후 바로 로그인 처리
      console.log('Logging in user:', email);
      const loginResult = await this.authService.loginWithEmailPassword({
        email: email,
        password: PASSWORDLESS_AUTH_PASSWORD,
      });

      console.log('User successfully logged in:', loginResult.userId);
    } catch (error) {
      console.error('Error integrating with Supabase:', error);
      throw error;
    }
  }
}
