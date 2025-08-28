import { Suspense } from 'react';
import { ExistingAccountLogin } from 'features/email-verification/ui/ExistingAccountLogin';
import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config/locales';

interface PageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function ExistingAccountLoginPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { email } = await searchParams;
  const dict = await getDictionary(lang);

  if (!email) {
    // 이메일이 없으면 회원가입 페이지로 리다이렉트
    return null; // TODO: 리다이렉트 처리
  }

  return (
    <div className='mx-auto min-h-screen max-w-[500px]'>
      <Suspense fallback={<div>Loading...</div>}>
        <ExistingAccountLogin dict={dict} email={email} />
      </Suspense>
    </div>
  );
}
