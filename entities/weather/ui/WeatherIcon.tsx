import { Sun, Cloud, CloudRain, Zap } from 'lucide-react';

interface WeatherIconProps {
  weatherCode: number;
  className?: string;
}

export function WeatherIcon({ weatherCode, className = 'w-12 h-12' }: WeatherIconProps) {
  const getWeatherIcon = () => {
    if (weatherCode === 0 || weatherCode === 1) {
      return <Sun className={`${className} text-yellow-500`} />;
    } else if (weatherCode === 2 || weatherCode === 3) {
      return <Cloud className={`${className} text-gray-500`} />;
    } else if (weatherCode >= 51 && weatherCode <= 67) {
      return <CloudRain className={`${className} text-blue-500`} />;
    } else if (weatherCode >= 80 && weatherCode <= 99) {
      return <Zap className={`${className} text-purple-500`} />;
    } else {
      return <Sun className={`${className} text-yellow-500`} />;
    }
  };

  return <div className='flex items-center justify-center'>{getWeatherIcon()}</div>;
}
