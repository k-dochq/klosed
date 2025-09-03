import type { ValidationResult } from 'features/invitation-code/api/entities/validators';

export interface ValidateInviteCodeUseCaseResult {
  readonly isValid: boolean;
  readonly errorCode?: string;
  readonly inviteCode?: {
    id: number;
    code: string;
    maxUses: number;
    currentUses: number;
    isActive: boolean;
    expiresAt?: string;
  };
}

export interface IValidateInviteCodeUseCase {
  execute(code: string): Promise<ValidateInviteCodeUseCaseResult>;
}
