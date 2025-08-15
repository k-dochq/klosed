'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PhoneVerificationForm } from 'features/phone-auth';

function VerifyPhoneContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';

  if (!phone) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800'>
        <div className='w-full max-w-md'>
          <div className='rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800'>
            <div className='mb-4'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20'>
                <span className='text-2xl'>❌</span>
              </div>
            </div>
            <h2 className='mb-2 text-xl font-bold text-gray-900 dark:text-white'>
              잘못된 접근입니다
            </h2>
            <p className='mb-6 text-gray-600 dark:text-gray-400'>
              휴대폰 번호 정보가 없습니다. 다시 시도해주세요.
            </p>
            <Link
              href='/auth/phone-login'
              className='inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
            >
              휴대폰 로그인 다시 시도
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-md'>
        {/* 뒤로가기 버튼 */}
        <div className='mb-6'>
          <Link
            href='/auth/phone-login'
            className='inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            번호 다시 입력
          </Link>
        </div>

        {/* 메인 카드 */}
        <div className='rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800'>
          <PhoneVerificationForm phone={phone} onBack={() => window.history.back()} />
        </div>

        {/* 추가 정보 */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            다른 방법으로 로그인하시겠어요?{' '}
            <Link
              href='/auth/login'
              className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
            >
              로그인 방법 선택
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPhonePage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent' />
        </div>
      }
    >
      <VerifyPhoneContent />
    </Suspense>
  );
}
