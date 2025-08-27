import { NextResponse } from 'next/server';
import { createServerClient } from 'shared/lib/supabase/server-only';
import { redirectToErrorPage } from 'shared/lib/api';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}`);
    }
  }

  return redirectToErrorPage(request.url, 'AUTH_CODE_ERROR');
}
