import { getWeatherData } from 'shared/api/weather';
import { WeatherForecastTitle } from './WeatherForecastTitle';
import { WeatherForecastGrid } from './WeatherForecastGrid';
import { WeatherForecastError } from './WeatherForecastError';
import type { Dictionary } from 'shared/model/types';

interface WeatherForecastContentProps {
  dict: Dictionary;
}

export async function WeatherForecastContent({ dict }: WeatherForecastContentProps) {
  try {
    const weatherData = await getWeatherData();

    return (
      <div className='mx-auto px-4 py-6'>
        <WeatherForecastTitle dict={dict} />
        <WeatherForecastGrid weatherData={weatherData} />
      </div>
    );
  } catch (error) {
    return (
      <div className='mx-auto max-w-md px-4 py-6'>
        <WeatherForecastTitle dict={dict} />
        <WeatherForecastError error={error} dict={dict} />
      </div>
    );
  }
}
