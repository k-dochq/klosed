'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Dictionary } from 'shared/model/types';

interface EmailVerificationSentProps {
  dict: Dictionary;
  email: string;
}

export function EmailVerificationSent({ dict, email }: EmailVerificationSentProps) {
  const router = useLocalizedRouter();

  const handleBackToSignup = () => {
    router.push('/auth/signup');
  };

  const handleResendEmail = () => {
    // TODO: 이메일 재전송 로직 구현
    console.log('이메일 재전송');
  };

  return (
    <div className='flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='space-y-6'>
          <div className='text-center'>
            <div className='mb-6'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                <svg
                  className='h-8 w-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h3 className='mb-2 text-lg font-semibold text-gray-900'>
                {dict.auth?.emailVerification?.success?.title}
              </h3>
              <p className='mb-4 text-sm text-gray-600'>
                {dict.auth?.emailVerification?.success?.description?.replace('{email}', email)}
              </p>
            </div>

            <div className='space-y-3'>
              <button
                type='button'
                onClick={handleBackToSignup}
                className='w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
              >
                {dict.auth?.emailVerification?.buttons?.backToSignup}
              </button>

              <button
                type='button'
                onClick={handleResendEmail}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
              >
                {dict.auth?.emailVerification?.buttons?.resendEmail}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
