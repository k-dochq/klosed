import { type KlosedPicksData } from './types';

export const klosedPicksData: KlosedPicksData = {
  title: 'Klosed Picks',
  categories: [
    {
      category: 'Beauty Clinic',
      items: [
        {
          id: 1,
          title: 'V-line lifting',
          image:
            'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&h=300&fit=crop&crop=face',
        },
        {
          id: 2,
          title: 'Botox Treatment',
          image:
            'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
        },
        {
          id: 3,
          title: 'Skin Care',
          image:
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&crop=center',
        },
      ],
    },
    {
      category: 'Premium Stay',
      items: [
        {
          id: 4,
          title: 'Luxury Hotel',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center',
        },
        {
          id: 5,
          title: 'Resort Package',
          image:
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop&crop=center',
        },
      ],
    },
    {
      category: 'Luxury Hospitality',
      items: [
        {
          id: 6,
          title: 'Fine Dining',
          image:
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center',
        },
        {
          id: 7,
          title: 'Spa Experience',
          image:
            'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop&crop=center',
        },
      ],
    },
  ],
};

// 딕셔너리에서 오는 데이터의 타입 정의
interface DictionaryKlosedPickItem {
  id: number;
  title: string;
  image: string;
}

interface DictionaryKlosedPickCategory {
  category: string;
  items: DictionaryKlosedPickItem[];
}

interface DictionaryKlosedPicksData {
  title: string;
  categories: DictionaryKlosedPickCategory[];
}

// 다국어 딕셔너리에서 KlosedPicks 데이터를 생성하는 함수
export function createLocalizedKlosedPicks(
  klosedPicksData: DictionaryKlosedPicksData,
): KlosedPicksData {
  return {
    title: klosedPicksData.title,
    categories: klosedPicksData.categories.map((category) => ({
      category: category.category,
      items: category.items.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      })),
    })),
  };
}
