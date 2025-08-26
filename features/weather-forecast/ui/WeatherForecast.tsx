import { Suspense } from 'react';
import { WeatherSkeleton } from 'shared/ui/weather-skeleton';
import { WeatherForecastContent } from './WeatherForecastContent';
import type { Dictionary } from 'shared/model/types';

interface WeatherForecastProps {
  dict: Dictionary;
}

export function WeatherForecast({ dict }: WeatherForecastProps) {
  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherForecastContent dict={dict} />
    </Suspense>
  );
}
