import { Card } from 'shared/ui/card';
import { Badge } from 'shared/ui/badge';
import { formatCurrency } from 'shared/lib/currency';
import type { Itinerary } from 'entities/home';
import type { Dictionary } from 'shared/model/types';

interface ItineraryCardProps {
  itinerary: Itinerary;
  dict: Dictionary['home']['sections']['itinerary'];
}

/**
 * 일정 카드 컴포넌트
 * entities 레이어 - 일정 도메인 객체의 표시를 담당
 */
export function ItineraryCard({ itinerary, dict }: ItineraryCardProps) {
  return (
    <Card className='p-5'>
      <div className='text-sm font-medium'>{itinerary.title}</div>
      <div className='mb-3 text-xs text-black/60 dark:text-white/60'>
        {dict.guest}: {itinerary.profile?.displayName ?? '-'}
      </div>
      {itinerary.items.length === 0 ? (
        <p className='text-sm text-black/60 dark:text-white/60'>{dict.noItems}</p>
      ) : (
        <ul className='relative space-y-2 pl-4'>
          <span className='absolute top-1 bottom-1 left-1 w-px bg-black/10 dark:bg-white/10' />
          {itinerary.items.map((it) => (
            <li key={it.id} className='relative text-sm'>
              <span className='absolute top-1.5 -left-[7px] h-3 w-3 rounded-full border border-black/10 bg-white dark:border-white/15 dark:bg-white/10' />
              <Badge className='mr-2' size='sm'>
                {dict.day} {it.dayIndex ?? '-'}
              </Badge>
              <span className='font-medium'>{it.product.title}</span>
              {it.product.basePriceCents != null && (
                <span className='ml-2 text-black/50 dark:text-white/50'>
                  {formatCurrency(it.product.basePriceCents, it.product.currency)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
