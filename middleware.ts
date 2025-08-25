import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from 'shared/lib/supabase/server-only';
import { SUPPORTED_LOCALES } from 'shared/config';
import { getLocale } from 'shared/lib/locale';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return await updateSession(request);
  }

  const locale = getLocale();

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
     * - 파일 확장자가 있는 모든 파일 (이미지, CSS, JS 등)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
};
