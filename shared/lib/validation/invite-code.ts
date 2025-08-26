import { z } from 'zod';
import { INVITE_CODE_ERROR_CODES } from 'shared/config/error-codes';

export const inviteCodeSchema = z.object({
  code: z
    .string()
    .min(1, INVITE_CODE_ERROR_CODES.CODE_REQUIRED)
    .trim()
    .max(50, INVITE_CODE_ERROR_CODES.CODE_TOO_LONG),
});

export type InviteCodeInput = z.infer<typeof inviteCodeSchema>;
