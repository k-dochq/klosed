import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from 'shared/lib/supabase/server-only';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale, type Locale } from 'shared/config';

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): Locale {
  // Check accept-language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    if (isValidLocale(preferredLocale)) {
      return preferredLocale;
    }
  }
  return DEFAULT_LOCALE;
}

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

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
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
