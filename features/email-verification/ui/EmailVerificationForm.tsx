'use client';

import { useState } from 'react';
import { useEmailVerificationSignup } from '../model/useEmailVerificationSignup';
import { isValidEmail } from 'shared/lib/validation/email';
import { EmailInput } from './EmailInput';
import { EmailVerificationButton } from './EmailVerificationButton';
import { EmailErrorMessage } from './ErrorMessage';
import { EmailVerificationDescription } from './EmailVerificationDescription';
import { type Dictionary } from 'shared/model/types';

interface EmailVerificationFormProps {
  dict: Dictionary;
}

/**
 * 이메일 인증 폼 컴포넌트
 *
 * Single Responsibility: 이메일 인증을 위한 폼 UI와 상태 관리
 * - 이메일 입력 및 검증
 * - 폼 제출 처리
 * - 로딩 및 에러 상태 관리
 */
export function EmailVerificationForm({ dict }: EmailVerificationFormProps) {
  const [email, setEmail] = useState('');
  const { processEmailVerification, isProcessing, errorCode } = useEmailVerificationSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일 형식 검증 (클라이언트 측)
    if (!email.trim()) {
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    // 이메일 인증 처리 (회원가입 + 이메일 전송)
    await processEmailVerification(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isDisabled = isProcessing || !email.trim();

  return (
    <div className='space-y-6'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <EmailInput
          value={email}
          onChange={handleEmailChange}
          placeholder={dict.auth?.signup?.form?.email?.placeholder || 'Enter your email'}
          label={dict.auth?.signup?.form?.email?.label || 'Email'}
          disabled={isProcessing}
        />

        <EmailErrorMessage errorCode={errorCode} dict={dict} />

        <EmailVerificationButton
          disabled={isDisabled}
          isProcessing={isProcessing}
          isSending={false}
          text={dict.auth?.emailVerification?.buttons?.continue || 'Continue'}
          processingText={
            dict.auth?.emailVerification?.buttons?.creatingAccount || 'Creating account...'
          }
          sendingText={dict.auth?.emailVerification?.buttons?.sendingEmail || 'Sending email...'}
        />
      </form>

      <EmailVerificationDescription
        text={
          dict.auth?.emailVerification?.description ||
          "We'll create your account and send you a verification email."
        }
      />
    </div>
  );
}
