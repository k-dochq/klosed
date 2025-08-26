import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    // 입력 검증
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: '초대 코드가 필요합니다.' },
        { status: 400 },
      );
    }

    // 데이터베이스에서 초대 코드 조회
    const inviteCode = await prisma.inviteCode.findUnique({
      where: { code: code.trim() },
    });

    // 초대 코드가 존재하지 않는 경우
    if (!inviteCode) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 초대 코드입니다.' },
        { status: 404 },
      );
    }

    // 초대 코드가 비활성화된 경우
    if (!inviteCode.isActive) {
      return NextResponse.json(
        { success: false, message: '사용할 수 없는 초대 코드입니다.' },
        { status: 400 },
      );
    }

    // 만료일 체크
    if (inviteCode.expiresAt && inviteCode.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, message: '만료된 초대 코드입니다.' },
        { status: 400 },
      );
    }

    // 사용 횟수 체크
    if (inviteCode.currentUses >= inviteCode.maxUses) {
      return NextResponse.json(
        { success: false, message: '이미 사용된 초대 코드입니다.' },
        { status: 400 },
      );
    }

    // 검증 성공 응답
    return NextResponse.json({
      success: true,
      message: '초대 코드가 유효합니다.',
      inviteCode: {
        id: inviteCode.id,
        code: inviteCode.code,
        maxUses: inviteCode.maxUses,
        currentUses: inviteCode.currentUses,
        isActive: inviteCode.isActive,
        expiresAt: inviteCode.expiresAt?.toISOString(),
      },
    });
  } catch (error) {
    console.error('Invite code validation error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
