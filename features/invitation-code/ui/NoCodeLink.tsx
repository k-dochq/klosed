interface NoCodeLinkProps {
  text: string;
}

export function NoCodeLink({ text }: NoCodeLinkProps) {
  return (
    <div className='w-full text-left'>
      <button className='group flex items-center space-x-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900'>
        <span>{text}</span>
        <span className='text-gray-400 transition-transform duration-200 group-hover:translate-x-1'>
          &gt;
        </span>
      </button>
    </div>
  );
}
