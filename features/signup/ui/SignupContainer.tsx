'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { SignupHeader } from './SignupHeader';
import { SignupForm } from './SignupForm';
import { SocialLoginSection } from './SocialLoginSection';
import { SignupActionButtons } from './SignupActionButtons';

interface SignupContainerProps {
  title: string;
  subtitle: string;
}

export function SignupContainer({ title, subtitle }: SignupContainerProps) {
  const router = useLocalizedRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const handleCancel = () => {
    // 홈으로 이동
    router.push('/');
  };

  const handleContinue = () => {
    // TODO: 실제 회원가입 로직 구현
    console.log('Signup data:', { email, password, agreedToTerms });
    // 회원가입 완료 후 처리
    console.log('Continue clicked');
  };

  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 로직
    console.log('Google login clicked');
  };

  const handleAppleLogin = () => {
    // TODO: 애플 로그인 로직
    console.log('Apple login clicked');
  };

  const handleLineLogin = () => {
    // TODO: 라인 로그인 로직
    console.log('Line login clicked');
  };

  const isFormValid = email.trim() && password.trim() && agreedToTerms;

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* Main Content */}
      <div className='flex flex-1 flex-col items-center justify-center px-6 py-8 pb-32'>
        <div className='w-full max-w-md space-y-8'>
          {/* Header */}
          <SignupHeader title={title} subtitle={subtitle} />

          {/* Form */}
          <SignupForm
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onTermsChange={setAgreedToTerms}
          />

          {/* Social Login */}
          <SocialLoginSection
            onGoogleLogin={handleGoogleLogin}
            onAppleLogin={handleAppleLogin}
            onLineLogin={handleLineLogin}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <SignupActionButtons
        onCancel={handleCancel}
        onContinue={handleContinue}
        isDisabled={!isFormValid}
      />
    </div>
  );
}
