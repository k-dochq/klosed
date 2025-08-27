import { Input } from 'shared/ui/input';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function EmailField({ value, onChange, placeholder, className }: EmailFieldProps) {
  return (
    <div className={`space-y-3 ${className || ''}`}>
      <Input
        type="email"
        placeholder={placeholder || 'Enter your email address'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}