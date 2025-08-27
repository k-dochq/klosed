import { Input } from 'shared/ui/input';

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function PasswordField({ value, onChange, placeholder, className }: PasswordFieldProps) {
  return (
    <div className={`space-y-3 ${className || ''}`}>
      <Input
        type="password"
        placeholder={placeholder || 'Create a secure password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}