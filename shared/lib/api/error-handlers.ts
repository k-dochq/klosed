import { NextResponse } from 'next/server';

/**
 * 인증 실패 페이지로 리다이렉트하는 공통 유틸리티
 */
export function redirectToAuthFailurePage(
  requestUrl: string,
  errorCode: string,
  provider?: string,
): NextResponse {
  const baseUrl = new URL(requestUrl).origin;
  const failureUrl = new URL('/auth/failure', baseUrl);
  failureUrl.searchParams.set('code', errorCode);
  if (provider) {
    failureUrl.searchParams.set('provider', provider);
  }

  return NextResponse.redirect(failureUrl);
}
