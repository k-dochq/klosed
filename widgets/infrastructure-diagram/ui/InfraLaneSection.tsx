import React from 'react';
import { InfraCard } from 'shared/ui/infra-card';
import { Code2 } from 'lucide-react';
import { InfraLane } from 'entities/infrastructure';

interface InfraLaneSectionProps {
  lane: InfraLane;
}

export function InfraLaneSection({ lane }: InfraLaneSectionProps) {
  const currentServices = lane.services.filter((service) => service.status === 'current');
  const plannedServices = lane.services.filter((service) => service.status === 'planned');

  return (
    <div className='col-span-1 rounded-xl border border-slate-200 bg-slate-50 p-4'>
      <div className='mb-3 font-bold text-slate-700'>{lane.title}</div>

      {/* Current Services */}
      {currentServices.map((service) => (
        <InfraCard
          key={service.id}
          icon={service.icon}
          title={service.name}
          subtitle={service.subtitle}
          variant='current'
          className='mb-4'
        >
          {service.features && (
            <ul className='list-disc space-y-1 pl-5 text-sm text-slate-600'>
              {service.features.map((feature, index) => (
                <li key={index}>
                  {feature.includes('Prisma') ? (
                    <>
                      <span className='inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[11px]'>
                        <Code2 className='h-3.5 w-3.5' /> Prisma
                      </span>{' '}
                      → Postgres
                    </>
                  ) : (
                    feature
                  )}
                </li>
              ))}
            </ul>
          )}
        </InfraCard>
      ))}

      {/* Planned Services */}
      {plannedServices.length > 0 && (
        <div className='mt-3 grid gap-2'>
          {plannedServices.map((service) => (
            <InfraCard
              key={service.id}
              icon={service.icon}
              title={service.name}
              subtitle={service.subtitle}
              variant='planned'
              className='p-3'
            />
          ))}
        </div>
      )}
    </div>
  );
}
