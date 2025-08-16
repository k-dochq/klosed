import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * 재사용 가능한 카드 컴포넌트
 */
export function Card({ children, className = '', hover = false }: CardProps) {
  const baseClasses =
    'rounded-2xl border border-black/10 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-white/5';
  const hoverClasses = hover ? 'transition-shadow hover:shadow-md' : '';
  const shadowClasses = 'shadow-sm';

  return (
    <div className={`${baseClasses} ${shadowClasses} ${hoverClasses} ${className}`}>{children}</div>
  );
}
