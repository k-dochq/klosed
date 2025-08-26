import type { WeatherData } from './types';

export async function getWeatherData(): Promise<WeatherData> {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=37.57&longitude=126.98&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=Asia/Seoul',
      {
        next: { revalidate: 3600 }, // 1시간마다 재검증
        cache: 'force-cache', // 캐싱 강화
      },
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // 데이터 유효성 검사
    if (!data.daily || !data.daily.time || !data.daily.weathercode) {
      throw new Error('Invalid weather data format');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
}
