import { WeatherCard } from 'entities/weather';
import type { WeatherData } from 'shared/api/weather';

interface WeatherForecastGridProps {
  weatherData: WeatherData;
}

export function WeatherForecastGrid({ weatherData }: WeatherForecastGridProps) {
  return (
    <div className='rounded-3xl bg-gray-200 p-6'>
      <div className='flex items-center justify-between'>
        {weatherData.daily.time.map((date, index) => (
          <WeatherCard
            key={date}
            date={date}
            weatherCode={weatherData.daily.weathercode[index]}
            maxTemperature={weatherData.daily.temperature_2m_max[index]}
            minTemperature={weatherData.daily.temperature_2m_min[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
