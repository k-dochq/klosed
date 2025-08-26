import { ReactNode } from 'react';

interface TimeDifferenceGridProps {
  children: ReactNode;
  className?: string;
}

export function TimeDifferenceGrid({ children, className = '' }: TimeDifferenceGridProps) {
  return <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`}>{children}</div>;
}
