// Re-export validator for backward compatibility
export { InviteCodeValidator, type InviteCodeInput, type ValidationResult } from './validators';

// For backward compatibility - delegate to new validator
import { InviteCodeValidator } from './validators';

/**
 * @deprecated Use InviteCodeValidator.validate() instead
 * Backward compatibility function
 */
export function validateInviteCodeInput(input: unknown) {
  const result = InviteCodeValidator.validate(input);
  return {
    success: result.success,
    data: result.data,
    error: result.error,
  };
}
