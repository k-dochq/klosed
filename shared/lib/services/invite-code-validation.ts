import { prisma } from 'shared/lib/prisma';
import { INVITE_CODE_ERROR_CODES } from 'shared/config/error-codes';
import type { InviteCodeData, InviteCodeValidationResult } from 'shared/model/types/invite-code';

export class InviteCodeValidationService {
  static async validateCode(code: string): Promise<InviteCodeValidationResult> {
    try {
      // 데이터베이스에서 초대 코드 조회
      const inviteCode = await prisma.inviteCode.findUnique({
        where: { code: code.trim() },
      });

      // 초대 코드가 존재하지 않는 경우
      if (!inviteCode) {
        return {
          isValid: false,
          errorCode: INVITE_CODE_ERROR_CODES.INVALID_CODE,
        };
      }

      // 초대 코드가 비활성화된 경우
      if (!inviteCode.isActive) {
        return {
          isValid: false,
          errorCode: INVITE_CODE_ERROR_CODES.INACTIVE_CODE,
        };
      }

      // 만료일 체크
      if (inviteCode.expiresAt && inviteCode.expiresAt < new Date()) {
        return {
          isValid: false,
          errorCode: INVITE_CODE_ERROR_CODES.EXPIRED_CODE,
        };
      }

      // 사용 횟수 체크
      if (inviteCode.currentUses >= inviteCode.maxUses) {
        return {
          isValid: false,
          errorCode: INVITE_CODE_ERROR_CODES.MAX_USES_EXCEEDED,
        };
      }

      // 검증 성공
      const inviteCodeData: InviteCodeData = {
        id: inviteCode.id,
        code: inviteCode.code,
        maxUses: inviteCode.maxUses,
        currentUses: inviteCode.currentUses,
        isActive: inviteCode.isActive,
        expiresAt: inviteCode.expiresAt?.toISOString(),
      };

      return {
        isValid: true,
        inviteCode: inviteCodeData,
      };
    } catch (error) {
      console.error('Invite code validation error:', error);
      return {
        isValid: false,
        errorCode: INVITE_CODE_ERROR_CODES.SERVER_ERROR,
      };
    }
  }
}
