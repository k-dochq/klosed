'use client';

interface ErrorMessageProps {
  error: string | null;
}

/**
 * 에러 메시지 표시 컴포넌트
 */
export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className='rounded-md border border-red-200 bg-red-50 p-3'>
      <p className='text-sm text-red-600'>{error}</p>
    </div>
  );
}
