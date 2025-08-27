import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';