import Link from 'next/link';
import { LOCALE_LABELS, type Locale } from 'shared/config';

interface LanguageSwitcherProps {
  currentLang: Locale;
  className?: string;
  baseUrl?: string; // '/auth/login' 같은 기본 경로
}

export function LanguageSwitcher({
  currentLang,
  className = '',
  baseUrl = '',
}: LanguageSwitcherProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {Object.entries(LOCALE_LABELS).map(([localeKey, label]) => (
        <Link
          key={localeKey}
          href={`/${localeKey}${baseUrl}`}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            currentLang === localeKey
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
