'use client';

import { Globe } from 'lucide-react';
import { LOCALE_LABELS, type Locale } from 'shared/config';
import { localeCookies } from 'shared/lib';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'shared/ui/dropdown-menu';

interface HeaderLanguageSwitcherProps {
  currentLang?: Locale;
}

export function HeaderLanguageSwitcher({ currentLang = 'en' }: HeaderLanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로에서 locale 부분을 제거하고 나머지 경로만 추출
  const getPathWithoutLocale = (path: string) => {
    const pathSegments = path.split('/');
    // 첫 번째 세그먼트가 locale인 경우 제거
    if (pathSegments.length > 1 && Object.keys(LOCALE_LABELS).includes(pathSegments[1])) {
      return '/' + pathSegments.slice(2).join('/');
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  // 모든 locale에 대해 prefetch 수행
  useEffect(() => {
    Object.keys(LOCALE_LABELS).forEach((locale) => {
      const prefetchPath = `/${locale}${pathWithoutLocale}`;
      router.prefetch(prefetchPath);
    });
  }, [router, pathWithoutLocale]);

  // 언어 선택 시 쿠키에 저장하고 페이지 이동하는 핸들러
  const handleLanguageChange = (locale: Locale) => {
    localeCookies.set(locale);
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900'
          aria-label='언어 선택'
          type='button'
        >
          <Globe size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32 border border-gray-200 bg-white shadow-lg'>
        {Object.entries(LOCALE_LABELS).map(([localeKey, label]) => (
          <DropdownMenuItem
            key={localeKey}
            // 선택된 언어에 스타일 적용
            className={[
              'cursor-pointer px-4 py-2 text-sm transition-colors',
              currentLang === localeKey
                ? 'bg-blue-50 font-semibold text-blue-600'
                : 'text-gray-700',
            ].join(' ')}
            onClick={() => handleLanguageChange(localeKey as Locale)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
