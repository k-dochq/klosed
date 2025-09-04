import { prisma } from 'shared/lib/prisma';

export class InviteCodeRepository {
  static async findByCode(code: string) {
    return null;
  }

  static async updateUsage(id: number, newUsageCount: number) {
    return null;
  }
}
