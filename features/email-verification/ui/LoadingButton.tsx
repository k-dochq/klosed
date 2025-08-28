'use client';

interface LoadingButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  loadingText: string;
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export function LoadingButton({
  isLoading,
  disabled = false,
  loadingText,
  text,
  type = 'submit',
  onClick,
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className='w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
    >
      {isLoading ? (
        <div className='flex items-center justify-center gap-2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
