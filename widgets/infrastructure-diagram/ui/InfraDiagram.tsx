import React from 'react';
import { ConnectorLine } from 'shared/ui/connector-line';
import { InfraLaneSection } from './InfraLaneSection';
import { AliasSection } from './AliasSection';
import { DiagramLegend } from './DiagramLegend';
import { infraLanes, aliasLinks } from 'entities/infrastructure';

export function InfraDiagram() {
  return (
    <>
      <DiagramLegend />

      {/* Main Diagram */}
      <section className='relative mx-auto max-w-[1200px]'>
        <div className='grid grid-cols-[1fr_64px_1.2fr_64px_1fr] gap-4'>
          {/* Client Lane */}
          <InfraLaneSection lane={infraLanes[0]} />

          {/* Connector between Client and Vercel */}
          <ConnectorLine topOffset={84} />

          {/* Vercel Lane */}
          <InfraLaneSection lane={infraLanes[1]} />

          {/* Connector between Vercel and Supabase */}
          <ConnectorLine topOffset={324} />

          {/* Supabase Lane */}
          <InfraLaneSection lane={infraLanes[2]} />
        </div>

        {/* Aliases */}
        <AliasSection links={aliasLinks} />
      </section>
    </>
  );
}
