'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { AuthPageHeader } from './AuthPageHeader';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface AuthFailureContainerProps {
  locale?: Locale;
  errorCode?: string;
  dict: Dictionary;
}

const getErrorMessage = (
  errorCode: string | undefined,
  dict: Dictionary,
): { title: string; message: string } => {
  return {
    title: dict.auth?.error?.title || 'Authentication Failure',
    message: errorCode || dict.auth?.error?.subtitle || 'An unknown error occurred.',
  };
};

export function AuthFailureContainer({ locale, errorCode, dict }: AuthFailureContainerProps) {
  const router = useLocalizedRouter();
  const { title, message } = getErrorMessage(errorCode, dict);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRetry = () => {
    router.push('/auth/signup');
  };

  return (
    <div className='flex flex-col px-6 pb-16'>
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full space-y-6 py-8 text-center'>
          <div className='mb-4 text-red-500'>
            <svg
              className='mx-auto mb-4 h-12 w-12'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>

          <AuthPageHeader title={title} subtitle={message} />

          <div className='space-y-3'>
            <button
              onClick={handleRetry}
              className='bg-primary hover:bg-primary/90 w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors'
            >
              Retry
            </button>
            <button
              onClick={handleGoHome}
              className='w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50'
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
