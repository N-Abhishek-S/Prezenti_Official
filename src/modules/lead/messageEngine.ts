import type { Area, City, ServiceOffering, TrustPackage } from '../catalog/types';

export interface MessageContext {
  service: ServiceOffering;
  package: TrustPackage;
  city: City;
  area: Area;
}

export function generateLeadMessage({ service, package: selectedPackage, city, area }: MessageContext) {
  const propertySegment = selectedPackage.propertyType ? ` for ${selectedPackage.propertyType}` : '';

  return `I am interested in ${service.name} service${propertySegment} in ${area.name}, ${city.name} with ${selectedPackage.workType} (${selectedPackage.hours} Hours) staffing support. Please contact me.`;
}
