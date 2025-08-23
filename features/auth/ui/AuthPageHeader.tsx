interface AuthPageHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthPageHeader({ title, subtitle }: AuthPageHeaderProps) {
  return (
    <div className='text-center'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>{title}</h2>
      <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>{subtitle}</p>
    </div>
  );
}
