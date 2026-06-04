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
  {
    name: 'Hospital / Healthcare',
    description: 'Hospitals, clinics, diagnostic centers, nursing homes, and healthcare facilities.',
  },
  {
    name: 'Cafes / Restaurants',
    description: 'Front-of-house and back-of-house housekeeping support for cafes, restaurants, food courts, quick-service restaurants, dining spaces, kitchens, and hospitality venues.',
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
      'Hospital / Healthcare': [
        'Reception, waiting area, corridor, washroom, and non-clinical area cleaning support',
        'Routine hygiene checks for patient-facing common areas during the shift',
        'Dustbin clearing, dry/wet floor cleaning, and daily checklist reporting',
        'Basic consumable coordination for housekeeping material availability',
      ],
      'Cafes / Restaurants': [
        'Front-of-house dining area, table clearing, and floor maintenance support',
        'Back-of-house kitchen floor cleaning and utility area upkeep',
        'Washroom hygiene checks and routine cleaning during operating hours',
        'Waste segregation, disposal coordination, and daily checklist reporting',
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
      'Hospital / Healthcare': [
        'Clinical cleaning, biomedical waste handling, sterilization, or nursing duties',
        'Purchase cost of chemicals, machines, tissue, liners, or consumables',
        'Electrical, plumbing, carpentry, or technical maintenance work',
        'Patient care, medical assistance, or handling restricted clinical zones',
      ],
      'Cafes / Restaurants': [
        'Specialized commercial kitchen equipment deep cleaning or exhaust scrubbing',
        'Cost of cleaning chemicals, dishwashing liquids, uniforms, or consumables',
        'Food preparation, cooking, table service, or cashier duties',
        'Pest control, grease trap clearing, or exhaust duct maintenance',
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
      'Hospital / Healthcare': [
        'Reception-side support, visitor guidance, pantry coordination, and basic upkeep',
        'Courier, document movement, and routine admin support assistance',
        'Stationery, pantry stock, and facility team coordination support',
        'Daily assistance to admin and facility teams during shift hours',
      ],
      'Cafes / Restaurants': [
        'Table setup, dining area readiness, water serving, and basic pantry support',
        'Front-of-house host/hostess greeting support and visitor guidance',
        'Menu card organization, table reservation assistance, and queue coordination',
        'Basic inventory checks for napkins, cutlery, and front-desk supplies',
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
      'Hospital / Healthcare': [
        'Patient care, medical assistance, clinical coordination, or nursing duties',
        'Driving, cash collection, banking responsibility, or outdoor travel beyond scope',
        'IT troubleshooting, electrical work, or specialized technician duties',
        'Handling medicines, patient records, or restricted clinical material',
      ],
      'Cafes / Restaurants': [
        'Food preparation, active cooking, culinary service, or kitchen cleaning',
        'Cashiering, billing transactions, bookkeeping, or managing POS systems',
        'Outdoor delivery errands or driving tasks outside the venue',
        'Handling customer disputes, complaints, or restaurant manager decisions',
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
      'Hospital / Healthcare': [
        'Daily staff attendance tracking, shift coordination, and checklist monitoring',
        'Housekeeping, pantry, reception, and vendor coordination for facility operations',
        'Issue escalation, basic site reporting, and healthcare admin updates',
        'SLA follow-up for routine non-clinical support activities',
      ],
      'Cafes / Restaurants': [
        'Daily staff attendance tracking, shift scheduling, and grooming checks',
        'Front-of-house and back-of-house housekeeping checklist monitoring',
        'Cleaning consumable stock tracking and replenishment coordination',
        'Feedback escalation, shift handovers, and daily cleaning report logging',
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
      'Hospital / Healthcare': [
        'Clinical supervision, patient care, nursing, or medical responsibility',
        'Procurement approvals, vendor contracting, or budget ownership',
        'Statutory compliance sign-off or legal responsibility on behalf of the client',
        'Security command or restricted clinical-area responsibility unless separately scoped',
      ],
      'Cafes / Restaurants': [
        'Direct kitchen management, food safety certification, or recipe compliance',
        'Cash register audits, restaurant accounting, or financial ledger ownership',
        'Vendor contracting, procurement approvals, or budget decisions',
        'Security command or conflict handling with dining guests',
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
      'Hospital / Healthcare': [
        'Front desk handling, visitor greeting, call routing, and appointment support',
        'Visitor register, courier register, and waiting-area coordination',
        'Professional reception presence during selected shift hours',
        'Basic admin coordination with reception, admin, and facility teams',
      ],
      'Cafes / Restaurants': [
        'Guest greeting, queue management, table reservations, and seating guidance',
        'Phone call handling, reservation log maintenance, and customer inquiry routing',
        'Professional host presence at the entrance during peak hours',
        'Basic coordination with floor managers and service staff for guest flow',
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
      'Hospital / Healthcare': [
        'Medical advice, patient care, billing ownership, or clinical coordination',
        'Executive assistant duties, travel desk ownership, or confidential scheduling',
        'Security frisking, access-control enforcement, or baggage checking',
        'Night-shift reception unless separately agreed',
      ],
      'Cafes / Restaurants': [
        'Table service, food and beverage delivery, or table clearing',
        'Billing, payment processing, or handling cash registers',
        'Valet parking, guest baggage checking, or physical security screening',
        'Managing restaurant booking systems configuration or marketing promotions',
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
