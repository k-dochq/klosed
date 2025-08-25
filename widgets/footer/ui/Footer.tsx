'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Calendar, MessageCircle, User } from 'lucide-react';
import { type Locale } from 'shared/config';

interface FooterProps {
  currentLang: Locale;
}

export function Footer({ currentLang }: FooterProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: `/${currentLang}`,
      icon: Home,
      label: 'Discover',
      isActive: pathname === `/${currentLang}`,
    },
    {
      href: `/${currentLang}/wishlist`,
      icon: Heart,
      label: 'Wishlist',
      isActive: pathname === `/${currentLang}/wishlist`,
    },
    {
      href: `/${currentLang}/plan`,
      icon: Calendar,
      label: 'Plan',
      isActive: pathname === `/${currentLang}/plan`,
    },
    {
      href: `/${currentLang}/message`,
      icon: MessageCircle,
      label: 'Message',
      isActive: pathname === `/${currentLang}/message`,
    },
    {
      href: `/${currentLang}/my`,
      icon: User,
      label: 'MY',
      isActive: pathname === `/${currentLang}/my`,
    },
  ];

  return (
    <footer className='app-container-max fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'>
      <div className='max-w-app-container mx-auto'>
        <nav className='flex items-center justify-around px-4 py-2'>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
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
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
