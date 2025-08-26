import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1000부터 2000까지의 InviteCode 생성
  const inviteCodes = [];
  for (let i = 1000; i <= 2000; i++) {
    inviteCodes.push({
      code: i.toString(),
      maxUses: 1,
      currentUses: 0,
      isActive: true,
    });
  }

  console.log(`📝 Creating ${inviteCodes.length} invite codes...`);

  // 배치로 삽입 (성능 최적화)
  const batchSize = 100;
  for (let i = 0; i < inviteCodes.length; i += batchSize) {
    const batch = inviteCodes.slice(i, i + batchSize);
    await prisma.inviteCode.createMany({
      data: batch,
      skipDuplicates: true, // 중복 코드가 있으면 스킵
    });
    console.log(
      `✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(inviteCodes.length / batchSize)}`,
    );
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
