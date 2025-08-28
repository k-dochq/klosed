'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';
import { LINE_AUTH_ERROR_CODES } from 'shared/config/error-codes';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from '@/shared/model';

/**
 * LINE 로그인 핸들러
 * LINE 인증 성공 후 이메일로 자동 로그인 처리
 */
interface LineLoginHandlerProps {
  email: string;
  dictionary: Dictionary;
}

export function LineLoginHandler({ email, dictionary }: LineLoginHandlerProps) {
  const router = useLocalizedRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasHandledRef = useRef(false); // 완료 여부 추적
  const isProcessingRef = useRef(false); // 처리 중 상태 추적

  const lineLoginTexts = useMemo(
    () => ({
      processing: dictionary.auth.lineLogin.processing,
      success: dictionary.auth.lineLogin.success,
      error: dictionary.auth.lineLogin.error,
    }),
    [dictionary.auth.lineLogin], // 객체 전체를 의존성으로
  );

  useEffect(() => {
    // 강화된 방어코드: 완료 여부와 처리 중 여부 모두 체크
    if (hasHandledRef.current || isProcessingRef.current) {
      return;
    }

    const handleLogin = async () => {
      try {
        // 이중 체크 + 처리 중 상태 즉시 설정
        if (hasHandledRef.current || isProcessingRef.current) {
          return;
        }

        hasHandledRef.current = true;
        isProcessingRef.current = true; // 처리 시작 즉시 표시

        setStatus('loading');
        setMessage(lineLoginTexts.processing);

        const supabase = createClient();

        // LINE 계정으로 이메일 로그인 (passwordless)
        const { data: _data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: PASSWORDLESS_AUTH_PASSWORD,
        });

        if (error) {
          throw error;
        }

        setStatus('success');
        setMessage(lineLoginTexts.success);

        setTimeout(() => {
          router.push('/');
        }, 500);
      } catch (error) {
        console.error('LINE login handler error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : lineLoginTexts.error);

        setTimeout(() => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          router.push(
            `/auth/failure?code=${LINE_AUTH_ERROR_CODES.LINE_LOGIN_FAILED}&provider=line&message=${encodeURIComponent(errorMessage)}`,
          );
        }, 1000);
      } finally {
        // 처리 완료 시 상태 정리
        isProcessingRef.current = false;
      }
    };

    handleLogin();
  }, [email, router, lineLoginTexts]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      hasHandledRef.current = false;
      isProcessingRef.current = false;
    };
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center'>
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
