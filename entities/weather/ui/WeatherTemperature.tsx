interface WeatherTemperatureProps {
  maxTemperature: number;
  minTemperature?: number;
  className?: string;
}

export function WeatherTemperature({
  maxTemperature,
  minTemperature,
  className = 'text-xs text-gray-600 mt-1',
}: WeatherTemperatureProps) {
  return (
    <div className={className}>
      {Math.round(maxTemperature)}°
      {minTemperature !== undefined && (
        <span className='ml-1 text-gray-500'>/ {Math.round(minTemperature)}°</span>
      )}
    </div>
  );
}
