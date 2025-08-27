'use client';

interface SignupHeaderProps {
  title: string;
  subtitle: string;
}

export function SignupHeader({ title, subtitle }: SignupHeaderProps) {
  return (
    <div className='flex flex-col items-center space-y-6 text-center'>
      {/* Clean Logo */}
      <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-gray-900 shadow-lg'>
        <div className='text-2xl font-bold text-white'>K</div>
      </div>

      {/* Title Section */}
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>{title}</h1>
        <p className='text-lg leading-relaxed text-gray-600'>{subtitle}</p>
      </div>
    </div>
  );
}
