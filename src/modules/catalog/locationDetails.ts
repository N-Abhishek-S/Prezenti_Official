import type { Area } from './locationData';
import { SEO_CONSTANTS } from '../../seo/constants';
import { durationPlans } from '../../content/pricing/durationPlans';

export interface LocationDetails {
  name: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  staffingOptions: string[];
}

const evidencedAreas = new Set(SEO_CONSTANTS.AREA_SERVED.map((name) => name.toLowerCase()));

/**
 * Derives display content for the Location Details modal from an Area
 * record — there is no separate "location details" dataset to keep in
 * sync. Areas already backed by evidenced coverage (SEO_CONSTANTS.AREA_SERVED)
 * get the more confident "Now serving" badge; everything else gets the
 * more conservative "staffing support for requirements in" wording so the
 * mega-menu's full area list (which is broader than our evidenced coverage)
 * doesn't overstate operational presence.
 */
export function getLocationDetails(area: Pick<Area, 'name'>): LocationDetails {
  const { name } = area;
  const isEvidenced = evidencedAreas.has(name.toLowerCase());

  return {
    name,
    title: `Housekeeping & Facility Staffing in ${name}`,
    subtitle: `${name}, Pune, Maharashtra`,
    badge: isEvidenced ? `Now serving ${name}` : `Staffing support for requirements in ${name}`,
    description: `Prezenti provides housekeeping and facility staffing support for businesses and properties in ${name}, Pune. Service requirements can be planned according to location, staffing needs, working hours and service duration.`,
    staffingOptions: durationPlans.map((plan) => plan.name),
  };
}
