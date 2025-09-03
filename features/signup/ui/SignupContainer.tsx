'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { SignupHeader } from './SignupHeader';
import { EmailVerificationForm } from 'features/email-verification/ui/EmailVerificationForm';

import { SocialLoginSection } from './SocialLoginSection';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface SignupContainerProps {
  locale?: Locale;
  title: string;
  subtitle: string;
  dict: Dictionary;
}

export function SignupContainer({ locale, title, subtitle, dict }: SignupContainerProps) {
  const router = useLocalizedRouter();

  const handleCancel = () => {
    // 홈으로 이동
    router.push('/');
  };

  return (
    <div className='flex flex-col px-6 pb-16'>
      {/* Main Content */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full space-y-6 py-8'>
          {/* Header */}
          <SignupHeader title={title} subtitle={subtitle} />
          {/* Form */}
          <EmailVerificationForm dict={dict} />

          {/* Social Login */}
          <SocialLoginSection locale={locale} dict={dict.auth?.signup?.socialLogin} />
        </div>
      </div>

      {/* Cancel Button */}
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
