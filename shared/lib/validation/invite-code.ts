import { z } from 'zod';

export const inviteCodeSchema = z.object({
  code: z
    .string()
    .min(1, '초대 코드가 필요합니다.')
    .trim()
    .max(50, '초대 코드는 50자를 초과할 수 없습니다.'),
});

export type InviteCodeInput = z.infer<typeof inviteCodeSchema>;
