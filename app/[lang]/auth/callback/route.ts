import { NextResponse } from 'next/server';
import { createServerClient } from 'shared/lib/supabase/server-only';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/ko`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
