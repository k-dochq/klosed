import { Gift, Smartphone, Utensils, Tag } from 'lucide-react';
import { EssentialsItem, EssentialsGrid } from 'entities/essentials';
import { EssentialsTitle } from './EssentialsTitle';
import type { Dictionary } from 'shared/model/types';

interface EssentialsProps {
  dict: Dictionary;
}

// 아이콘 매핑
const itemIcons = {
  gifticon: Gift,
  eSim: Smartphone,
  'restaurant voucher': Utensils,
  coupon: Tag,
  // 한국어
  기프티콘: Gift,
  e심: Smartphone,
  '식당 바우처': Utensils,
  '특별 할인': Tag,
  // 태국어
  กิฟติคอน: Gift,
  eซิม: Smartphone,
  บัตรกำนัลร้านอาหาร: Utensils,
  ข้อเสนอพิเศษ: Tag,
};

export function Essentials({ dict }: EssentialsProps) {
  return (
    <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6'>
      <EssentialsTitle dict={dict} />
      <EssentialsGrid>
        {dict.essentials.items.map((item) => {
          const Icon = itemIcons[item.name as keyof typeof itemIcons] || Gift;
          return (
            <EssentialsItem
              key={item.id}
              name={item.name}
              description={item.description}
              icon={Icon}
            />
          );
        })}
      </EssentialsGrid>
    </div>
  );
}
