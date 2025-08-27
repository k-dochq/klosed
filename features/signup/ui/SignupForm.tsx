'use client';

import { useState } from 'react';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    onEmailChange(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    onPasswordChange(value);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreedToTerms(checked);
    onTermsChange(checked);
  };

  return (
    <div className='w-full space-y-6'>
      {/* Email Input */}
      <div className='space-y-3'>
        <input
          type='email'
          placeholder={dict?.email?.placeholder || 'Enter your email address'}
          value={email}
          onChange={handleEmailChange}
          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none'
        />
      </div>

      {/* Password Input */}
      <div className='space-y-3'>
        <input
          type='password'
          placeholder={dict?.password?.placeholder || 'Create a secure password'}
          value={password}
          onChange={handlePasswordChange}
          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none'
        />
      </div>

      {/* Terms and Conditions */}
      <div className='flex items-start space-x-4 pt-2'>
        <input
          type='checkbox'
          id='terms'
          checked={agreedToTerms}
          onChange={handleTermsChange}
          className='mt-1 h-5 w-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-gray-900 focus:ring-offset-0'
        />
        <label
          htmlFor='terms'
          className='flex-1 cursor-pointer text-base leading-relaxed text-gray-700'
        >
          <span className='select-none'>
            {dict?.terms || 'I agree to the Terms of Service and Privacy Policy'}
          </span>
        </label>
      </div>
    </div>
  );
}
