import { Section } from 'shared/ui/section';
import { ItineraryCard } from 'entities/home';
import type { Itinerary } from 'entities/home';
import type { Dictionary } from 'shared/model/types';

interface ItinerarySectionProps {
  itinerary: Itinerary | null;
  dict: Dictionary['home']['sections']['itinerary'];
}

/**
 * 일정 섹션 위젯
 * widgets 레이어 - 최신 일정을 표시하는 복합 컴포넌트
 */
export function ItinerarySection({ itinerary, dict }: ItinerarySectionProps) {
  return (
    <Section title={dict.title}>
      {!itinerary ? (
        <p className='text-sm text-black/60 dark:text-white/60'>{dict.empty}</p>
      ) : (
        <ItineraryCard itinerary={itinerary} dict={dict} />
      )}
    </Section>
  );
}
