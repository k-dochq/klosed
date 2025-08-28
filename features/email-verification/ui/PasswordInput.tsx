'use client';

import { type Dictionary } from 'shared/model/types';

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  error?: string;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = true,
  minLength = 6,
  error,
}: PasswordInputProps) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
        {label}
      </label>
      <input
        id={id}
        type='password'
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>}
    </div>
  );
}
