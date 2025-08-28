import { HeaderLogo } from './HeaderLogo';
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher';
import { type Locale } from 'shared/config';
import { LocaleLink } from '@/shared/ui';

interface HeaderProps {
  currentLang: Locale;
}

export function Header({ currentLang }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full bg-white px-4 sm:px-0'>
      <div className='flex items-center justify-between py-4'>
        <LocaleLink href='/'>
          <HeaderLogo />
        </LocaleLink>
        <HeaderLanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  );
}
