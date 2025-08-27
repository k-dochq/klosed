'use client';

interface SignupHeaderProps {
  title: string;
  subtitle: string;
}

export function SignupHeader({ title, subtitle }: SignupHeaderProps) {
  return (
    <div className='flex flex-col items-center space-y-4'>
      {/* Logo Placeholder */}
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-200'>
        <div className='text-2xl font-bold text-gray-400'>K</div>
      </div>

      {/* Title */}
      <h1 className='text-center text-3xl font-bold text-gray-900'>{title}</h1>

      {/* Subtitle */}
      <div className='space-y-1 text-center'>
        <p className='text-lg font-semibold text-gray-900'>{subtitle}</p>
        <p className='text-lg font-semibold text-gray-900'>and become a Klosed member.</p>
      </div>
    </div>
  );
}
