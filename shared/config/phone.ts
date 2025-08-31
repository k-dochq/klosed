export const DEFAULT_COUNTRY_CODE = '+82';

export const COUNTRY_CODES = [
  { code: '+82', name: '한국', flag: '🇰🇷' },
  { code: '+1', name: '미국', flag: '🇺🇸' },
  { code: '+81', name: '일본', flag: '🇯🇵' },
  { code: '+66', name: '태국', flag: '🇹🇭' },
  { code: '+86', name: '중국', flag: '🇨🇳' },
  { code: '+44', name: '영국', flag: '🇬🇧' },
  { code: '+33', name: '프랑스', flag: '🇫🇷' },
  { code: '+49', name: '독일', flag: '🇩🇪' },
  { code: '+39', name: '이탈리아', flag: '🇮🇹' },
  { code: '+34', name: '스페인', flag: '🇪🇸' },
] as const;

export const PHONE_ERROR_CODES = {
  INVALID_PHONE: 'INVALID_PHONE',
  INVALID_CODE: 'INVALID_CODE',
  EXPIRED_CODE: 'EXPIRED_CODE',
  TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS',
} as const;
