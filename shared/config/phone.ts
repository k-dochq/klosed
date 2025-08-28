export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
];

export const DEFAULT_COUNTRY_CODE = '+82';
