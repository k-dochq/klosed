import { InviteCodeValidationService } from 'features/invitation-code/api/infrastructure/services/invite-code-validation-service';
import type { ValidateInviteCodeUseCaseResult, IValidateInviteCodeUseCase } from './types';

export class ValidateInviteCodeUseCase implements IValidateInviteCodeUseCase {
  async execute(code: string): Promise<ValidateInviteCodeUseCaseResult> {
    return await InviteCodeValidationService.validateCode(code);
  }
}
