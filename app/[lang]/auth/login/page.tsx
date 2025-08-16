import { GoogleSignInButton } from 'features/google-auth';
import { FacebookSignInButton } from 'features/facebook-auth';
import { LineSignInButton } from 'features/line-auth';
import { EmailLoginForm } from 'features/email-auth';
import { Smartphone } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';

interface LoginPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            {dict.auth.login.title}
          </h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            {dict.auth.login.subtitle}
          </p>
        </div>

        {/* 이메일 로그인 */}
        <EmailLoginForm
          redirectTo='/auth/callback'
          className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'
        />

        {/* 구분선 */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300 dark:border-gray-600' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-gray-50 px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
              {dict.auth.login.divider}
            </span>
          </div>
        </div>

        {/* 휴대폰 로그인 */}
        <div className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
          <h3 className='mb-4 text-center text-lg font-medium text-gray-900 dark:text-white'>
            {dict.auth.login.phoneLogin.title}
          </h3>
          <Link
            href={`/${lang}/auth/phone-login`}
            className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          >
            <Smartphone className='h-5 w-5' />
            {dict.auth.login.phoneLogin.button}
          </Link>
        </div>

        {/* 구분선 */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300 dark:border-gray-600' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-gray-50 px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
              {dict.auth.login.divider}
            </span>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <div className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
          <h3 className='mb-4 text-center text-lg font-medium text-gray-900 dark:text-white'>
            {dict.auth.login.socialLogin.title}
          </h3>
          <div className='space-y-3'>
            <LineSignInButton locale={lang} redirectTo={`/${lang}`} />
            <GoogleSignInButton />
            <FacebookSignInButton />
          </div>
        </div>

        {/* 추가 링크 */}
        <div className='space-y-2 text-center'>
          <Link
            href={`/${lang}/auth/reset-password`}
            className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
          >
            {dict.auth.login.links.forgotPassword}
          </Link>
          <div className='space-x-2'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {dict.auth.login.links.noAccount}
            </span>
            <Link
              href={`/${lang}/auth/email-login`}
              className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
            >
              {dict.auth.login.links.signUp}
            </Link>
          </div>
          <div>
            <Link
              href={`/${lang}`}
              className='text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300'
            >
              {dict.auth.login.links.backHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
