import { Section } from 'shared/ui/section';
import { BookingCard } from 'entities/home';
import type { Booking } from 'entities/home';
import type { Dictionary } from 'shared/model/types';

interface BookingSectionProps {
  booking: Booking | null;
  creditBalance: number;
  dict: Dictionary['home']['sections']['booking'];
}

/**
 * 예약 섹션 위젯
 * widgets 레이어 - 최신 예약과 크레딧을 표시하는 복합 컴포넌트
 */
export function BookingSection({ booking, creditBalance, dict }: BookingSectionProps) {
  return (
    <Section title={dict.title}>
      {!booking ? (
        <p className='text-sm text-black/60 dark:text-white/60'>{dict.empty}</p>
      ) : (
        <BookingCard booking={booking} creditBalance={creditBalance} dict={dict} />
      )}
    </Section>
  );
}
