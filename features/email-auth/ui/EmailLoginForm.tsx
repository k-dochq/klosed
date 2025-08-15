'use client';

import { useState } from 'react';
import { useEmailAuth } from '../model/useEmailAuth';

interface EmailLoginFormProps {
  redirectTo?: string;
  className?: string;
  onSuccess?: () => void;
}

export function EmailLoginForm({ redirectTo, className = '', onSuccess }: EmailLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const { signInWithEmail, signUpWithEmail, isLoading, error, message } = useEmailAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    let result;
    if (isSignUpMode) {
      result = await signUpWithEmail(email, password, redirectTo);
    } else {
      result = await signInWithEmail(email, password);
    }

    if (result.data && !result.error && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {isSignUpMode ? '회원가입' : '로그인'}
        </h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          {isSignUpMode ? '이메일과 비밀번호로 계정을 만드세요' : '기존 계정으로 로그인하세요'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            이메일
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            placeholder='your-email@example.com'
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            비밀번호
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            placeholder='6자 이상의 비밀번호'
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

        <button
          type='submit'
          disabled={isLoading || !email || !password}
          className='flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
              <span>{isSignUpMode ? '가입 중...' : '로그인 중...'}</span>
            </div>
          ) : (
            <span>{isSignUpMode ? '회원가입' : '로그인'}</span>
          )}
        </button>
      </form>

      <div className='text-center'>
        <button
          type='button'
          onClick={() => setIsSignUpMode(!isSignUpMode)}
          className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
          disabled={isLoading}
        >
          {isSignUpMode ? '이미 계정이 있으신가요? 로그인하기' : '계정이 없으신가요? 회원가입하기'}
        </button>
      </div>
    </div>
  );
}
