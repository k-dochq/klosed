import { prisma } from 'shared/lib/prisma';
import type { HomeData, Package, Itinerary, Booking } from 'entities/home';

/**
 * 홈페이지 데이터 저장소
 * Infrastructure 레이어에서 데이터 접근을 담당
 */
export class HomeRepository {
  /**
   * 홈페이지에 필요한 모든 데이터를 한 번에 조회합니다.
   */
  async findHomeData(): Promise<HomeData> {
    const PROFILE_ID = '00000000-0000-0000-0000-000000000001'; // Demo profile

    const [packages, latestItinerary, latestBooking, creditBalance] = await Promise.all([
      this.findPackages(),
      this.findLatestItinerary(),
      this.findLatestBooking(),
      this.findCreditBalance(PROFILE_ID),
    ]);

    return {
      packages,
      latestItinerary,
      latestBooking,
      creditBalance,
    };
  }

  /**
   * 큐레이션 패키지들을 조회합니다.
   * Private - 내부 구현 세부사항
   */
  private async findPackages(limit = 5): Promise<Package[]> {
    const packages = await prisma.product.findMany({
      where: { type: 'PACKAGE' },
      include: {
        items: {
          include: {
            item: {
              select: {
                title: true,
                basePriceCents: true,
                currency: true,
              },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { id: 'desc' },
      take: limit,
    });

    return packages.map((pkg) => ({
      id: pkg.id.toString(),
      title: pkg.title,
      items: pkg.items.map((item) => ({
        id: item.id.toString(),
        item: {
          title: item.item.title,
          basePriceCents: item.item.basePriceCents,
          currency: item.item.currency,
        },
      })),
    }));
  }

  /**
   * 최신 일정을 조회합니다.
   * Private - 내부 구현 세부사항
   */
  private async findLatestItinerary(): Promise<Itinerary | null> {
    const itinerary = await prisma.itinerary.findFirst({
      orderBy: { id: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: {
                title: true,
                type: true,
                basePriceCents: true,
                currency: true,
              },
            },
          },
          orderBy: [{ dayIndex: 'asc' }, { sortOrder: 'asc' }],
        },
        profile: { select: { displayName: true } },
      },
    });

    if (!itinerary) return null;

    return {
      id: itinerary.id.toString(),
      title: itinerary.title,
      profile: itinerary.profile,
      items: itinerary.items.map((item) => ({
        id: item.id.toString(),
        dayIndex: item.dayIndex,
        product: item.product,
      })),
    };
  }

  /**
   * 최신 예약을 조회합니다.
   * Private - 내부 구현 세부사항
   */
  private async findLatestBooking(): Promise<Booking | null> {
    const booking = await prisma.booking.findFirst({
      orderBy: { id: 'desc' },
      include: {
        payments: true,
        itinerary: { select: { title: true } },
      },
    });

    if (!booking) return null;

    return {
      id: booking.id.toString(),
      totalAmountCents: booking.totalAmountCents,
      currency: booking.currency,
      itinerary: booking.itinerary,
      payments: booking.payments.map((payment) => ({
        id: payment.id.toString(),
        amountCents: payment.amountCents,
        currency: payment.currency,
        status: payment.status,
      })),
    };
  }

  /**
   * 크레딧 잔액을 조회합니다.
   * Private - 내부 구현 세부사항
   */
  private async findCreditBalance(profileId: string): Promise<number> {
    const creditAgg = await prisma.creditLedger.aggregate({
      where: { profileId },
      _sum: { amountCents: true },
    });

    return creditAgg._sum.amountCents ?? 0;
  }
}
