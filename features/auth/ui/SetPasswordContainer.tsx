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
}

export function SetPasswordContainer({
  locale,
  title,
  subtitle,
  dict,
  hasValidSession,
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
          <SetPasswordForm dict={dict} />
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
