import { Card } from 'shared/ui/card';
import { Badge } from 'shared/ui/badge';
import { formatCurrency } from 'shared/lib/currency';
import type { Booking } from 'entities/home';
import type { Dictionary } from 'shared/model/types';

interface BookingCardProps {
  booking: Booking;
  creditBalance: number;
  dict: Dictionary['home']['sections']['booking'];
}

/**
 * 예약 카드 컴포넌트
 * entities 레이어 - 예약 도메인 객체의 표시를 담당
 */
export function BookingCard({ booking, creditBalance, dict }: BookingCardProps) {
  return (
    <Card className='p-5'>
      <div className='space-y-2 text-sm'>
        <div className='flex items-center justify-between'>
          <span className='text-black/60 dark:text-white/60'>{dict.itinerary}</span>
          <span className='font-medium'>{booking.itinerary?.title ?? '-'}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-black/60 dark:text-white/60'>{dict.total}</span>
          <span className='font-medium'>
            {formatCurrency(booking.totalAmountCents ?? 0, booking.currency)}
          </span>
        </div>
        <div>
          <div className='mb-1 text-black/60 dark:text-white/60'>{dict.payments}</div>
          <div className='flex flex-wrap gap-2'>
            {booking.payments.length === 0 ? (
              <span className='text-sm text-black/60 dark:text-white/60'>{dict.none}</span>
            ) : (
              booking.payments.map((p) => (
                <Badge key={p.id} variant='outline' size='md' className='gap-2'>
                  <span className='font-medium'>
                    {formatCurrency(p.amountCents ?? 0, p.currency)}
                  </span>
                  <span className='h-1 w-1 rounded-full bg-black/30 dark:bg-white/30' />
                  <span className='tracking-wide text-black/50 uppercase dark:text-white/50'>
                    {p.status}
                  </span>
                </Badge>
              ))
            )}
          </div>
        </div>
        <div className='flex items-center justify-between border-t border-black/10 pt-2 dark:border-white/10'>
          <span className='text-black/60 dark:text-white/60'>{dict.creditBalance}</span>
          <span className='font-semibold'>{formatCurrency(creditBalance, 'THB')}</span>
        </div>
      </div>
    </Card>
  );
}
