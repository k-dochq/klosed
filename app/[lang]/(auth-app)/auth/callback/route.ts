import { NextResponse } from 'next/server';
import { createServerClient } from 'shared/lib/supabase/server-only';
import { redirectToErrorPage } from 'shared/lib/api';
import { extractLocaleFromRequestUrl } from 'shared/lib/locale/utils';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createServerClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      // phone 값이 비어있으면 휴대폰 인증 페이지로 리다이렉트
      if (!data.user.phone || data.user.phone.trim() === '') {
        const locale = extractLocaleFromRequestUrl(request.url);

        const phoneVerificationUrl = `${origin}/${locale}/auth/phone-verification`;
        return NextResponse.redirect(phoneVerificationUrl);
      }

      return NextResponse.redirect(`${origin}`);
    }
  }

  return redirectToErrorPage(request.url, 'AUTH_CODE_ERROR');
}
