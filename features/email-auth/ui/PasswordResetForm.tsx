'use client';

import { useState } from 'react';
import { useEmailAuth } from '../model/useEmailAuth';

interface PasswordResetFormProps {
  className?: string;
  onBack?: () => void;
}

export function PasswordResetForm({ className = '', onBack }: PasswordResetFormProps) {
  const [email, setEmail] = useState('');
  const { resetPassword, isLoading, error, message } = useEmailAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    await resetPassword(email);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>비밀번호 재설정</h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          가입한 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='reset-email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            이메일
          </label>
          <input
            id='reset-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            placeholder='your-email@example.com'
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/50'>
            <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        {message && (
          <div className='rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/50'>
            <p className='text-sm text-green-600 dark:text-green-400'>{message}</p>
          </div>
        )}

        <div className='flex gap-3'>
          {onBack && (
            <button
              type='button'
              onClick={onBack}
              disabled={isLoading}
              className='flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
            >
              뒤로가기
            </button>
          )}

          <button
            type='submit'
            disabled={isLoading || !email}
            className='flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                <span>전송 중...</span>
              </div>
            ) : (
              <span>재설정 링크 전송</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
