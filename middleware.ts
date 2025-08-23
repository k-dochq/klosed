import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from 'shared/lib/supabase/server-only';
import { SUPPORTED_LOCALES } from 'shared/config';
import { getLocale } from 'shared/lib/locale';

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    // Locale이 있으면 Supabase 세션 처리
    return await updateSession(request);
  }

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
