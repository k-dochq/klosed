'use client';

import { Locale } from '@/shared/config';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { extractLocaleFromPathname } from 'shared/lib/locale/utils';

interface LocaleLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
  locale?: Locale;
}

export function LocaleLink({ href, children, locale, ...props }: LocaleLinkProps) {
  const pathname = usePathname();
  const currentLocale = extractLocaleFromPathname(pathname);

  // 외부 링크 처리
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // 이미 로케일이 포함된 링크 처리
  const hasLocalePrefix = href.startsWith(`/${currentLocale}/`) || href === `/${currentLocale}`;

  if (hasLocalePrefix) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // 로케일 추가
  const targetLocale = locale || currentLocale;
  const localizedHref = href.startsWith('/')
    ? `/${targetLocale}${href}`
    : `/${targetLocale}/${href}`;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
