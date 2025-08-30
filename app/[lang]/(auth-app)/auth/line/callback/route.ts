import { NextRequest, NextResponse } from 'next/server';
import {
  LineAuthUseCase,
  LineApiService,
  UserRepository,
  AuthService,
} from 'features/line-auth/api-server';
import { redirectToAuthFailurePage } from 'shared/lib/api/error-handlers';
import { extractLocaleFromRequestUrl } from 'shared/lib/locale/utils';

/**
 * LINE OAuth 콜백 Route Handler
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const locale = extractLocaleFromRequestUrl(request.url);

    // OAuth 에러 체크
    if (error) {
      console.error('LINE OAuth error:', error);
      return redirectToAuthFailurePage(request.url, 'LINE_OAUTH_ERROR', 'line');
    }

    if (!code) {
      console.error('No authorization code received');
      return redirectToAuthFailurePage(request.url, 'MISSING_AUTH_CODE', 'line');
    }

    // LINE 인증 Use Case 실행
    const lineApiService = new LineApiService();
    const userRepository = new UserRepository();
    const authService = new AuthService();
    const lineAuthUseCase = new LineAuthUseCase(lineApiService, userRepository, authService);

    const result = await lineAuthUseCase.execute({
      code,
      state: state || undefined,
      requestUrl: request.url,
    });

    // 성공 시 AuthService를 통해 Supabase 인증 처리
    if (result.success && result.email) {
      // 로그인 성공 시 리다이렉트 (Use Case에서 이미 로그인 처리됨)
      if (result.isNewUser) {
        // 새 사용자: 핸드폰 인증 페이지로 이동
        const redirectUrl = new URL(`/${locale}/auth/phone-verification`, request.url);
        redirectUrl.searchParams.set('email', result.email);
        return NextResponse.redirect(redirectUrl);
      } else {
        // 기존 사용자: 홈으로 이동
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }
    } else {
      console.error('LINE auth failed:', result.error);
      return redirectToAuthFailurePage(request.url, 'LINE_AUTH_FAILED', 'line');
    }
  } catch (error) {
    console.error('LINE callback route error:', error);
    return redirectToAuthFailurePage(request.url, 'LINE_CALLBACK_ERROR', 'line');
  }
}
