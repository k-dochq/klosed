'use client';

import { Globe } from 'lucide-react';
import { LOCALE_LABELS, type Locale } from 'shared/config';
import Link from 'next/link';
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
            asChild
            key={localeKey}
            // 선택된 언어에 스타일 적용
            className={[
              'cursor-pointer px-4 py-2 text-sm transition-colors',
              currentLang === localeKey
                ? 'bg-blue-50 font-semibold text-blue-600'
                : 'text-gray-700',
            ].join(' ')}
          >
            <Link href={`/${localeKey}`}>{label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
