import { forwardRef } from 'react';
import { cn } from 'shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
          variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',
          variant === 'outline' &&
            'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
          variant === 'secondary' &&
            'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
          variant === 'ghost' &&
            'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100',
          variant === 'link' &&
            'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400',
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-9 rounded-md px-3',
          size === 'lg' && 'h-11 rounded-md px-8',
          size === 'icon' && 'h-10 w-10',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
