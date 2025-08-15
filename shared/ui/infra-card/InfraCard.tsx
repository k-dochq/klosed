import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfraCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'current' | 'planned';
  className?: string;
}

export function InfraCard({
  icon: Icon,
  title,
  subtitle,
  children,
  variant = 'current',
  className = '',
}: InfraCardProps) {
  const variants = {
    current: 'border-blue-500/40 bg-white',
    planned: 'border-amber-400/60 bg-amber-50',
  };

  const iconVariants = {
    current: 'text-blue-600',
    planned: 'text-amber-700',
  };

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${variants[variant]} ${className}`}>
      <div className='flex items-center gap-2 font-semibold'>
        <Icon className={`h-5 w-5 ${iconVariants[variant]}`} />
        {title}
      </div>
      {subtitle && <div className='mt-1 text-xs text-slate-500'>{subtitle}</div>}
      {children && <div className='mt-1'>{children}</div>}
    </div>
  );
}
