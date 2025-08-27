'use client';

interface SignupActionButtonsProps {
  onCancel: () => void;
  onContinue: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  dict?: {
    cancel?: string;
    continue?: string;
    loading?: string;
  };
}

export function SignupActionButtons({
  onCancel,
  onContinue,
  isLoading = false,
  isDisabled = false,
  dict,
}: SignupActionButtonsProps) {
  return (
    <div className='floating-action-container fixed right-0 bottom-0 left-0 z-50 mx-auto flex w-full space-x-4 p-3'>
      {/* Cancel Button */}
      <button
        onClick={onCancel}
        disabled={isLoading}
        className='flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {dict?.cancel || 'Cancel'}
      </button>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={isLoading || isDisabled}
        className='flex-1 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <div className='mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
            {dict?.loading || 'Creating account...'}
          </div>
        ) : (
          dict?.continue || 'Continue'
        )}
      </button>
    </div>
  );
}
