import { EssentialsItem, EssentialsGrid } from 'entities/essentials';
import { EssentialsTitle } from './EssentialsTitle';
import type { Dictionary } from 'shared/model/types';

interface EssentialsProps {
  dict: Dictionary;
}

export function Essentials({ dict }: EssentialsProps) {
  return (
    <div className='mx-auto max-w-2xl px-4 py-6'>
      <EssentialsTitle dict={dict} />
      <EssentialsGrid>
        {dict.essentials.items.map((item) => (
          <EssentialsItem key={item.id} name={item.name} description={item.description} />
        ))}
      </EssentialsGrid>
    </div>
  );
}
