import { prisma } from 'shared/lib/prisma';
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
          message: '유효하지 않은 초대 코드입니다.',
        };
      }

      // 초대 코드가 비활성화된 경우
      if (!inviteCode.isActive) {
        return {
          isValid: false,
          message: '사용할 수 없는 초대 코드입니다.',
        };
      }

      // 만료일 체크
      if (inviteCode.expiresAt && inviteCode.expiresAt < new Date()) {
        return {
          isValid: false,
          message: '만료된 초대 코드입니다.',
        };
      }

      // 사용 횟수 체크
      if (inviteCode.currentUses >= inviteCode.maxUses) {
        return {
          isValid: false,
          message: '이미 사용된 초대 코드입니다.',
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
        message: '초대 코드가 유효합니다.',
        inviteCode: inviteCodeData,
      };
    } catch (error) {
      console.error('Invite code validation error:', error);
      return {
        isValid: false,
        message: '서버 오류가 발생했습니다.',
      };
    }
  }
}
