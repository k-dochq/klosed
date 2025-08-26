import { ErrorDisplay } from 'shared/ui/error-display';

interface WeatherForecastErrorProps {
  error: unknown;
}

export function WeatherForecastError({ error }: WeatherForecastErrorProps) {
  return (
    <ErrorDisplay
      error={error}
      title='날씨 정보를 불러올 수 없습니다'
      description='서버 연결에 문제가 있거나 일시적인 오류가 발생했습니다'
    />
  );
}
