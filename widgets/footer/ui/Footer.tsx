'use client';

import { usePathname } from 'next/navigation';
import { Home, Heart, Calendar, MessageCircle, User } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

export function Footer() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Discover',
      isActive: pathname.endsWith('/') || pathname.split('/').length === 2,
    },
    {
      href: '/wishlist',
      icon: Heart,
      label: 'Wishlist',
      isActive: pathname.includes('/wishlist'),
    },
    {
      href: '/plan',
      icon: Calendar,
      label: 'Plan',
      isActive: pathname.includes('/plan'),
    },
    {
      href: '/message',
      icon: MessageCircle,
      label: 'Message',
      isActive: pathname.includes('/message'),
    },
    {
      href: '/my',
      icon: User,
      label: 'MY',
      isActive: pathname.includes('/my'),
    },
  ];

  return (
    <footer className='app-container-max fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'>
      <div className='max-w-app-container mx-auto'>
        <nav className='flex items-center justify-around px-4 py-2'>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center space-y-1 px-3 py-2 transition-colors ${
                  item.isActive
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
      </div>
    </footer>
  );
}
