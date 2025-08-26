'use client';

import { usePathname } from 'next/navigation';
import { Home, Heart, Calendar, MessageCircle, User } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

interface BottomNavigationNavItem {
  href: string;
  iconName: string;
  label: string;
}

interface BottomNavigationNavProps {
  items: BottomNavigationNavItem[];
}

const iconMap = {
  home: Home,
  heart: Heart,
  calendar: Calendar,
  'message-circle': MessageCircle,
  user: User,
} as const;

export function BottomNavigationNav({ items }: BottomNavigationNavProps) {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-around px-4 py-2'>
      {items.map((item) => {
        const Icon = iconMap[item.iconName as keyof typeof iconMap];
        const isActive =
          (item.href === '/' && (pathname.endsWith('/') || pathname.split('/').length === 2)) ||
          (item.href !== '/' && pathname.includes(item.href));

        return (
          <LocaleLink
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center space-y-1 px-3 py-2 transition-colors ${
              isActive
                ? 'text-amber-500'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Icon className='h-6 w-6' />
            <span className='text-xs font-medium'>{item.label}</span>
          </LocaleLink>
        );
      })}
    </nav>
  );
}
