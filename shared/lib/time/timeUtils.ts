export interface TimeData {
  time: string;
  date: string;
  timezone: string;
}

export function getTimeForTimezone(timezone: string): TimeData {
  const now = new Date();

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    time: timeFormatter.format(now),
    date: dateFormatter.format(now),
    timezone,
  };
}

export function getTimeDifference(hours1: number, hours2: number): string {
  const diff = Math.abs(hours1 - hours2);

  if (diff === 0) return 'same time';
  if (diff === 1) return '1 hour';
  return `${diff} hours`;
}

export function getTimeZoneOffset(timezone: string): number {
  const now = new Date();
  const targetTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (targetTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  return offset;
}
