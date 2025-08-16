/**
 * 통화 포맷팅 유틸리티
 */

/**
 * 센트 단위 금액을 통화 포맷으로 변환합니다.
 *
 * @param amountCents - 센트 단위 금액
 * @param currency - 통화 코드 (기본값: THB)
 * @returns 포맷된 통화 문자열
 */
export function formatCurrency(amountCents?: number | null, currency?: string | null): string {
  if (amountCents == null) return '-';

  const cur = currency || 'THB';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cur,
  }).format(amountCents / 100);
}

/**
 * 패키지 아이템들의 총 가격을 계산합니다.
 *
 * @param pkg - 아이템들을 포함한 패키지 객체
 * @returns 총 가격 (센트 단위)
 */
export function sumPackagePriceCents(pkg: {
  items: { item: { basePriceCents: number | null; currency: string | null } }[];
}): number {
  return pkg.items.reduce((acc, pi) => acc + (pi.item.basePriceCents ?? 0), 0);
}
