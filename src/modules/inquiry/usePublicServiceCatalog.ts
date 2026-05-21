import { useMemo } from 'react';
import { BadgeCheck, BriefcaseBusiness, Sparkles, UserRoundCheck, type LucideIcon } from 'lucide-react';
import servicesData, { getServiceDetails, type ServiceData } from '../../data/servicesData';
import type { ExpertServiceConfig } from './inquiryConfig';

const iconRegistry: Record<string, LucideIcon> = {
  reception: UserRoundCheck,
  receptionist: UserRoundCheck,
  facility: BadgeCheck,
  supervisor: BadgeCheck,
  'facility-supervisor': BadgeCheck,
  office: BriefcaseBusiness,
  'office-assistant': BriefcaseBusiness,
  housekeeping: Sparkles,
  'house-keeping': Sparkles,
};

function getIcon(iconName: string, slug: string) {
  const key = (iconName || slug).trim().toLowerCase();
  return iconRegistry[key] ?? BriefcaseBusiness;
}

function mapService(service: ServiceData): ExpertServiceConfig {
  return {
    id: service.slug || service.id,
    name: service.title,
    description: service.shortDescription || service.description,
    icon: getIcon(service.iconName, service.slug),
    detailsBySubcategory: getServiceDetails(service),
  };
}

export function usePublicServiceCatalog() {
  const services = useMemo(() => servicesData.map(mapService), []);
  const serviceNames = useMemo(() => services.map((service) => service.name), [services]);

  return {
    services,
    serviceNames,
    isLoading: false,
    error: null as string | null,
  };
}
