import React from 'react';
import { Link2 } from 'lucide-react';
import { AliasLink } from 'entities/infrastructure';

interface AliasSectionProps {
  links: AliasLink[];
}

export function AliasSection({ links }: AliasSectionProps) {
  return (
    <div className='mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4'>
      <div className='mb-2 inline-flex items-center gap-2 font-bold text-slate-700'>
        <Link2 className='h-4 w-4' /> 별칭(Alias)
      </div>
      <ul className='space-y-1 text-sm text-slate-700'>
        {links.map((link) => (
          <li key={link.id} className='flex items-center gap-2'>
            <Link2 className='h-3.5 w-3.5 text-slate-500' />
            {link.url}
            {link.description && <span className='text-slate-500'>({link.description})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
