'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'shared/ui/button';

interface AuthErrorPageProps {
  dict: {
    title: string;
    subtitle: string;
    line: Record<string, string>;
    actions: {
      retry: string;
      backToLogin: string;
      contactSupport: string;
    };
  };
  errorCode?: string;
  provider?: string;
}

export function AuthErrorPage({ dict, errorCode, provider }: AuthErrorPageProps) {
  const router = useRouter();

  const handleRetry = () => {
    // 같은 제공자로 다시 로그인 시도
    if (provider === 'line') {
      // LINE 로그인 다시 시도 로직
      window.location.href = '/auth/login';
    } else {
      router.push('/auth/login');
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  const handleContactSupport = () => {
    // 고객지원 연결 로직 (이메일, 채팅 등)
    window.location.href = 'mailto:support@klosed.com?subject=Login Error';
  };

  const getErrorMessage = () => {
    if (!errorCode) {
      return dict.line.UNKNOWN_ERROR;
    }

    // LINE 제공자의 에러 메시지
    if (provider === 'line' && dict.line[errorCode]) {
      return dict.line[errorCode];
    }

    // 기본 에러 메시지
    return dict.line[errorCode] || dict.line.UNKNOWN_ERROR;
  };

  const getErrorTitle = () => {
    return provider === 'line' ? 'LINE ' + dict.title : dict.title;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* 에러 아이콘 */}
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100 mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* 에러 제목 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getErrorTitle()}
          </h2>

          {/* 에러 부제목 */}
          <p className="text-gray-600 mb-6">
            {dict.subtitle}
          </p>

          {/* 상세 에러 메시지 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-700">
              {getErrorMessage()}
            </p>
            {errorCode && (
              <p className="text-xs text-red-500 mt-2">
                Error Code: {errorCode}
              </p>
            )}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Button
            onClick={handleRetry}
            className="w-full"
            variant="default"
          >
            {dict.actions.retry}
          </Button>

          <Button
            onClick={handleBackToLogin}
            className="w-full"
            variant="secondary"
          >
            {dict.actions.backToLogin}
          </Button>

          <button
            onClick={handleContactSupport}
            className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {dict.actions.contactSupport}
          </button>
        </div>
      </div>
    </div>
  );
}