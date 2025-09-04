import 'server-only';

import { type NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientForMiddleware } from './server-client';
import { getAuthPath, isProtectedRoute } from 'shared/lib/auth';
import { type Locale } from 'shared/config/locales';

/**
 * Next.js 미들웨어용 인증 가드 함수
 * 보호된 경로에 접근하는 사용자의 인증 상태를 확인하고
 * 인증되지 않은 사용자는 로그인 페이지로 리다이렉트합니다.
 */
export async function authGuard(request: NextRequest, locale: Locale) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createSupabaseServerClientForMiddleware(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 보호된 경로인지 확인
  const isProtected = isProtectedRoute(request.nextUrl.pathname);

  if (!session && isProtected) {
    const authPath = getAuthPath(locale);
    const url = request.nextUrl.clone();
    url.pathname = authPath;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
