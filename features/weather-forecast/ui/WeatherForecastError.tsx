import { ErrorDisplay } from 'shared/ui/error-display';
import type { Dictionary } from 'shared/model/types';

interface WeatherForecastErrorProps {
  error: unknown;
  dict: Dictionary;
}

export function WeatherForecastError({ error, dict }: WeatherForecastErrorProps) {
  return (
    <ErrorDisplay
      error={error}
      title={dict.weather.error.title}
      description={dict.weather.error.description}
    />
  );
}
