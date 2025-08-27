import { INVITE_CODE_ERROR_CODES } from 'shared/config/error-codes';

/**
 * 검증 결과 인터페이스 - NestJS 스타일
 */
export interface ValidationResult<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}

/**
 * 검증 성공 결과 생성
 */
function createSuccessResult<T>(data: T): ValidationResult<T> {
  return { success: true, data };
}

/**
 * 검증 실패 결과 생성
 */
function createFailureResult(error: string): ValidationResult<never> {
  return { success: false, error };
}

export interface InviteCodeInput {
  readonly code: string;
}

/**
 * 초대코드 검증 옵션
 */
export interface InviteCodeValidationOptions {
  readonly maxLength?: number;
}

/**
 * 초대코드 검증 서비스 - NestJS 스타일
 * 타입 안전하고 간단한 함수형 프로그래밍 방식
 */
export class InviteCodeValidator {
  private readonly maxLength: number;

  constructor(options: InviteCodeValidationOptions = {}) {
    this.maxLength = options.maxLength ?? 50;
  }

  /**
   * 초대코드 입력 검증
   * 체인 형태로 검증을 수행하여 가독성을 높임
   */
  validate(input: unknown): ValidationResult<InviteCodeInput> {
    // 1. 입력이 객체인지 확인
    if (!input || typeof input !== 'object') {
      return createFailureResult(INVITE_CODE_ERROR_CODES.INVALID_INPUT);
    }

    const data = input as Record<string, unknown>;

    // 2. code 필드가 존재하는지 확인
    if (!('code' in data)) {
      return createFailureResult(INVITE_CODE_ERROR_CODES.CODE_REQUIRED);
    }

    const codeValue = data.code;

    // 3. code가 문자열인지 확인
    if (typeof codeValue !== 'string') {
      return createFailureResult(INVITE_CODE_ERROR_CODES.INVALID_INPUT);
    }

    // 4. 공백 제거 및 빈 문자열 검증
    const trimmedCode = codeValue.trim();
    if (trimmedCode.length === 0) {
      return createFailureResult(INVITE_CODE_ERROR_CODES.CODE_REQUIRED);
    }

    // 5. 최대 길이 검증
    if (trimmedCode.length > this.maxLength) {
      return createFailureResult(INVITE_CODE_ERROR_CODES.CODE_TOO_LONG);
    }

    // 6. 검증 성공 - 최종 데이터 반환
    return createSuccessResult({
      code: trimmedCode,
    });
  }

  /**
   * 정적 메소드 - 기본 설정으로 검증
   */
  static validate(input: unknown): ValidationResult<InviteCodeInput> {
    const validator = new InviteCodeValidator();
    return validator.validate(input);
  }

  /**
   * 정적 메소드 - 커스텀 설정으로 검증
   */
  static validateWithOptions(
    input: unknown,
    options: InviteCodeValidationOptions,
  ): ValidationResult<InviteCodeInput> {
    const validator = new InviteCodeValidator(options);
    return validator.validate(input);
  }
}

/**
 * 사용 예시:
 *
 * // 기본 사용
 * const result = InviteCodeValidator.validate({ code: "ABC123" });
 * if (!result.success) {
 *   console.log(result.error); // 에러 메시지
 * }
 *
 * // 커스텀 옵션 사용
 * const result = InviteCodeValidator.validateWithOptions(
 *   { code: "ABC123" },
 *   { maxLength: 10 }
 * );
 *
 * // 인스턴스 사용 (더 많은 제어)
 * const validator = new InviteCodeValidator({ maxLength: 20 });
 * const result = validator.validate({ code: "ABC123" });
 */
