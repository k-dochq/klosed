import { ReactNode } from 'react';

interface EssentialsGridProps {
  children: ReactNode;
  className?: string;
}

export function EssentialsGrid({ children, className = '' }: EssentialsGridProps) {
  return <div className={`grid grid-cols-2 gap-3 ${className}`}>{children}</div>;
}
