import type { TimeData } from 'shared/lib/time';

interface TimeCardProps {
  timeData: TimeData;
  cityName: string;
  className?: string;
}

export function TimeCard({ timeData, cityName, className = '' }: TimeCardProps) {
  return (
    <div className={`rounded-3xl bg-gray-200 p-6 ${className}`}>
      <h2 className='mb-4 text-xl font-bold text-gray-900'>{cityName}</h2>
      <div className='mb-2 text-4xl font-bold text-gray-900'>{timeData.time}</div>
      <div className='text-sm text-gray-700'>{timeData.date}</div>
    </div>
  );
}
