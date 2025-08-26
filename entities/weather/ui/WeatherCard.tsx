import { WeatherIcon } from './WeatherIcon';
import { WeatherDate } from './WeatherDate';
import { WeatherTemperature } from './WeatherTemperature';

interface WeatherCardProps {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  index: number;
  className?: string;
}

export function WeatherCard({
  date,
  weatherCode,
  maxTemperature,
  minTemperature,
  index,
  className = '',
}: WeatherCardProps) {
  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      <WeatherIcon weatherCode={weatherCode} />

      <div className='text-center'>
        <WeatherDate date={date} index={index} />
        <WeatherTemperature maxTemperature={maxTemperature} minTemperature={minTemperature} />
      </div>
    </div>
  );
}
