import { getWeatherData } from 'shared/api/weather';
import { WeatherForecastTitle } from './WeatherForecastTitle';
import { WeatherForecastGrid } from './WeatherForecastGrid';
import { WeatherForecastError } from './WeatherForecastError';

export async function WeatherForecast() {
  try {
    const weatherData = await getWeatherData();

    return (
      <div className='mx-auto px-4 py-6'>
        <WeatherForecastTitle />
        <WeatherForecastGrid weatherData={weatherData} />
      </div>
    );
  } catch (error) {
    return (
      <div className='mx-auto max-w-md px-4 py-6'>
        <WeatherForecastTitle />
        <WeatherForecastError error={error} />
      </div>
    );
  }
}
