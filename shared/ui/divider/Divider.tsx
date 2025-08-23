interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className = '' }: DividerProps) {
  return (
    <div className={`relative ${className}`}>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t border-gray-300 dark:border-gray-600' />
      </div>
      {text && (
        <div className='relative flex justify-center text-sm'>
          <span className='bg-gray-50 px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
            {text}
          </span>
        </div>
      )}
    </div>
  );
}
