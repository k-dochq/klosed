import { useRouter as useNextRouter, usePathname } from 'next/navigation';
import { DEFAULT_LOCALE, type Locale } from 'shared/config';

/**
 * 다국어 지원을 위한 useRouter 래퍼 훅
 * 자동으로 현재 locale을 경로에 추가하여 다국어 라우팅을 지원
 */
export function useLocalizedRouter() {
  const router = useNextRouter();
  const pathname = usePathname();

  // 현재 경로에서 locale 추출
  const currentLocale = (pathname.split('/')[1] as Locale) || DEFAULT_LOCALE;

  /**
   * 경로에 locale을 자동으로 추가하는 헬퍼 함수
   */
  const localizePath = (href: string, targetLocale?: Locale): string => {
    // 외부 링크 처리 (http, mailto, tel 등)
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }

    // 이미 로케일이 포함된 링크 처리
    const target = targetLocale || currentLocale;
    const hasLocalePrefix = href.startsWith(`/${target}/`) || href === `/${target}`;

    if (hasLocalePrefix) {
      return href;
    }

    // 로케일 추가
    return href.startsWith('/') ? `/${target}${href}` : `/${target}/${href}`;
  };

  /**
   * 다국어 지원 push 메소드
   */
  const push = (href: string, options?: Parameters<typeof router.push>[1]) => {
    const localizedHref = localizePath(href);
    return router.push(localizedHref, options);
  };

  /**
   * 다국어 지원 replace 메소드
   */
  const replace = (href: string, options?: Parameters<typeof router.replace>[1]) => {
    const localizedHref = localizePath(href);
    return router.replace(localizedHref, options);
  };

  /**
   * 다국어 지원 refresh 메소드 (locale 변경 없음)
   */
  const refresh = () => {
    return router.refresh();
  };

  /**
   * 다국어 지원 back 메소드 (locale 변경 없음)
   */
  const back = () => {
    return router.back();
  };

  /**
   * 다국어 지원 forward 메소드 (locale 변경 없음)
   */
  const forward = () => {
    return router.forward();
  };

  /**
   * 다국어 지원 prefetch 메소드
   */
  const prefetch = (href: string, options?: Parameters<typeof router.prefetch>[1]) => {
    const localizedHref = localizePath(href);
    return router.prefetch(localizedHref, options);
  };

  return {
    // 다국어 지원 메소드들
    push,
    replace,
    refresh,
    back,
    forward,
    prefetch,

    // 유틸리티
    localizePath,
    currentLocale,
  };
}
