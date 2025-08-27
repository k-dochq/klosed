import { createFailureResult, createSuccessResult, ValidationResult } from './ValidationResult';

/**
 * 검증 함수 타입 - NestJS 스타일
 * 간단하고 타입 안전한 검증 함수
 */
export type ValidationFunction<T = unknown> = (value: unknown) => ValidationResult<T>;

/**
 * 문자열 검증 헬퍼 함수들
 */
export const StringValidators = {
  /**
   * 필수 값 검증
   */
  required: (value: unknown, fieldName: string): ValidationResult<string> => {
    if (value === null || value === undefined) {
      return createFailureResult(`${fieldName}은(는) 필수입니다.`);
    }
    if (typeof value !== 'string') {
      return createFailureResult(`${fieldName}은(는) 문자열이어야 합니다.`);
    }
    return createSuccessResult(value);
  },

  /**
   * 최소 길이 검증
   */
  minLength: (value: unknown, minLen: number, fieldName: string): ValidationResult<string> => {
    if (typeof value !== 'string') {
      return createFailureResult(`${fieldName}은(는) 문자열이어야 합니다.`);
    }
    if (value.length < minLen) {
      return createFailureResult(`${fieldName}은(는) 최소 ${minLen}자 이상이어야 합니다.`);
    }
    return createSuccessResult(value);
  },

  /**
   * 최대 길이 검증
   */
  maxLength: (value: unknown, maxLen: number, fieldName: string): ValidationResult<string> => {
    if (typeof value !== 'string') {
      return createFailureResult(`${fieldName}은(는) 문자열이어야 합니다.`);
    }
    if (value.length > maxLen) {
      return createFailureResult(`${fieldName}은(는) 최대 ${maxLen}자까지 허용됩니다.`);
    }
    return createSuccessResult(value);
  },

  /**
   * 공백 제거 및 빈 문자열 검증
   */
  notEmpty: (value: unknown, fieldName: string): ValidationResult<string> => {
    if (typeof value !== 'string') {
      return createFailureResult(`${fieldName}은(는) 문자열이어야 합니다.`);
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return createFailureResult(`${fieldName}은(는) 빈 문자열일 수 없습니다.`);
    }
    return createSuccessResult(trimmed);
  },
} as const;

/**
 * 객체 검증 헬퍼 함수들
 */
export const ObjectValidators = {
  /**
   * 객체 구조 검증
   */
  hasProperty: (value: unknown, propertyName: string): ValidationResult<unknown> => {
    if (!value || typeof value !== 'object') {
      return createFailureResult('객체가 필요합니다.');
    }
    const obj = value as Record<string, unknown>;
    if (!(propertyName in obj)) {
      return createFailureResult(`'${propertyName}' 속성이 필요합니다.`);
    }
    return createSuccessResult(obj[propertyName]);
  },
} as const;
