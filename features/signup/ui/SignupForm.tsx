'use client';

import { useState } from 'react';

interface SignupFormProps {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTermsChange: (agreed: boolean) => void;
}

export function SignupForm({ onEmailChange, onPasswordChange, onTermsChange }: SignupFormProps) {
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
      <div className='space-y-2'>
        <input
          type='email'
          placeholder='email address'
          value={email}
          onChange={handleEmailChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
      </div>

      {/* Password Input */}
      <div className='space-y-2'>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
      </div>

      {/* Terms and Conditions */}
      <div className='flex items-center space-x-3'>
        <input
          type='checkbox'
          id='terms'
          checked={agreedToTerms}
          onChange={handleTermsChange}
          className='h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
        />
        <label htmlFor='terms' className='flex items-center space-x-1 text-sm text-gray-600'>
          <span>I agree to terms and conditions.</span>
          <button type='button' className='text-blue-600 hover:text-blue-800'>
            <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </label>
      </div>
    </div>
  );
}
