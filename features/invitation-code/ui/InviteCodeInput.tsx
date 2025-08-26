interface InviteCodeInputProps {
  placeholder: string;
}

export function InviteCodeInput({ placeholder }: InviteCodeInputProps) {
  return (
    <div className='w-full'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-center text-lg font-medium text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-gray-400 focus:shadow-md focus:outline-none'
      />
    </div>
  );
}
