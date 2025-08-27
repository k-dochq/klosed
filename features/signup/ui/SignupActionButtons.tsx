'use client';

interface SignupActionButtonsProps {
  onCancel: () => void;
  onContinue: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function SignupActionButtons({
  onCancel,
  onContinue,
  isLoading = false,
  isDisabled = false,
}: SignupActionButtonsProps) {
  return (
    <div className='floating-action-container fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4'>
      <div className='mx-auto flex max-w-md space-x-3'>
        {/* Cancel Button */}
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='flex-1 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Cancel
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
              Loading...
            </div>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
}
