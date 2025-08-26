import { TourCarousel } from 'widgets/tour-carousel';
import { KlosedPicks } from 'widgets/klosed-picks';
import { WeatherForecast } from 'features/weather-forecast';
import { TimeDifference } from 'features/time-difference';
import { createLocalizedTours } from 'entities/tour';
import { createLocalizedKlosedPicks } from 'entities/klosed-pick';
import { getDictionary } from '../dictionaries';
import { type Locale } from 'shared/config';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const localizedTours = createLocalizedTours(dict.tours);
  const localizedKlosedPicks = createLocalizedKlosedPicks(dict.klosedPicks);

  return (
    <div>
      <TourCarousel tours={localizedTours} />
      <KlosedPicks data={localizedKlosedPicks} />
      <WeatherForecast dict={dict} />
      <TimeDifference dict={dict} />
    </div>
  );
}
