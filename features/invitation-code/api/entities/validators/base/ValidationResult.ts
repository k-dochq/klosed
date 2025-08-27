/**
 * 검증 결과 인터페이스 - NestJS 스타일
 */
export interface ValidationResult<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly errors?: string[];
}

/**
 * 검증 성공 결과 생성
 */
export function createSuccessResult<T>(data: T): ValidationResult<T> {
  return {
    success: true,
    data,
  };
}

/**
 * 검증 실패 결과 생성
 */
export function createFailureResult(error: string): ValidationResult<never> {
  return {
    success: false,
    error,
  };
}

/**
 * 다중 에러 결과 생성
 */
export function createFailureResults(errors: string[]): ValidationResult<never> {
  return {
    success: false,
    errors,
    error: errors[0],
  };
}
