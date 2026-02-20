import { WeatherData, ExchangeRateData } from 'entities/weather/model/types';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`,
    { next: { revalidate: 300 } }, // 5분마다 재검증
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}

export async function fetchExchangeRateData(): Promise<ExchangeRateData> {
  const response = await fetch(
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/thb.json',
    { next: { revalidate: 3600 } }, // 1시간마다 재검증
  );

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rate data');
  }

  return response.json();
}
