import { InviteCodeRepository } from 'features/invitation-code/api/infrastructure/repositories/invite-code-repository';
import { INVITE_CODE_ERROR_CODES } from 'shared/config/error-codes';
import type {
  InviteCodeData,
  InviteCodeValidationResult,
} from 'features/invitation-code/api/entities/types';

export class InviteCodeValidationService {
  static async validateCode(code: string): Promise<InviteCodeValidationResult> {
    return {
      isValid: true,
      errorCode: INVITE_CODE_ERROR_CODES.INVALID_CODE,
    };
  }
}
