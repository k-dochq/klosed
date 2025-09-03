'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useEmailVerificationSignup } from 'features/email-verification/model/useEmailVerificationSignup';
import { useCheckEmailExists } from 'features/email-verification/model/useCheckEmailExists';
import { isValidEmail } from 'shared/lib/validation/email';
import { EmailInput } from './EmailInput';
import { EmailVerificationButton } from './EmailVerificationButton';
import { EmailVerificationDescription } from './EmailVerificationDescription';
import { type Dictionary } from 'shared/model/types';

interface EmailVerificationFormProps {
  dict: Dictionary;
}

export function EmailVerificationForm({ dict }: EmailVerificationFormProps) {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useLocalizedRouter();
  const { processEmailVerification } = useEmailVerificationSignup();
  const { checkEmailExistsAsync, isChecking } = useCheckEmailExists();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일 형식 검증
    if (!email.trim() || !isValidEmail(email)) {
      return;
    }

    try {
      setIsProcessing(true);

      // 이메일 존재 여부 체크
      const result = await checkEmailExistsAsync({ email });

      if (result.exists) {
        // 계정이 존재하면 기존 계정 로그인 페이지로 이동
        router.push(`/auth/existing-account-login?email=${encodeURIComponent(email)}`);
      } else {
        // 계정이 존재하지 않으면 바로 회원가입 진행
        const verificationResult = await processEmailVerification(email);
        if (verificationResult.success) {
          // 이메일 인증 완료 페이지로 이동
          router.push(`/auth/email-verification-sent?email=${encodeURIComponent(email)}`);
        }
      }
    } catch (error) {
      console.error('이메일 처리 중 오류:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isEmailDisabled = isChecking || isProcessing;

  return (
    <div className='space-y-6'>
      <form onSubmit={handleEmailSubmit} className='space-y-4'>
        <EmailInput
          value={email}
          onChange={handleEmailChange}
          placeholder={dict.auth?.signup?.form?.email?.placeholder || 'Enter your email'}
          label={dict.auth?.signup?.form?.email?.label || 'Email'}
          disabled={isEmailDisabled}
        />

        <EmailVerificationButton
          disabled={isEmailDisabled || !email.trim()}
          isProcessing={isChecking}
          isSending={false}
          text={dict.auth?.emailVerification?.buttons?.continue || 'Continue'}
          processingText='Checking account...'
          sendingText='Checking account...'
        />
      </form>

      <EmailVerificationDescription
        text={dict.auth?.emailVerification?.description || 'Enter your email address to continue.'}
      />
    </div>
  );
}
