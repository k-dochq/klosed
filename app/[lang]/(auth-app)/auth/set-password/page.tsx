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

  // 인증 처리
  let hasValidSession = false;
  let authError: string | null = null;

  if (!code) {
    authError = 'missing_code';
  } else {
    try {
      const supabase = await createServerClient();

      // 이메일 확인 (회원가입 확인)을 위해 verifyOtp 사용
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: code,
        type: 'email', // 회원가입 이메일 확인
      });

      if (error) {
        console.error('Token verification error:', error);
        authError = error.message;
      } else if (data.session) {
        hasValidSession = true;
        console.log('이메일 확인 및 로그인 성공');
      } else {
        authError = 'no_session_created';
      }
    } catch (error) {
      console.error('Unexpected error during verification:', error);
      authError = (error as Error).message;
    }
  }

  return (
    <SetPasswordContainer
      locale={lang}
      title={dict.auth?.passwordUpdate?.title || 'Set Password'}
      subtitle={dict.auth?.passwordUpdate?.description || 'Please set your password to continue.'}
      dict={dict}
      hasValidSession={hasValidSession}
      authError={authError}
    />
  );
}
