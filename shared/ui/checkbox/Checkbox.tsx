'use client';

import { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onChange, className = '', id, ...props }, ref) => {
    const handleClick = () => {
      onChange?.(!checked);
    };

    return (
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
          {...props}
        />
        <div
          className={`
            h-4 w-4 rounded-sm border border-gray-300 transition-all duration-200 cursor-pointer
            ${checked 
              ? 'bg-gray-900 border-gray-900' 
              : 'bg-white hover:border-gray-400'
            }
            focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2
            ${className}
          `}
          onClick={handleClick}
        >
          {checked && (
            <svg
              className="h-3 w-3 text-white absolute inset-0 m-auto"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
            </svg>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';