'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { SignupHeader } from './SignupHeader';
import { SignupForm } from './SignupForm';
import { SocialLoginSection } from './SocialLoginSection';
import { SignupActionButtons } from './SignupActionButtons';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    // 홈으로 이동
    router.push('/');
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 회원가입 로직 구현
      console.log('Signup data:', { email, password, agreedToTerms });
      // 회원가입 완료 후 처리
      console.log('Continue clicked');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = () => {
    // TODO: 애플 로그인 로직
    console.log('Apple login clicked');
  };

  const isFormValid = email.trim() && password.trim() && agreedToTerms;

  return (
    <div className='flex flex-col px-6 pb-16'>
      {/* Main Content */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='space-y-6 py-8'>
          {/* Header */}
          <SignupHeader title={title} subtitle={subtitle} />

          {/* Form */}
          <SignupForm
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onTermsChange={setAgreedToTerms}
            dict={dict?.form}
          />

          {/* Social Login */}
          <SocialLoginSection
            locale={locale}
            onAppleLogin={handleAppleLogin}
            dict={dict?.socialLogin}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <SignupActionButtons
        onCancel={handleCancel}
        onContinue={handleContinue}
        isLoading={isLoading}
        isDisabled={!isFormValid}
        dict={dict?.buttons}
      />
    </div>
  );
}
