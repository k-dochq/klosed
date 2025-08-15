'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from 'shared/lib/supabase';
import { type EmailOtpType } from '@supabase/supabase-js';

function ConfirmEmailContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type') as EmailOtpType | null;

      if (!token_hash || !type) {
        setError('유효하지 않은 인증 링크입니다.');
        setIsLoading(false);
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          type,
          token_hash,
        });

        if (error) {
          throw error;
        }

        setIsSuccess(true);

        // 3초 후 홈페이지로 리다이렉트
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : '인증 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams, router, supabase]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800'>
          <div className='text-center'>
            <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>이메일 인증 중...</h2>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>잠시만 기다려 주세요</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800'>
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
              <svg
                className='h-8 w-8 text-green-600 dark:text-green-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                ></path>
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>인증 완료! 🎉</h2>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>
              이메일 인증이 성공적으로 완료되었습니다.
              <br />
              잠시 후 홈페이지로 이동합니다.
            </p>
            <button
              onClick={() => router.push('/')}
              className='mt-6 w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900'>
            <svg
              className='h-8 w-8 text-red-600 dark:text-red-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path>
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>인증 실패 ❌</h2>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>{error}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className='mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            로그인 페이지로 가기
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>로딩 중...</h2>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>잠시만 기다려 주세요</p>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmEmailContent />
    </Suspense>
  );
}
