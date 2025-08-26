import { EmailLoginForm } from 'features/email-auth';
import { GoogleSignInButton } from 'features/google-auth';
import Link from 'next/link';

export default function EmailLoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900'>
      <div className='w-full max-w-md space-y-8'>
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
              또는
            </span>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <div className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
          <h3 className='mb-4 text-center text-lg font-medium text-gray-900 dark:text-white'>
            소셜 로그인
          </h3>
          <GoogleSignInButton />
        </div>

        {/* 추가 링크 */}
        <div className='space-y-2 text-center'>
          <Link
            href='/auth/reset-password'
            className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
          >
            비밀번호를 잊으셨나요?
          </Link>
          <div>
            <Link
              href='/'
              className='text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300'
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
