import { NextResponse } from 'next/server';

/**
 * 에러 페이지로 리다이렉트하는 공통 유틸리티
 */
export function redirectToErrorPage(
  requestUrl: string,
  errorCode: string,
  provider?: string,
): NextResponse {
  const baseUrl = new URL(requestUrl).origin;
  const errorUrl = new URL('/auth/error', baseUrl);
  errorUrl.searchParams.set('error', errorCode);
  if (provider) {
    errorUrl.searchParams.set('provider', provider);
  }

  return NextResponse.redirect(errorUrl);
}
