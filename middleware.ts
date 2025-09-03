import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from 'shared/lib/supabase/server-only';
import { SUPPORTED_LOCALES } from 'shared/config';
import { getLocaleFromRequest } from 'shared/lib/locale';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // pathname이 locale로 시작하는지 확인
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (hasLocale) {
    // locale이 이미 있으면 updateSession만 실행하고 리턴
    return await updateSession(request);
  }

  // locale이 없으면 locale을 추가해서 리다이렉트
  const locale = getLocaleFromRequest(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/callback (OAuth callback routes)
     * - auth/line/callback (LINE OAuth callback route)
     * - payment (결제 관련 페이지)
     * - 파일 확장자가 있는 모든 파일 (이미지, CSS, JS 등)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth/callback|auth/line/callback|payment|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
};
