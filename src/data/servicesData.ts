import {
  serviceSubcategoryOptions,
  timePreferenceOptions,
  type ServiceDetailsBySubcategory,
  type ServiceSubcategory,
  type TimePreference,
} from '../modules/inquiry/inquiryConfig';

export interface ServiceCategory {
  name: ServiceSubcategory;
  description: string;
}

export interface ServiceData {
  id: string;
  title: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  iconName: string;
  slotOptions: readonly TimePreference[];
  categories: readonly ServiceCategory[];
  included: Record<ServiceSubcategory, string[]>;
  excluded: Record<ServiceSubcategory, string[]>;
}

export const serviceCategories: readonly ServiceCategory[] = [
  {
    name: 'Offices / Corporate',
    description: 'Daily workplace support for offices, startups, clinics, consultants, and corporate floors.',
  },
  {
    name: 'Commercial Buildings',
    description: 'Common-area and tenant-facing support for commercial towers, complexes, and managed sites.',
  },
  {
    name: 'Residential Buildings',
    description: 'Society and residential-property staffing for towers, gated communities, and apartments.',
  },
];

export const servicesData: readonly ServiceData[] = [
  {
    id: 'housekeeping',
    title: 'Housekeeping',
    name: 'Housekeeping',
    slug: 'housekeeping',
    description: 'Trained housekeeping support for offices, commercial buildings, societies, and managed facilities.',
    shortDescription: 'Trained housekeeping support for offices, commercial buildings, societies, and managed facilities.',
    iconName: 'housekeeping',
    slotOptions: timePreferenceOptions,
    categories: serviceCategories,
    included: {
      'Offices / Corporate': [
        'Workstation, cabin, meeting room, and pantry cleaning support',
        'Washroom upkeep with routine hygiene checks during the shift',
        'Dustbin clearing, dry/wet floor cleaning, and daily checklist reporting',
        'Basic consumable coordination for housekeeping material availability',
      ],
      'Commercial Buildings': [
        'Lobby, lift area, staircase, corridor, and common washroom upkeep',
        'Tenant-floor common area cleaning as per agreed shift checklist',
        'Waste movement to the designated collection point',
        'Supervisor-ready daily attendance and task completion updates',
      ],
      'Residential Buildings': [
        'Society lobby, staircase, lift, corridor, and clubhouse routine cleaning',
        'Common washroom upkeep and visible hygiene checks during duty hours',
        'Daily sweeping, mopping, dustbin clearing, and common-area reporting',
        'Support for housekeeping coordination with society manager or committee',
      ],
    },
    excluded: {
      'Offices / Corporate': [
        'Deep cleaning, facade cleaning, pest control, or shampooing work',
        'Purchase cost of chemicals, machines, tissue, liners, or consumables',
        'Electrical, plumbing, carpentry, or technical maintenance work',
        'Biomedical, hazardous, or industrial waste handling',
      ],
      'Commercial Buildings': [
        'High-rise glass, facade, basement machine scrubbing, or terrace deep cleaning',
        'Specialized machinery rental, chemicals, and consumable procurement',
        'Security, parking, fire-safety, or MEP technician duties',
        'Tenant office internal cleaning unless included in the final scope',
      ],
      'Residential Buildings': [
        'Individual flat cleaning, cooking, babysitting, or domestic helper duties',
        'Deep cleaning, water tank cleaning, pest control, or garden maintenance',
        'Cleaning materials, equipment, and consumables unless separately agreed',
        'Security gate duty, parking management, or technical repair work',
      ],
    },
  },
  {
    id: 'office-assistant',
    title: 'Office Assistant',
    name: 'Office Assistant',
    slug: 'office-assistant',
    description: 'Reliable office support for daily admin errands, pantry coordination, courier handling, and workplace assistance.',
    shortDescription: 'Reliable office support for daily admin errands, pantry coordination, courier handling, and workplace assistance.',
    iconName: 'office-assistant',
    slotOptions: timePreferenceOptions,
    categories: serviceCategories,
    included: {
      'Offices / Corporate': [
        'Pantry coordination, water serving, meeting room readiness, and basic upkeep',
        'Courier, document movement, visitor coordination, and office errands',
        'Stationery, pantry stock, and routine admin support coordination',
        'Daily assistance to office admin, HR, and facility teams during shift hours',
      ],
      'Commercial Buildings': [
        'Building helpdesk support, tenant coordination, and visitor guidance',
        'Courier, notices, documents, and inward/outward register assistance',
        'Pantry or common office support for site management teams',
        'Coordination support for facility supervisor and vendor visits',
      ],
      'Residential Buildings': [
        'Society office assistance, visitor guidance, and resident communication support',
        'Courier, notice, register, and document movement assistance',
        'Basic clubhouse or management-office coordination during duty hours',
        'Support for committee, manager, and facility team follow-ups',
      ],
    },
    excluded: {
      'Offices / Corporate': [
        'Accounting, payroll, legal, procurement ownership, or confidential approvals',
        'Driving, cash collection, banking responsibility, or outdoor travel beyond scope',
        'IT troubleshooting, electrical work, or specialized technician duties',
        'Personal domestic errands for employees or management',
      ],
      'Commercial Buildings': [
        'Security frisking, guard replacement, or access-control enforcement',
        'Lease, billing, legal, or tenant dispute handling',
        'Technical maintenance, lift operations, fire-panel operations, or repair work',
        'Cash handling or purchasing without written approval and process',
      ],
      'Residential Buildings': [
        'Personal household errands, domestic helper work, or individual flat support',
        'Accounting ownership, maintenance billing decisions, or legal communication',
        'Security guard duties, parking enforcement, or conflict handling',
        'Technical repair, water pump operation, or lift/fire-panel operation',
      ],
    },
  },
  {
    id: 'facility-supervisor',
    title: 'Facility Supervisor',
    name: 'Facility Supervisor',
    slug: 'facility-supervisor',
    description: 'On-site supervision for staffing coordination, daily reporting, attendance checks, and site operations.',
    shortDescription: 'On-site supervision for staffing coordination, daily reporting, attendance checks, and site operations.',
    iconName: 'facility-supervisor',
    slotOptions: timePreferenceOptions,
    categories: serviceCategories,
    included: {
      'Offices / Corporate': [
        'Daily staff attendance tracking, shift coordination, and checklist monitoring',
        'Housekeeping, pantry, reception, and vendor coordination for office operations',
        'Issue escalation, basic site reporting, and facility manager updates',
        'SLA follow-up for routine workplace support activities',
      ],
      'Commercial Buildings': [
        'Common-area operations supervision across lobby, lift, washroom, and corridors',
        'Vendor visit coordination, complaint follow-up, and daily site reporting',
        'Attendance checks and task allocation for deployed support staff',
        'Tenant-facing coordination for routine facility service requests',
      ],
      'Residential Buildings': [
        'Society staff attendance, daily task allocation, and common-area inspections',
        'Resident complaint coordination and escalation to committee or manager',
        'Vendor visit support for housekeeping, security, gardening, and repairs',
        'Daily operations reporting for towers, amenities, and common facilities',
      ],
    },
    excluded: {
      'Offices / Corporate': [
        'Licensed engineering, electrical, HVAC, fire, or lift technician work',
        'Procurement approvals, vendor contracting, or budget ownership',
        'Statutory compliance sign-off or legal responsibility on behalf of the client',
        'Security command responsibility unless separately scoped',
      ],
      'Commercial Buildings': [
        'MEP plant operation, lift rescue, firefighting command, or licensed technical work',
        'Major project management, civil work supervision, or AMC ownership',
        'Collection of rent, CAM charges, penalties, or financial dues',
        'Legal notices, tenant dispute resolution, or statutory certification',
      ],
      'Residential Buildings': [
        'Society accounting, billing ownership, legal notices, or committee decisions',
        'Licensed electrical, plumbing, lift, STP, fire, or pump-room operation',
        'Security command, dispute handling, or enforcement beyond escalation support',
        'Capital repair projects, material purchase approvals, or vendor contracts',
      ],
    },
  },
  {
    id: 'receptionist',
    title: 'Receptionist',
    name: 'Receptionist',
    slug: 'receptionist',
    description: 'Front-desk staffing for visitor handling, call coordination, reception records, and professional guest experience.',
    shortDescription: 'Front-desk staffing for visitor handling, call coordination, reception records, and professional guest experience.',
    iconName: 'receptionist',
    slotOptions: timePreferenceOptions,
    categories: serviceCategories,
    included: {
      'Offices / Corporate': [
        'Front desk handling, visitor greeting, call routing, and appointment support',
        'Visitor register, courier register, and meeting-room coordination',
        'Professional reception presence during selected shift hours',
        'Basic admin coordination with HR, admin, and facility teams',
      ],
      'Commercial Buildings': [
        'Lobby reception support, visitor guidance, and tenant directory assistance',
        'Call routing, visitor log maintenance, and basic helpdesk coordination',
        'Courier and document handover coordination at the reception desk',
        'Escalation of visitor or tenant queries to the site team',
      ],
      'Residential Buildings': [
        'Society reception desk support, visitor guidance, and resident query routing',
        'Visitor/courier register coordination and basic clubhouse desk assistance',
        'Call transfer and communication support for manager or committee office',
        'Professional front-desk presence for selected shift hours',
      ],
    },
    excluded: {
      'Offices / Corporate': [
        'Sales calling, telemarketing, collection calling, or lead qualification targets',
        'Executive assistant duties, travel desk ownership, or confidential scheduling',
        'Security frisking, access-control enforcement, or baggage checking',
        'Night-shift reception unless separately agreed',
      ],
      'Commercial Buildings': [
        'Security guard work, physical checking, or entry denial responsibility',
        'Tenant billing, lease queries, legal notices, or dispute handling',
        'Technical complaint resolution beyond logging and escalation',
        'Concierge, valet, travel booking, or hospitality services unless scoped',
      ],
      'Residential Buildings': [
        'Security gate duty, guard replacement, frisking, or vehicle checking',
        'Resident dispute handling, rule enforcement, or penalty communication',
        'Household services, domestic errands, or individual flat coordination',
        'Accounting, billing, maintenance collection, or legal notice handling',
      ],
    },
  },
] as const;

export function getServiceDetails(service: ServiceData) {
  return Object.fromEntries(
    serviceSubcategoryOptions.map((category) => [
      category,
      {
        included: [...service.included[category]],
        notIncluded: [...service.excluded[category]],
      },
    ]),
  ) as ServiceDetailsBySubcategory;
}

export default servicesData;
