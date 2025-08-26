export function ActionButtons() {
  return (
    <div className='floating-action-container fixed right-0 bottom-0 left-0 flex w-full border-t border-gray-100 bg-white/95 shadow-lg backdrop-blur-sm'>
      <button className='flex-1 px-6 py-4 text-base font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100'>
        Cancel
      </button>
      <button className='flex-1 bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-gray-800 hover:to-gray-700 active:scale-95'>
        Continue
      </button>
    </div>
  );
}
