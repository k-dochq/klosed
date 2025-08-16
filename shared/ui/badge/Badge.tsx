import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * 재사용 가능한 배지 컴포넌트
 */
export function Badge({ children, variant = 'outline', size = 'sm', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full';

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    outline: 'border border-black/10 dark:border-white/15',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}
