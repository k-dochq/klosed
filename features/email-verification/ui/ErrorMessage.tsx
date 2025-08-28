'use client';

import { getEmailErrorMessage } from 'shared/lib/utils';
import { type Dictionary } from 'shared/model/types';

/**
 * 이메일 에러 메시지 표시 컴포넌트
 */
interface EmailErrorMessageProps {
  errorCode: string | null | undefined;
  dict: Dictionary;
}

/**
 * 이메일 에러 메시지 표시 컴포넌트
 */
export function EmailErrorMessage({ errorCode, dict }: EmailErrorMessageProps) {
  if (!errorCode) return null;

  const errorMessage = getEmailErrorMessage(errorCode, dict);

  return (
    <div className='rounded-md border border-red-200 bg-red-50 p-3'>
      <p className='text-sm text-red-600'>{errorMessage}</p>
    </div>
  );
}

/**
 * 일반 에러 메시지 표시 컴포넌트 (기존 호환성 유지)
 */
interface ErrorMessageProps {
  error: string | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className='rounded-md border border-red-200 bg-red-50 p-3'>
      <p className='text-sm text-red-600'>{error}</p>
    </div>
  );
}
