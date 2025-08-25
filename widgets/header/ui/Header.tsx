import { HeaderLogo } from './HeaderLogo';
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher';
import { type Locale } from 'shared/config';

interface HeaderProps {
  currentLang: Locale;
}

export function Header({ currentLang }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full'>
      <div className='flex items-center justify-between py-2'>
        <HeaderLogo />
        <HeaderLanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  );
}
