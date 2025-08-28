'use client';

import { forwardRef } from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
  error?: string;
}

/**
 * 비밀번호 입력 필드 컴포넌트
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, onChange, placeholder, label, disabled = false, error }, ref) => {
    return (
      <div>
        <label htmlFor='password' className='mb-1 block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <input
          ref={ref}
          id='password'
          type='password'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          disabled={disabled}
          required
        />
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
