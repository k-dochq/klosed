import { prisma } from 'shared/lib/prisma';

/**
 * 사용자 데이터 액세스 계층
 */
export interface IUserRepository {
  /**
   * 이메일로 사용자 조회
   */
  findByEmail(email: string): Promise<{
    id: string;
    email: string | null;
    raw_user_meta_data: any;
  } | null>;

  /**
   * 사용자 존재 여부 확인
   */
  existsByEmail(email: string): Promise<boolean>;
}

/**
 * Prisma를 사용한 사용자 리포지토리 구현체
 */
export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        raw_user_meta_data: true,
      },
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
