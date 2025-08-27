import { prisma } from 'shared/lib/prisma';

export class InviteCodeRepository {
  static async findByCode(code: string) {
    return await prisma.inviteCode.findUnique({
      where: { code: code.trim() },
    });
  }

  static async updateUsage(id: number, newUsageCount: number) {
    return await prisma.inviteCode.update({
      where: { id },
      data: { currentUses: newUsageCount },
    });
  }
}
