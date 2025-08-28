'use client';

import { useState } from 'react';
import { useEmailVerificationSignup } from '../model/useEmailVerificationSignup';
import { isValidEmail } from 'shared/lib/validation/email';
import { EmailInput } from './EmailInput';
import { EmailVerificationButton } from './EmailVerificationButton';
import { ErrorMessage } from './ErrorMessage';
import { EmailVerificationDescription } from './EmailVerificationDescription';

interface EmailVerificationFormProps {
  onEmailSent: (email: string) => void;
  dict: {
    emailInput: {
      label: string;
      placeholder: string;
    };
    sendButton: string;
    sending: string;
  };
}

/**
 * 이메일 인증 폼 컴포넌트
 *
 * Single Responsibility: 이메일 인증을 위한 폼 UI와 상태 관리
 * - 이메일 입력 및 검증
 * - 폼 제출 처리
 * - 로딩 및 에러 상태 관리
 */
export function EmailVerificationForm({ onEmailSent, dict }: EmailVerificationFormProps) {
  const [email, setEmail] = useState('');
  const { processEmailVerification, isProcessing, error } = useEmailVerificationSignup();

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
    const result = await processEmailVerification(email);

    if (result.success) {
      onEmailSent(email);
    }
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
          placeholder={dict.emailInput.placeholder}
          label={dict.emailInput.label}
          disabled={isProcessing}
        />

        <ErrorMessage error={error} />

        <EmailVerificationButton
          disabled={isDisabled}
          isProcessing={isProcessing}
          isSending={false}
          text={dict.sendButton}
          processingText='계정 생성 중...'
          sendingText={dict.sending}
        />
      </form>

      <EmailVerificationDescription text='계정을 생성하고 이메일 인증 링크를 보내드립니다.' />
    </div>
  );
}
