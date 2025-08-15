interface ConnectorLineProps {
  topOffset?: number;
  className?: string;
}

export function ConnectorLine({ topOffset = 84, className = '' }: ConnectorLineProps) {
  return (
    <div className={`relative col-span-1 hidden lg:block ${className}`}>
      <svg
        className={`absolute right-0 left-0 h-6 w-full`}
        style={{ top: `${topOffset}px` }}
        viewBox='0 0 64 24'
        fill='none'
      >
        <path
          d='M0,12 C20,0 44,24 64,12'
          stroke='currentColor'
          className='text-slate-400'
          strokeWidth='2'
          fill='none'
        />
      </svg>
    </div>
  );
}
