import { prisma } from 'shared/lib/prisma';
import { UserMetadata } from 'shared/model/types/auth';

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
    raw_user_meta_data: UserMetadata;
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
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        raw_user_meta_data: true,
      },
    });

    if (!user) {
      return null;
    }

    // JsonValue를 UserMetadata로 변환
    return {
      id: user.id,
      email: user.email,
      raw_user_meta_data: user.raw_user_meta_data as UserMetadata,
    };
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
