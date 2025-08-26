export interface WeatherData {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface WeatherApiResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
}
