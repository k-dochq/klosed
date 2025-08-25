/**
 * 클래스명을 병합하는 유틸리티 함수
 * falsy 값들을 필터링하고 공백으로 구분된 문자열로 반환
 *
 * @param classes - 병합할 클래스명들 (문자열, undefined, null, false 허용)
 * @returns 공백으로 구분된 클래스명 문자열
 *
 * @example
 * ```tsx
 * cn('base-class', condition && 'conditional-class', undefined, 'final-class')
 * // 결과: 'base-class conditional-class final-class'
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
