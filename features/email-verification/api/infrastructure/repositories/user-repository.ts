import { IUserRepository } from '../../entities/types';

/**
 * 사용자 데이터 액세스 계층 구현체
 * TODO: 실제로는 Prisma를 사용하여 데이터베이스와 연동
 */
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<{ id: string; email: string } | null> {
    // TODO: Prisma를 사용하여 실제 데이터베이스에서 사용자 조회
    // 현재는 임시 구현
    console.log('Finding user by email:', email);

    // 임시: 이메일이 존재한다고 가정하고 null 반환
    // 실제 구현 시에는 데이터베이스에서 조회한 결과를 반환
    return null;
  }

  async createUser(email: string): Promise<{ id: string; email: string }> {
    // TODO: Prisma를 사용하여 실제 데이터베이스에 사용자 생성
    // 현재는 임시 구현
    console.log('Creating user with email:', email);

    // 임시: 새로운 사용자 객체 반환
    // 실제 구현 시에는 데이터베이스에 저장한 후 결과를 반환
    return {
      id: `user_${Date.now()}`, // 임시 ID 생성
      email,
    };
  }

  async updateUserVerificationStatus(userId: string, isVerified: boolean): Promise<void> {
    // TODO: Prisma를 사용하여 실제 데이터베이스에서 사용자 검증 상태 업데이트
    // 현재는 임시 구현
    console.log('Updating user verification status:', { userId, isVerified });

    // 실제 구현 시에는 데이터베이스의 사용자 레코드를 업데이트
  }
}
