'use client';

import { COUNTRY_CODES } from 'shared/config';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'shared/ui/dropdown-menu';

interface CountryCodeSelectorProps {
  selectedCode: string;
  onCodeChange: (code: string) => void;
}

export function CountryCodeSelector({ selectedCode, onCodeChange }: CountryCodeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className='flex items-center gap-1 font-semibold text-gray-900 hover:text-gray-700'
          aria-label='국가 코드 선택'
        >
          <span>{selectedCode}</span>
          <svg
            className='h-4 w-4 text-gray-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-56 border border-gray-200 bg-white shadow-lg'>
        {COUNTRY_CODES.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => onCodeChange(country.code)}
            className='cursor-pointer px-3 py-2'
          >
            <div className='flex items-center gap-2'>
              <span>{country.flag}</span>
              <span className='text-sm font-medium'>{country.code}</span>
              <span className='flex-1 text-sm text-gray-600'>{country.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
