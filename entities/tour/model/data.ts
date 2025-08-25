import { type Tour, type TourData } from './types';

// 기존 정적 데이터 (이미지 URL 포함)
export const tourPackages: Tour[] = [
  {
    id: 1,
    duration: '4 Days',
    title: 'K-Beauty Classic',
    tags: ['V-line Lifting', 'Seoul night tour', 'Skin Care'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    duration: '3 Days',
    title: 'Premium Skincare',
    tags: ['Facial Treatment', 'Shopping Tour', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    duration: '5 Days',
    title: 'Medical Tourism',
    tags: ['Consultation', 'Recovery Care', 'Professional'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
  },
];

// 다국어 tour 데이터를 Tour[] 형태로 변환하는 함수
export function createLocalizedTours(tourData: TourData): Tour[] {
  return tourData.packages.map((pkg, index) => ({
    ...pkg,
    image:
      tourPackages[index]?.image ||
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  }));
}
