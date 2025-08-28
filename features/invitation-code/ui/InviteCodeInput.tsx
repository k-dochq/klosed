interface InviteCodeInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
}

export function InviteCodeInput({ placeholder, value, onChange, onEnter }: InviteCodeInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className='w-full'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        inputMode='text'
        enterKeyHint='go'
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        spellCheck='false'
        className='w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-center text-lg font-medium text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-gray-400 focus:shadow-md focus:outline-none'
      />
    </div>
  );
}
