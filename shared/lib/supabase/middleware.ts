import 'server-only';

import { type NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClientForMiddleware } from './server-client';
import { extractLocaleFromPath } from 'shared/lib/locale';
import { getAuthPath, isProtectedRoute } from '../auth/routeGuard';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createSupabaseServerClientForMiddleware(request);

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로케일 추출
  const locale = extractLocaleFromPath(request.nextUrl.pathname);

  // 보호된 경로인지 확인
  const isProtected = isProtectedRoute(request.nextUrl.pathname, locale || undefined);

  if (!user && isProtected) {
    // 로그인하지 않은 사용자가 보호된 경로에 접근하려고 할 때
    const loginPath = locale ? getAuthPath(locale) : '/auth';
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())

  return supabaseResponse;
}
