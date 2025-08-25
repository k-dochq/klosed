import { HeaderLogo } from './HeaderLogo';
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher';
import { type Locale } from 'shared/config';

interface HeaderProps {
  currentLang: Locale;
}

export function Header({ currentLang }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full px-4 sm:px-0'>
      <div className='flex items-center justify-between py-4'>
        <HeaderLogo />
        <HeaderLanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  );
}
