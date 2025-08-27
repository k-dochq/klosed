'use client';

import { useSignupForm } from 'features/signup/model';
import { EmailField } from './EmailField';
import { PasswordField } from './PasswordField';
import { TermsField } from './TermsField';

interface SignupFormProps {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTermsChange: (agreed: boolean) => void;
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
      <EmailField
        value={email}
        onChange={handleEmailChange}
        placeholder={dict?.email?.placeholder || 'Enter your email address'}
      />

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
