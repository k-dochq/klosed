interface StatusBadgeProps {
  variant: 'current' | 'planned';
  children: React.ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  const variants = {
    current: 'border-blue-500/40 bg-blue-50 text-blue-700',
    planned: 'border-amber-500/40 bg-amber-50 text-amber-800',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
