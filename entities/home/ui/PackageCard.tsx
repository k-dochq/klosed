import { Card } from 'shared/ui/card';
import { Badge } from 'shared/ui/badge';
import { formatCurrency, sumPackagePriceCents } from 'shared/lib/currency';
import type { Package } from 'entities/home';
import type { Dictionary } from 'shared/model/types';

interface PackageCardProps {
  package: Package;
  dict: Dictionary['home']['sections']['packages'];
}

/**
 * 패키지 카드 컴포넌트
 * entities 레이어 - 패키지 도메인 객체의 표시를 담당
 */
export function PackageCard({ package: pkg, dict }: PackageCardProps) {
  return (
    <Card className='group p-4' hover>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <div className='text-sm font-medium'>{pkg.title}</div>
          <div className='mt-1 inline-flex items-center gap-2 text-xs text-black/50 dark:text-white/50'>
            <Badge>
              {pkg.items.length} {dict.items}
            </Badge>
            <Badge>
              {dict.total}{' '}
              {formatCurrency(sumPackagePriceCents(pkg), pkg.items[0]?.item.currency ?? 'THB')}
            </Badge>
          </div>
        </div>
      </div>
      {pkg.items.length > 0 && (
        <ul className='mt-3 space-y-1.5'>
          {pkg.items.map((pi) => (
            <li key={pi.id} className='flex items-center justify-between gap-3 text-sm'>
              <span className='truncate'>{pi.item.title}</span>
              {pi.item.basePriceCents != null && (
                <span className='text-black/50 dark:text-white/50'>
                  {formatCurrency(pi.item.basePriceCents, pi.item.currency)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
