import { Suspense } from 'react';
import { WeatherSkeleton } from 'shared/ui/weather-skeleton';
import { WeatherForecastContent } from './WeatherForecastContent';

export function WeatherForecast() {
  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherForecastContent />
    </Suspense>
  );
}
