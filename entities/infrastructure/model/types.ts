import { LucideIcon } from 'lucide-react';

export interface InfraService {
  id: string;
  name: string;
  icon: LucideIcon;
  subtitle?: string;
  features?: string[];
  status: 'current' | 'planned';
}

export interface InfraLane {
  id: string;
  title: string;
  services: InfraService[];
}

export interface AliasLink {
  id: string;
  url: string;
  description?: string;
}
