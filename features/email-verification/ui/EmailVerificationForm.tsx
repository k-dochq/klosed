'use client';

import { useState } from 'react';
import { useEmailVerificationSignup } from '../model/useEmailVerificationSignup';
import { useCheckEmailExists } from '../model/useCheckEmailExists';
import { useEmailAuth } from 'features/email-auth/model/useEmailAuth';
import { isValidEmail } from 'shared/lib/validation/email';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { EmailVerificationButton } from './EmailVerificationButton';
import { EmailErrorMessage } from './ErrorMessage';
import { EmailVerificationDescription } from './EmailVerificationDescription';
import { type Dictionary } from 'shared/model/types';

interface EmailVerificationFormProps {
  dict: Dictionary;
}

type FormStep = 'email-input' | 'processing';

export function EmailVerificationForm({ dict }: EmailVerificationFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<FormStep>('email-input');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const { processEmailVerification, isProcessing } = useEmailVerificationSignup();
  const { checkEmailExistsAsync, isChecking, emailExists } = useCheckEmailExists();
  const { signInWithEmail } = useEmailAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일 형식 검증
    if (!email.trim() || !isValidEmail(email)) {
      return;
    }

    // 이메일 존재 여부 체크
    const result = await checkEmailExistsAsync({ email });

    if (result.exists) {
      // 계정이 존재하면 비밀번호 입력창 표시
      setShowPasswordInput(true);
    } else {
      // 계정이 존재하지 않으면 바로 회원가입 진행
      setStep('processing');
      await processEmailVerification(email);
      setStep('email-input');
      setShowPasswordInput(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      return;
    }

    try {
      setStep('processing');

      // Supabase 로그인 시도
      const signInResult = await signInWithEmail(email, password);

      if (signInResult.error) {
        console.error('로그인 실패:', signInResult.error);
        setStep('email-input');
        return;
      }

      // 로그인 성공 후 이메일 인증 처리
      await processEmailVerification(email);
      setStep('email-input');
      setShowPasswordInput(false);
    } catch (error) {
      console.error('로그인 처리 중 오류:', error);
      setStep('email-input');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // 이메일이 변경되면 비밀번호 입력창 숨기기
    if (showPasswordInput) {
      setShowPasswordInput(false);
      setPassword('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isEmailDisabled = isChecking || isProcessing;
  const isPasswordDisabled = isProcessing;

  // 이메일 입력 단계
  if (step === 'email-input') {
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

        {/* 비밀번호 입력창 (계정이 존재할 때만 표시) */}
        {showPasswordInput && (
          <form onSubmit={handlePasswordSubmit} className='space-y-4 border-t border-gray-200 pt-4'>
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              placeholder={
                dict.auth?.emailVerification?.form?.password?.placeholder || 'Enter your password'
              }
              label={dict.auth?.emailVerification?.form?.password?.label || 'Password'}
              disabled={isPasswordDisabled}
            />

            <EmailVerificationButton
              disabled={isPasswordDisabled || !password.trim()}
              isProcessing={isProcessing}
              isSending={false}
              text={dict.auth?.emailVerification?.buttons?.signIn || 'Sign In'}
              processingText={dict.auth?.emailVerification?.buttons?.signingIn || 'Signing in...'}
              sendingText={dict.auth?.emailVerification?.buttons?.signingIn || 'Signing in...'}
            />
          </form>
        )}

        <EmailVerificationDescription
          text={
            dict.auth?.emailVerification?.description || 'Enter your email address to continue.'
          }
        />
      </div>
    );
  }

  // 처리 중 단계 (회원가입 진행 중)
  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <p className='mb-4 text-sm text-gray-600'>계정을 생성하고 있습니다...</p>
      </div>

      <EmailVerificationButton
        disabled={true}
        isProcessing={true}
        isSending={false}
        text=''
        processingText={
          dict.auth?.emailVerification?.buttons?.creatingAccount || 'Creating account...'
        }
        sendingText=''
      />
    </div>
  );
}
