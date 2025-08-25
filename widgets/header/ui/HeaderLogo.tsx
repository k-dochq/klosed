export function HeaderLogo() {
  return (
    <div className='flex items-center gap-2'>
      <button className='flex items-center gap-2 rounded-lg transition-colors hover:bg-gray-50'>
        <img src='/images/logo/klosed_logo.png' alt='Klosed' className='h-8 w-auto' />
      </button>
    </div>
  );
}
