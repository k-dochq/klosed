import { NextRequest, NextResponse } from 'next/server';

interface RedirectToFailureParams {
  request: NextRequest;
  locale: string;
  errorCode: string;
  errorMessage?: string;
  provider?: string;
  requestId?: string;
}

/**
 * 인증 실패 페이지로 리다이렉트하는 공통 유틸리티
 */
export function redirectToAuthFailure({
  request,
  locale,
  errorCode,
  errorMessage,
  provider,
  requestId,
}: RedirectToFailureParams): NextResponse {
  const redirectUrl = new URL(`/${locale}/auth/failure`, request.url);

  // 필수 파라미터 설정
  redirectUrl.searchParams.set('code', errorCode);

  // 선택적 파라미터 설정
  if (errorMessage) {
    redirectUrl.searchParams.set('message', errorMessage);
  }

  if (provider) {
    redirectUrl.searchParams.set('provider', provider);
  }

  if (requestId) {
    redirectUrl.searchParams.set('requestId', requestId);
  }

  return NextResponse.redirect(redirectUrl);
}

/**
 * 일반 에러 페이지로 리다이렉트하는 공통 유틸리티
 */
export function redirectToErrorPage({
  request,
  locale,
  errorCode,
  errorMessage,
  requestId,
}: Omit<RedirectToFailureParams, 'provider'>): NextResponse {
  const redirectUrl = new URL(`/${locale}/error`, request.url);

  redirectUrl.searchParams.set('code', errorCode);

  if (errorMessage) {
    redirectUrl.searchParams.set('message', errorMessage);
  }

  if (requestId) {
    redirectUrl.searchParams.set('requestId', requestId);
  }

  return NextResponse.redirect(redirectUrl);
}
