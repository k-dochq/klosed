import { prisma } from '@/shared/lib/prisma';

function formatCurrency(amountCents?: number | null, currency?: string | null) {
  if (amountCents == null) return '-';
  const cur = currency || 'THB';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(
    amountCents / 100,
  );
}

export default async function Home() {
  // Curated packages (PACKAGE + its items)
  const packages = await prisma.product.findMany({
    where: { type: 'PACKAGE' },
    include: {
      items: {
        include: { item: { select: { title: true, basePriceCents: true, currency: true } } },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { id: 'desc' },
    take: 5,
  });

  // Latest itinerary with items + profile
  const latestItinerary = await prisma.itinerary.findFirst({
    orderBy: { id: 'desc' },
    include: {
      items: {
        include: {
          product: { select: { title: true, type: true, basePriceCents: true, currency: true } },
        },
        orderBy: [{ dayIndex: 'asc' }, { sortOrder: 'asc' }],
      },
      profile: { select: { displayName: true } },
    },
  });

  // Latest booking with payments
  const latestBooking = await prisma.booking.findFirst({
    orderBy: { id: 'desc' },
    include: { payments: true, itinerary: { select: { title: true } } },
  });

  // Seeded profile credit balance (demo)
  const PROFILE_ID = '00000000-0000-0000-0000-000000000001';
  const creditAgg = await prisma.creditLedger.aggregate({
    where: { profileId: PROFILE_ID },
    _sum: { amountCents: true },
  });
  const creditBalance = creditAgg._sum.amountCents ?? 0;

  return (
    <div className='min-h-screen p-8 sm:p-16'>
      <div className='mx-auto w-full max-w-3xl space-y-12'>
        <header className='space-y-2'>
          <h1 className='text-2xl font-bold'>Klosed Project</h1>
          <p className='text-sm opacity-70'>
            미용·셀프케어·한국여행 큐레이션과 일정 추천, 예약까지 한 번에
          </p>
        </header>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Curated Packages</h2>
          {packages.length === 0 ? (
            <p className='text-sm opacity-70'>준비 중입니다.</p>
          ) : (
            <ul className='space-y-4'>
              {packages.map((pkg) => (
                <li key={pkg.id} className='text-sm'>
                  <div className='font-medium'>{pkg.title}</div>
                  {pkg.items.length > 0 && (
                    <ul className='list-disc pl-5 mt-1 space-y-0.5'>
                      {pkg.items.map((pi) => (
                        <li key={pi.id}>
                          {pi.item.title}
                          {pi.item.basePriceCents != null && (
                            <span className='opacity-70'>
                              {' '}
                              — {formatCurrency(pi.item.basePriceCents, pi.item.currency)}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Latest Itinerary</h2>
          {!latestItinerary ? (
            <p className='text-sm opacity-70'>아직 생성된 일정이 없습니다.</p>
          ) : (
            <div className='text-sm'>
              <div className='font-medium'>{latestItinerary.title}</div>
              <div className='opacity-70 mb-1'>
                Guest: {latestItinerary.profile?.displayName ?? '-'}
              </div>
              {latestItinerary.items.length === 0 ? (
                <p className='opacity-70'>No itinerary items.</p>
              ) : (
                <ul className='list-disc pl-5 space-y-0.5'>
                  {latestItinerary.items.map((it) => (
                    <li key={it.id}>
                      Day {it.dayIndex ?? '-'}: {it.product.title}
                      {it.product.basePriceCents != null && (
                        <span className='opacity-70'>
                          {' '}
                          — {formatCurrency(it.product.basePriceCents, it.product.currency)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Booking & Credits</h2>
          {!latestBooking ? (
            <p className='text-sm opacity-70'>최근 예약이 없습니다.</p>
          ) : (
            <div className='text-sm space-y-1'>
              <div>
                <span className='font-medium'>Itinerary:</span>{' '}
                {latestBooking.itinerary?.title ?? '-'}
              </div>
              <div>
                <span className='font-medium'>Total:</span>{' '}
                {formatCurrency(latestBooking.totalAmountCents, latestBooking.currency)}
              </div>
              <div>
                <span className='font-medium'>Payments:</span>{' '}
                {latestBooking.payments.length === 0
                  ? 'None'
                  : latestBooking.payments
                      .map(
                        (p) =>
                          `${formatCurrency(p.amountCents, p.currency)} (${p.status.toLowerCase()})`,
                      )
                      .join(', ')}
              </div>
              <div>
                <span className='font-medium'>Credit Balance:</span>{' '}
                {formatCurrency(creditBalance, 'THB')}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
