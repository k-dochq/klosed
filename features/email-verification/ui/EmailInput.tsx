'use client';

import { forwardRef } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
  error?: string;
}

/**
 * 이메일 입력 필드 컴포넌트
 */
export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ value, onChange, placeholder, label, disabled = false, error }, ref) => {
    return (
      <div>
        <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <input
          ref={ref}
          id='email'
          type='email'
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

EmailInput.displayName = 'EmailInput';
