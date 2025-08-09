import { prisma } from '@/shared/lib/prisma';

function formatCurrency(amountCents?: number | null, currency?: string | null) {
  if (amountCents == null) return '-';
  const cur = currency || 'THB';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(
    amountCents / 100,
  );
}

function sumPackagePriceCents(pkg: {
  items: { item: { basePriceCents: number | null; currency: string | null } }[];
}) {
  return pkg.items.reduce((acc, pi) => acc + (pi.item.basePriceCents ?? 0), 0);
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
    <div className='min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-900 dark:to-neutral-950 dark:text-neutral-100'>
      <div className='mx-auto w-full max-w-5xl px-6 py-10 sm:py-14 space-y-12'>
        <header className='space-y-3'>
          <div className='inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1 text-xs text-black/60 dark:text-white/70 backdrop-blur'>
            <span>Hi‑So Concierge</span>
            <span className='w-1 h-1 rounded-full bg-black/30 dark:bg-white/30' />
            <span>Beauty · Travel</span>
          </div>
          <h1 className='text-3xl sm:text-4xl font-semibold tracking-tight'>Klosed Project</h1>
          <p className='text-sm sm:text-base text-black/60 dark:text-white/60'>
            미용·셀프케어·한국여행 큐레이션과 일정 추천, 예약까지 한 번에
          </p>
        </header>

        <section className='space-y-4'>
          <h2 className='text-lg font-semibold'>Curated Packages</h2>
          {packages.length === 0 ? (
            <p className='text-sm text-black/60 dark:text-white/60'>준비 중입니다.</p>
          ) : (
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {packages.map((pkg) => (
                <li
                  key={pkg.id}
                  className='group rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 shadow-sm hover:shadow-md transition-shadow backdrop-blur'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <div className='text-sm font-medium'>{pkg.title}</div>
                      <div className='mt-1 text-xs text-black/50 dark:text-white/50 inline-flex items-center gap-2'>
                        <span className='inline-flex items-center rounded-full border border-black/10 dark:border-white/15 px-2 py-0.5'>
                          {pkg.items.length} items
                        </span>
                        <span className='inline-flex items-center rounded-full border border-black/10 dark:border-white/15 px-2 py-0.5'>
                          Total{' '}
                          {formatCurrency(
                            sumPackagePriceCents(pkg),
                            pkg.items[0]?.item.currency ?? 'THB',
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  {pkg.items.length > 0 && (
                    <ul className='mt-3 space-y-1.5'>
                      {pkg.items.map((pi) => (
                        <li key={pi.id} className='flex items-center justify-between gap-3 text-sm'>
                          <span className='truncate'>{pi.item.title}</span>
                          {pi.item.basePriceCents != null && (
                            <span className='text-black/50 dark:text-white/50'>
                              {formatCurrency(pi.item.basePriceCents, pi.item.currency)}
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

        <section className='space-y-4'>
          <h2 className='text-lg font-semibold'>Latest Itinerary</h2>
          {!latestItinerary ? (
            <p className='text-sm text-black/60 dark:text-white/60'>아직 생성된 일정이 없습니다.</p>
          ) : (
            <div className='rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 shadow-sm backdrop-blur'>
              <div className='text-sm font-medium'>{latestItinerary.title}</div>
              <div className='text-xs text-black/60 dark:text-white/60 mb-3'>
                Guest: {latestItinerary.profile?.displayName ?? '-'}
              </div>
              {latestItinerary.items.length === 0 ? (
                <p className='text-sm text-black/60 dark:text-white/60'>No itinerary items.</p>
              ) : (
                <ul className='relative pl-4 space-y-2'>
                  <span className='absolute left-1 top-1 bottom-1 w-px bg-black/10 dark:bg-white/10' />
                  {latestItinerary.items.map((it) => (
                    <li key={it.id} className='text-sm relative'>
                      <span className='absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-white/10' />
                      <span className='mr-2 inline-flex items-center rounded-full border border-black/10 dark:border-white/15 px-2 py-0.5 text-[11px]'>
                        Day {it.dayIndex ?? '-'}
                      </span>
                      <span className='font-medium'>{it.product.title}</span>
                      {it.product.basePriceCents != null && (
                        <span className='ml-2 text-black/50 dark:text-white/50'>
                          {formatCurrency(it.product.basePriceCents, it.product.currency)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        <section className='space-y-4'>
          <h2 className='text-lg font-semibold'>Booking & Credits</h2>
          {!latestBooking ? (
            <p className='text-sm text-black/60 dark:text-white/60'>최근 예약이 없습니다.</p>
          ) : (
            <div className='rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 shadow-sm backdrop-blur'>
              <div className='text-sm space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-black/60 dark:text-white/60'>Itinerary</span>
                  <span className='font-medium'>{latestBooking.itinerary?.title ?? '-'}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-black/60 dark:text-white/60'>Total</span>
                  <span className='font-medium'>
                    {formatCurrency(latestBooking.totalAmountCents, latestBooking.currency)}
                  </span>
                </div>
                <div>
                  <div className='text-black/60 dark:text-white/60 mb-1'>Payments</div>
                  <div className='flex flex-wrap gap-2'>
                    {latestBooking.payments.length === 0 ? (
                      <span className='text-sm text-black/60 dark:text-white/60'>None</span>
                    ) : (
                      latestBooking.payments.map((p) => (
                        <span
                          key={p.id}
                          className='inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-xs'
                        >
                          <span className='font-medium'>
                            {formatCurrency(p.amountCents, p.currency)}
                          </span>
                          <span className='h-1 w-1 rounded-full bg-black/30 dark:bg-white/30' />
                          <span className='uppercase tracking-wide text-black/50 dark:text-white/50'>
                            {p.status}
                          </span>
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div className='flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10'>
                  <span className='text-black/60 dark:text-white/60'>Credit Balance</span>
                  <span className='font-semibold'>{formatCurrency(creditBalance, 'THB')}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
