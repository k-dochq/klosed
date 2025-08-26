import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: unknown;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  title = '오류가 발생했습니다',
  description = '잠시 후 다시 시도해주세요',
  onRetry,
  className = '',
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';

  return (
    <div className={`rounded-3xl bg-gray-50 p-8 text-center ${className}`}>
      {/* 에러 아이콘 */}
      <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
        <AlertTriangle className='h-8 w-8 text-red-600' />
      </div>

      {/* 에러 제목 */}
      <h3 className='mb-2 text-lg font-semibold text-gray-900'>{title}</h3>

      {/* 에러 설명 */}
      <p className='mb-4 text-sm text-gray-600'>{description}</p>

      {/* 상세 에러 메시지 */}
      <div className='mb-6 rounded-lg bg-red-50 p-3'>
        <p className='text-xs text-red-700'>{errorMessage}</p>
      </div>

      {/* 재시도 버튼 */}
      {onRetry && (
        <button
          onClick={onRetry}
          className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          <RefreshCw className='h-4 w-4' />
          다시 시도
        </button>
      )}
    </div>
  );
}
