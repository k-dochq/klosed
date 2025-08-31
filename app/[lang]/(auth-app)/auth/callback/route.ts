import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from 'shared/lib/supabase/server-only';
import { routeErrorLogger, redirectToAuthFailure } from 'shared/lib';
import { extractLocaleFromCookie } from 'shared/lib/locale';

export async function GET(request: NextRequest) {
  const endpoint = '/auth/callback';
  const method = 'GET';

  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      const supabase = await createServerClient();
      const { error, data } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        // phone 값이 비어있으면 휴대폰 인증 페이지로 리다이렉트
        if (!data.user.phone || data.user.phone.trim() === '') {
          const locale = extractLocaleFromCookie(request);

          const phoneVerificationUrl = `${origin}/${locale}/auth/phone-verification`;
          return NextResponse.redirect(phoneVerificationUrl);
        }

        return NextResponse.redirect(`${origin}`);
      }
    }

    // 인증 코드가 없거나 인증 실패 시
    const authError = new Error('Authentication code error or invalid code');
    const requestId = routeErrorLogger.logError({
      error: authError,
      endpoint,
      method,
      request,
    });

    const locale = extractLocaleFromCookie(request);
    return redirectToAuthFailure({
      request,
      locale,
      errorCode: 'AUTH_CODE_ERROR',
      errorMessage: authError.message,
      requestId,
    });
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
      errorCode: 'AUTH_CODE_ERROR',
      errorMessage: (error as Error).message,
      requestId,
    });
  }
}
