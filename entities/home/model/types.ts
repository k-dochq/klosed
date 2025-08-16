/**
 * 홈페이지 관련 도메인 타입들
 */

export interface PackageItem {
  title: string;
  basePriceCents: number | null;
  currency: string | null;
}

export interface Package {
  id: string;
  title: string;
  items: {
    id: string;
    item: PackageItem;
  }[];
}

export interface ItineraryItem {
  id: string;
  dayIndex: number | null;
  product: {
    title: string;
    type: string;
    basePriceCents: number | null;
    currency: string | null;
  };
}

export interface Itinerary {
  id: string;
  title: string;
  profile: {
    displayName: string | null;
  } | null;
  items: ItineraryItem[];
}

export interface Payment {
  id: string;
  amountCents: number | null;
  currency: string | null;
  status: string;
}

export interface Booking {
  id: string;
  totalAmountCents: number | null;
  currency: string | null;
  itinerary: {
    title: string;
  } | null;
  payments: Payment[];
}

export interface HomeData {
  packages: Package[];
  latestItinerary: Itinerary | null;
  latestBooking: Booking | null;
  creditBalance: number;
}
