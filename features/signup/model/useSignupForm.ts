'use client';

import { useState } from 'react';

interface UseSignupFormProps {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTermsChange: (agreed: boolean) => void;
}

export function useSignupForm({
  onEmailChange,
  onPasswordChange,
  onTermsChange,
}: UseSignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onEmailChange(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    onPasswordChange(value);
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreedToTerms(checked);
    onTermsChange(checked);
  };

  return {
    email,
    password,
    agreedToTerms,
    handleEmailChange,
    handlePasswordChange,
    handleTermsChange,
  };
}