/**
 * Canonical top-level service list — name + route — matching the slugs
 * registered in `src/data/servicesContent.ts` / `serviceRoutes.ts`. Single
 * source of truth so the footer, pricing page, and location details modal
 * don't each keep their own copy.
 */
export interface ServiceCatalogEntry {
  name: string;
  href: string;
}

export const serviceCatalog: ServiceCatalogEntry[] = [
  { name: 'Housekeeping', href: '/housekeeping-services' },
  { name: 'Security', href: '/security-services' },
  { name: 'Receptionist', href: '/receptionist-staffing-services' },
  { name: 'Office Boy / Office Support', href: '/office-boy-services' },
  { name: 'Pantry Staff', href: '/pantry-staff-services' },
  { name: 'Facility Management', href: '/facility-management-services' },
  { name: 'Property Management', href: '/property-management-services' },
];
