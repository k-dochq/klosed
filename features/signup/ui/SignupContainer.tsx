'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { SignupHeader } from './SignupHeader';
import { EmailVerificationForm } from 'features/email-verification/ui/EmailVerificationForm';

import { SocialLoginSection } from './SocialLoginSection';

import { type Locale } from 'shared/config';

interface SignupContainerProps {
  locale?: Locale;
  title: string;
  subtitle: string;
  dict?: {
    form?: {
      email?: { label?: string; placeholder?: string };
      password?: { label?: string; placeholder?: string };
      terms?: string;
    };
    socialLogin?: {
      title?: string;
      google?: string;
      apple?: string;
      line?: string;
    };
    buttons?: {
      cancel?: string;
      continue?: string;
      loading?: string;
    };
  };
}

export function SignupContainer({ locale, title, subtitle, dict }: SignupContainerProps) {
  const router = useLocalizedRouter();

  const handleCancel = () => {
    // 홈으로 이동
    router.push('/');
  };

  const handleEmailSent = (sentEmail: string) => {};

  const handleAppleLogin = () => {};

  return (
    <div className='flex flex-col px-6 pb-16'>
      {/* Main Content */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='space-y-6 py-8'>
          {/* Header */}
          <SignupHeader title={title} subtitle={subtitle} />

          {/* Form */}
          <EmailVerificationForm
            onEmailSent={handleEmailSent}
            dict={{
              emailInput: {
                label: dict?.form?.email?.label || 'Email address',
                placeholder: dict?.form?.email?.placeholder || 'Enter your email address',
              },
              sendButton: dict?.buttons?.continue || 'Send Verification Email',
              sending: dict?.buttons?.loading || 'Sending...',
            }}
          />

          {/* Social Login */}
          <SocialLoginSection
            locale={locale}
            onAppleLogin={handleAppleLogin}
            dict={dict?.socialLogin}
          />
        </div>
      </div>

      {/* Cancel Button */}
      <div className='fixed right-0 bottom-0 left-0 z-50 mx-auto flex w-full bg-white p-3'>
        <button
          onClick={handleCancel}
          className='flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50'
        >
          {dict?.buttons?.cancel || 'Cancel'}
        </button>
      </div>
    </div>
  );
}
