interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function TextInput({ value, onChange, label, className = '', ...props }: TextInputProps) {
  return (
    <div className='space-y-2'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-800 ${className}`}
        {...props}
      />
    </div>
  );
}
