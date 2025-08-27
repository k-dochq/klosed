'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from 'shared/lib/supabase/client';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';
import { type Dictionary } from 'shared/model/types';

/**
 * LINE 로그인 핸들러
 * LINE 인증 성공 후 이메일로 자동 로그인 처리
 */
interface LineLoginHandlerProps {
  email: string;
  dictionary: Dictionary;
}

export function LineLoginHandler({ email, dictionary }: LineLoginHandlerProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  // dictionary의 lineLogin 부분을 메모화하여 의존성 배열 문제 해결
  const lineLoginTexts = useMemo(
    () => ({
      processing: dictionary.auth.lineLogin.processing,
      success: dictionary.auth.lineLogin.success,
      error: dictionary.auth.lineLogin.error,
    }),
    [
      dictionary.auth.lineLogin.processing,
      dictionary.auth.lineLogin.success,
      dictionary.auth.lineLogin.error,
    ],
  );

  useEffect(() => {
    const handleLogin = async () => {
      try {
        setStatus('loading');
        setMessage(lineLoginTexts.processing);

        const supabase = createClient();

        // LINE 계정으로 이메일 로그인 (passwordless)
        const { data: _data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: PASSWORDLESS_AUTH_PASSWORD,
        });

        if (error) {
          throw error;
        }

        setStatus('success');
        setMessage(lineLoginTexts.success);

        // 성공 시 홈페이지로 이동
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } catch (error) {
        console.error('LINE login handler error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : lineLoginTexts.error);

        // 에러 시 로그인 페이지로 이동
        setTimeout(() => {
          router.push('/auth/email-login');
        }, 3000);
      }
    };

    handleLogin();
  }, [email, router, lineLoginTexts]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <div className='text-center'>
          <h1 className='mb-4 text-2xl font-bold text-gray-900'>
            {dictionary.auth.lineLogin.title}
          </h1>

          {status === 'loading' && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500'></div>
              <p className='text-gray-600'>{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100'>
                <svg className='h-5 w-5 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='font-medium text-green-600'>{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-red-100'>
                <svg className='h-5 w-5 text-red-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='font-medium text-red-600'>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
