import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.post.count();
  if (count === 0) {
    await prisma.post.createMany({
      data: [
        { title: 'Welcome to K-DOC', content: 'First post', published: true },
        { title: 'Hello Supabase', content: 'Prisma + Supabase', published: false },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
