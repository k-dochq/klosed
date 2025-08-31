import { NextRequest, NextResponse } from 'next/server';
import {
  LineApiService,
  LineAuthUseCase,
  UserRepository,
  LineAuthService,
} from 'features/line-auth/api-server';
import { routeErrorLogger, redirectToAuthFailure } from 'shared/lib';
import { AdminService } from 'shared/lib/server-only';
import { extractLocaleFromCookie } from 'shared/lib/locale';

/**
 * LINE OAuth 콜백 Route Handler
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/auth/line/callback';
  const method = 'GET';

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const locale = extractLocaleFromCookie(request);

    // OAuth 에러 체크
    if (error) {
      const oauthError = new Error(`LINE OAuth error: ${error}`);
      const requestId = routeErrorLogger.logError({
        error: oauthError,
        endpoint,
        method,
        request,
      });

      return redirectToAuthFailure({
        request,
        locale,
        errorCode: 'LINE_OAUTH_ERROR',
        errorMessage: error,
        provider: 'line',
        requestId,
      });
    }

    if (!code) {
      const missingCodeError = new Error('No authorization code received');
      const requestId = routeErrorLogger.logError({
        error: missingCodeError,
        endpoint,
        method,
        request,
      });

      return redirectToAuthFailure({
        request,
        locale,
        errorCode: 'MISSING_AUTH_CODE',
        errorMessage: missingCodeError.message,
        provider: 'line',
        requestId,
      });
    }

    // LINE 인증 Use Case 실행
    const lineApiService = new LineApiService();
    const userRepository = new UserRepository();
    const adminService = new AdminService();
    const authService = new LineAuthService(adminService);
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
      const authFailedError = new Error(`LINE auth failed: ${result.error || 'Unknown error'}`);
      const requestId = routeErrorLogger.logError({
        error: authFailedError,
        endpoint,
        method,
        request,
      });

      return redirectToAuthFailure({
        request,
        locale,
        errorCode: 'LINE_AUTH_FAILED',
        errorMessage: result.error || 'Unknown error',
        provider: 'line',
        requestId,
      });
    }
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    const locale = extractLocaleFromCookie(request);
    return redirectToAuthFailure({
      request,
      locale,
      errorCode: 'LINE_CALLBACK_ERROR',
      errorMessage: (error as Error).message,
      provider: 'line',
      requestId,
    });
  }
}
