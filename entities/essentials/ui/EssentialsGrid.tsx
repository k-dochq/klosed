import { ReactNode } from 'react';

interface EssentialsGridProps {
  children: ReactNode;
  className?: string;
}

export function EssentialsGrid({ children, className = '' }: EssentialsGridProps) {
  return <div className={`flex gap-4 ${className}`}>{children}</div>;
}
