import { formatDate } from 'shared/lib/weather';

interface WeatherDateProps {
  date: string;
  index: number;
  className?: string;
}

export function WeatherDate({
  date,
  index,
  className = 'text-sm font-medium text-gray-900',
}: WeatherDateProps) {
  return <div className={className}>{formatDate(date, index)}</div>;
}
