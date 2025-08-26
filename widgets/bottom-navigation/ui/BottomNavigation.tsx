import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';
import { BottomNavigationNav } from './BottomNavigationNav';

interface BottomNavigationProps {
  currentLang: Locale;
}

export async function BottomNavigation({ currentLang }: BottomNavigationProps) {
  const dict = await getDictionary(currentLang);

  const navItems = [
    {
      href: '/',
      iconName: 'home',
      label: dict.footer.discover,
    },
    {
      href: '/wishlist',
      iconName: 'heart',
      label: dict.footer.wishlist,
    },
    {
      href: '/plan',
      iconName: 'calendar',
      label: dict.footer.plan,
    },
    {
      href: '/message',
      iconName: 'message-circle',
      label: dict.footer.message,
    },
    {
      href: '/my',
      iconName: 'user',
      label: dict.footer.my,
    },
  ];

  return (
    <nav className='app-container-max fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'>
      <div className='mx-auto'>
        <BottomNavigationNav items={navItems} />
      </div>
    </nav>
  );
}
