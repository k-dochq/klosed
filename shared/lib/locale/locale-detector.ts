import { type NextRequest } from 'next/server';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from 'shared/config';

/**
 * 우선순위에 따라 locale을 감지합니다:
 * 1. Referer URL에서 locale 추출 (이전 페이지의 언어 유지)
 * 2. Accept-Language 헤더에서 선호 언어 감지
 * 3. 기본 locale
 *
 * @param request - Next.js 요청 객체
 * @returns 감지된 locale 또는 기본 locale
 */
export function getLocale(request: NextRequest): Locale {
  // 1. Referer 헤더에서 이전 페이지의 locale 확인 (최우선)
  const referer = request.headers.get('referer');
  if (referer) {
    const refererLocale = extractLocaleFromUrl(referer);
    if (refererLocale) {
      return refererLocale;
    }
  }

  // 2. Accept-Language 헤더 확인
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    if (isValidLocale(preferredLocale)) {
      return preferredLocale;
    }
  }

  // 3. 기본 locale
  return DEFAULT_LOCALE;
}

/**
 * URL에서 locale을 추출합니다.
 *
 * @param url - 분석할 URL
 * @returns 추출된 locale 또는 null
 */
function extractLocaleFromUrl(url: string): Locale | null {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);

    // 첫 번째 경로 세그먼트가 지원되는 locale인지 확인
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      if (isValidLocale(firstSegment)) {
        return firstSegment as Locale;
      }
    }
  } catch (_error) {
    // URL 파싱 실패 시 무시
    console.warn('Failed to parse referer URL:', url);
  }

  return null;
}
