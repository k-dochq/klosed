import { PrismaClient, ProductType } from '@prisma/client';

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

  // Domain seeds
  const profile = await prisma.profile.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      displayName: 'Hi-So Guest',
      grade: 'BASIC',
      language: 'th',
      currency: 'THB',
      interests: { beauty: ['skin', 'eye'], travel: ['shopping', 'fine-dining'] },
    },
  });

  // Invite code + initial credit grant
  const invite = await prisma.inviteCode.upsert({
    where: { code: 'INVITE-ABCD1234' },
    update: {},
    create: {
      code: 'INVITE-ABCD1234',
      creditCents: 10000,
      ownedByProfileId: profile.id,
    },
  });
  await prisma.creditLedger.create({
    data: {
      profileId: profile.id,
      inviteCodeId: invite.id,
      amountCents: 10000, // grant
      reason: 'Invite credit grant',
    },
  });

  // Products: a package + two items
  const itemClinic = await prisma.product.create({
    data: {
      type: ProductType.ITEM,
      title: 'Dermatology Consultation',
      description: 'Skin consultation at premium clinic',
      basePriceCents: 120000,
      currency: 'THB',
      durationMinutes: 60,
      locationName: 'Gangnam, Seoul',
    },
  });
  const itemTour = await prisma.product.create({
    data: {
      type: ProductType.ITEM,
      title: 'Seoul City Tour',
      description: 'Half-day private tour',
      basePriceCents: 200000,
      currency: 'THB',
      durationMinutes: 240,
      locationName: 'Seoul',
    },
  });
  const pkg = await prisma.product.create({
    data: {
      type: ProductType.PACKAGE,
      title: 'Beauty + Travel Package (2D1N)',
      description: 'Clinic + City tour curated package',
      basePriceCents: 290000,
      currency: 'THB',
      durationMinutes: 300,
      items: {
        create: [
          { itemId: itemClinic.id, sortOrder: 1 },
          { itemId: itemTour.id, sortOrder: 2 },
        ],
      },
    },
  });

  // Itinerary and items (auto-scheduled mock)
  const iti = await prisma.itinerary.create({
    data: {
      profileId: profile.id,
      title: '2D1N Seoul Beauty Trip',
      items: {
        create: [
          {
            productId: itemClinic.id,
            dayIndex: 1,
            sortOrder: 1,
          },
          {
            productId: itemTour.id,
            dayIndex: 2,
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Booking with initial payment placeholder
  const booking = await prisma.booking.create({
    data: {
      profileId: profile.id,
      itineraryId: iti.id,
      totalAmountCents: 290000,
      currency: 'THB',
      payments: {
        create: [
          {
            amountCents: 50000,
            currency: 'THB',
            provider: 'card',
            status: 'AUTHORIZED',
          },
        ],
      },
    },
  });

  // consume part of credit & mark invite used
  await prisma.creditLedger.create({
    data: {
      profileId: profile.id,
      bookingId: booking.id,
      amountCents: -5000,
      reason: 'Apply invite credit to booking',
    },
  });
  await prisma.inviteCode.update({ where: { id: invite.id }, data: { usedAt: new Date() } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
