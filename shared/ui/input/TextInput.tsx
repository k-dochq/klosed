interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength,
  className = '',
}: TextInputProps) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className={`w-full rounded-md border px-4 py-2 text-center font-mono text-sm tracking-widest focus:outline-none ${className}`}
    />
  );
}
