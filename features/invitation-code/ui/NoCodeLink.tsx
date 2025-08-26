export function NoCodeLink() {
  return (
    <div className='w-full text-left'>
      <button className='group flex items-center space-x-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900'>
        <span>I don&apos;t have an invitation code.</span>
        <span className='text-gray-400 transition-transform duration-200 group-hover:translate-x-1'>
          &gt;
        </span>
      </button>
    </div>
  );
}
