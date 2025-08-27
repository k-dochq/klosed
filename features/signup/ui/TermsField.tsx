import { Checkbox } from 'shared/ui/checkbox';

interface TermsFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  text?: string;
  className?: string;
}

export function TermsField({ checked, onChange, text, className }: TermsFieldProps) {
  return (
    <div className={`flex items-center space-x-3 pt-2 ${className || ''}`}>
      <Checkbox id='terms' checked={checked} onChange={onChange} />
      <label
        htmlFor='terms'
        className='flex-1 cursor-pointer text-sm leading-relaxed text-gray-700'
      >
        <span className='select-none'>
          {text || 'I agree to the Terms of Service and Privacy Policy'}
        </span>
      </label>
    </div>
  );
}
