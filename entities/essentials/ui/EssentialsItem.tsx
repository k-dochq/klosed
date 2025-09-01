import { LucideIcon } from 'lucide-react';

interface EssentialsItemProps {
  name: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void;
}

export function EssentialsItem({
  name,
  description,
  icon: Icon,
  className = '',
  onClick,
}: EssentialsItemProps) {
  return (
    <div
      className={`group text-card-foreground relative overflow-hidden rounded-xl bg-white/50 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/70 hover:shadow-lg sm:p-4 ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className='flex flex-col items-center space-y-2 sm:space-y-3'>
        <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors sm:h-12 sm:w-12'>
          <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
        </div>
        <div className='text-center'>
          <h3 className='text-foreground text-xs font-semibold sm:text-sm'>{name}</h3>
          <p className='text-muted-foreground mt-0.5 text-xs leading-tight sm:mt-1'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
