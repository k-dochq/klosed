interface EssentialsItemProps {
  name: string;
  description: string;
  className?: string;
}

export function EssentialsItem({ name, description, className = '' }: EssentialsItemProps) {
  return (
    <div
      className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 ${className}`}
    >
      <div className='text-center'>
        <div className='text-sm font-bold text-gray-900'>{name}</div>
      </div>
    </div>
  );
}
