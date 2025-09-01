'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useEmailAuth } from 'features/email-auth/model/useEmailAuth';
import { createClient } from 'shared/lib/supabase/client';
import { PasswordInput } from './PasswordInput';
import { EmailVerificationButton } from './EmailVerificationButton';
import { type Dictionary } from 'shared/model/types';

interface ExistingAccountLoginProps {
  dict: Dictionary;
  email: string;
}

export function ExistingAccountLogin({ dict, email }: ExistingAccountLoginProps) {
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useLocalizedRouter();
  const { signInWithEmail } = useEmailAuth();

  const handleBackToSignup = () => {
    router.push('/auth/signup');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Supabase 로그인 시도
      const signInResult = await signInWithEmail(email, password);

      if (signInResult.error) {
        console.error('로그인 실패:', signInResult.error);
        setError(dict.auth?.emailVerification?.errors?.INVALID_PASSWORD);
        return;
      }

      // 로그인 성공 시 홈페이지로 리다이렉트
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 처리 중 오류:', error);
      setError(dict.auth?.emailVerification?.errors?.LOGIN_FAILED);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className='flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='space-y-6'>
          <div className='text-center'>
            <h2 className='mb-2 text-2xl font-bold text-gray-900'>
              {dict.auth?.emailVerification?.existingAccount?.title}
            </h2>
            <p className='mb-4 text-sm text-gray-600'>
              {dict.auth?.emailVerification?.existingAccount?.description?.replace(
                '{email}',
                email,
              )}
            </p>
            <button
              type='button'
              onClick={handleBackToSignup}
              className='text-sm text-blue-600 hover:text-blue-800'
            >
              {dict.auth?.emailVerification?.buttons?.useDifferentEmail}
            </button>
          </div>

          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <PasswordInput
              id='password'
              label={dict.auth?.emailVerification?.form?.password?.label || 'Password'}
              placeholder={
                dict.auth?.emailVerification?.form?.password?.placeholder || 'Enter your password'
              }
              value={password}
              onChange={handlePasswordChange}
              disabled={isProcessing}
              error={error || undefined}
            />

            <EmailVerificationButton
              disabled={isProcessing || !password.trim()}
              isProcessing={isProcessing}
              isSending={false}
              text={dict.auth?.emailVerification?.buttons?.signIn || 'Sign In'}
              processingText={dict.auth?.emailVerification?.buttons?.signingIn || 'Signing in...'}
              sendingText={dict.auth?.emailVerification?.buttons?.signingIn || 'Signing in...'}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
