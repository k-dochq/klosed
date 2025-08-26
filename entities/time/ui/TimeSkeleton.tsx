interface TimeSkeletonProps {
  className?: string;
}

export function TimeSkeleton({ className = '' }: TimeSkeletonProps) {
  return (
    <div className={`rounded-3xl bg-gray-200 p-6 ${className}`}>
      <div className='mb-4 h-6 w-24 animate-pulse rounded bg-gray-300'></div>
      <div className='mb-2 h-12 w-20 animate-pulse rounded bg-gray-300'></div>
      <div className='h-4 w-40 animate-pulse rounded bg-gray-300'></div>
    </div>
  );
}
