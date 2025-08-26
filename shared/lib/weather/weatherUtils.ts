export function formatDate(dateString: string, index: number): string {
  if (index === 0) return 'Today';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return `${index + 1}일`;
    }
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  } catch {
    return `${index + 1}일`;
  }
}

export function getWeatherDescription(weatherCode: number): string {
  if (weatherCode === 0) return '맑음';
  if (weatherCode === 1 || weatherCode === 2) return '구름 조금';
  if (weatherCode === 3) return '흐림';
  if (weatherCode >= 51 && weatherCode <= 67) return '비';
  if (weatherCode >= 80 && weatherCode <= 99) return '폭풍';
  return '알 수 없음';
}
