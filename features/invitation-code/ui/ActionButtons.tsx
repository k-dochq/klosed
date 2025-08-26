interface ActionButtonsProps {
  buttons: {
    cancel: string;
    continue: string;
  };
  onCancel: () => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export function ActionButtons({
  buttons,
  onCancel,
  onContinue,
  isLoading = false,
}: ActionButtonsProps) {
  return (
    <div className='fixed right-0 bottom-0 left-0 z-50 bg-gradient-to-t from-white via-white/95 to-white/90 backdrop-blur-xl'>
      <div className='mx-auto max-w-md px-6 py-4'>
        <div className='flex gap-3'>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 rounded-xl border border-gray-200 bg-white px-6 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'
          >
            {buttons.cancel}
          </button>
          <button
            onClick={onContinue}
            disabled={isLoading}
            className='flex-1 rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? '검증 중...' : buttons.continue}
          </button>
        </div>
      </div>
    </div>
  );
}
