import Link from 'next/link';
import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';

interface NavigationSectionProps {
  lang: Locale;
  dict: Dictionary['auth']['login'];
}

/**
 * 네비게이션 섹션 위젯
 * widgets 레이어 - 주요 페이지들로의 링크를 제공하는 복합 컴포넌트
 */
export function NavigationSection({ lang, dict }: NavigationSectionProps) {
  return (
    <section className='space-y-4'>
      <div className='flex gap-3'>
        <Link
          href={`/${lang}/auth/login`}
          className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          {dict.title}
        </Link>
        <Link
          href={`/${lang}/invite`}
          className='rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        >
          Invite
        </Link>
      </div>
    </section>
  );
}
