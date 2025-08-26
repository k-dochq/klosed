import { SUPPORTED_LOCALES } from 'shared/config';

/**
 * URL에서 로케일을 추출
 */
export function extractLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (
    firstSegment &&
    SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number])
  ) {
    return firstSegment;
  }

  return null;
}

/**
 * 로케일이 포함된 경로인지 확인
 */
export function hasLocaleInPath(pathname: string): boolean {
  return extractLocaleFromPath(pathname) !== null;
}
