'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { AuthPageHeader } from './AuthPageHeader';
import { SetPasswordForm } from './SetPasswordForm';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface SetPasswordContainerProps {
  locale?: Locale;
  title: string;
  subtitle: string;
  dict: Dictionary;
  hasValidSession: boolean;
  authError?: string | null;
}

export function SetPasswordContainer({
  locale,
  title,
  subtitle,
  dict,
  hasValidSession,
  authError,
}: SetPasswordContainerProps) {
  const router = useLocalizedRouter();

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col px-6 pb-16'>
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full space-y-6 py-8'>
          <AuthPageHeader title={title} subtitle={subtitle} />

          {/* 인증 에러 표시 */}
          {authError && (
            <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
              <div className='flex items-center'>
                <div className='mr-3 text-red-500'>
                  <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-red-800'>인증 오류</h3>
                  <p className='mt-1 text-sm text-red-700'>{authError}</p>
                </div>
              </div>
            </div>
          )}

          {/* 세션이 있을 때만 비밀번호 폼 표시 */}
          {hasValidSession && !authError && <SetPasswordForm dict={dict} />}

          {/* 세션이 없고 에러도 없을 때 로딩 표시 */}
          {!hasValidSession && !authError && (
            <div className='text-center'>
              <p className='text-gray-600'>이메일 인증을 처리중입니다...</p>
            </div>
          )}
        </div>
      </div>

      <div className='fixed right-0 bottom-0 left-0 z-50 mx-auto flex w-full max-w-md bg-white p-3'>
        <button
          onClick={handleCancel}
          className='flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50'
        >
          {dict.auth?.signup?.buttons?.cancel || 'Cancel'}
        </button>
      </div>
    </div>
  );
}
