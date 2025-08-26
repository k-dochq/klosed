import type { Dictionary } from 'shared/model/types';

interface WeatherForecastTitleProps {
  dict: Dictionary;
}

export function WeatherForecastTitle({ dict }: WeatherForecastTitleProps) {
  return (
    <div className='mb-6'>
      <h1 className='mb-2 text-3xl font-bold text-gray-900'>{dict.weather.title}</h1>
      <h2 className='text-xl text-gray-700'>{dict.weather.subtitle}</h2>
    </div>
  );
}
