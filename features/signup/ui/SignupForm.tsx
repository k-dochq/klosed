'use client';

import { useSignupForm } from 'features/signup/model';
import { EmailField } from './EmailField';
import { PasswordField } from './PasswordField';
import { TermsField } from './TermsField';

interface SignupFormProps {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTermsChange: (agreed: boolean) => void;
  showEmailField?: boolean;
  dict?: {
    email?: { label?: string; placeholder?: string };
    password?: { label?: string; placeholder?: string };
    terms?: string;
  };
}

export function SignupForm({
  onEmailChange,
  onPasswordChange,
  onTermsChange,
  showEmailField = true,
  dict,
}: SignupFormProps) {
  const {
    email,
    password,
    agreedToTerms,
    handleEmailChange,
    handlePasswordChange,
    handleTermsChange,
  } = useSignupForm({
    onEmailChange,
    onPasswordChange,
    onTermsChange,
  });

  return (
    <div className='w-full space-y-6'>
      {/* 이메일 필드 - 조건부 표시 */}
      {showEmailField ? (
        <EmailField
          value={email}
          onChange={handleEmailChange}
          placeholder={dict?.email?.placeholder || 'Enter your email address'}
        />
      ) : (
        /* 이메일 표시 - 읽기 전용 */
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            {dict?.email?.label || 'Email address'}
          </label>
          <div className='w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700'>
            {email}
          </div>
          <p className='text-xs text-gray-500'>Verification email sent to this address</p>
        </div>
      )}

      <PasswordField
        value={password}
        onChange={handlePasswordChange}
        placeholder={dict?.password?.placeholder || 'Create a secure password'}
      />

      <TermsField
        checked={agreedToTerms}
        onChange={handleTermsChange}
        text={dict?.terms || 'I agree to the Terms of Service and Privacy Policy'}
      />
    </div>
  );
}
