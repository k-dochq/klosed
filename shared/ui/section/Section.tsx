import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * 페이지 섹션을 위한 공통 컴포넌트
 */
export function Section({ title, children, className = '' }: SectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      <h2 className='text-lg font-semibold'>{title}</h2>
      {children}
    </section>
  );
}
