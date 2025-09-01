import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { SetPasswordContainer } from 'features/auth';
import { createServerClient } from 'shared/lib/supabase/server-only';
import { redirect } from 'next/navigation';

interface SetPasswordPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ code?: string }>;
}

export default async function SetPasswordPage({ params, searchParams }: SetPasswordPageProps) {
  const { lang } = await params;
  const { code } = await searchParams;
  const dict = await getDictionary(lang);

  // code가 없으면 인증 실패 페이지로 리다이렉트
  if (!code) {
    redirect(`/${lang}/auth/failure?error=missing_code`);
  }

  // 서버에서 code를 세션으로 교환
  let hasValidSession = false;
  let authError: string | null = null;

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Code verification error:', error);
      authError = 'invalid_or_expired_code';
    } else if (data.session) {
      hasValidSession = true;
    }
  } catch (error) {
    console.error('Unexpected error during code verification:', error);
    authError = 'verification_error';
  }

  // 인증 실패 시 실패 페이지로 리다이렉트
  if (authError) {
    redirect(`/${lang}/auth/failure?error=${authError}`);
  }

  return (
    <SetPasswordContainer
      locale={lang}
      title={dict.auth?.passwordUpdate?.title || 'Set Password'}
      subtitle={dict.auth?.passwordUpdate?.description || 'Please set your password to continue.'}
      dict={dict}
      hasValidSession={hasValidSession}
    />
  );
}
