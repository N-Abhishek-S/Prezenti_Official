import { BadgeCheck, BriefcaseBusiness, Sparkles, UserRoundCheck, type LucideIcon } from 'lucide-react';

export const serviceOptions = [
  'Housekeeping',
  'Office Assistant',
  'Facility Supervisor',
  'Receptionist',
] as const;

export const timePreferenceOptions = [
  'Full Time (8 Hours)',
  'Half Time (4 Hours)',
] as const;

export const serviceSubcategoryOptions = [
  'Offices / Corporate',
  'Commercial Buildings',
  'Residential Buildings',
] as const;

export const inquiryTypeOptions = [
  'General Inquiry',
  'Request Callback',
  'Service Information',
  'Pricing Information',
  'Custom Requirement',
] as const;

export type ExpertServiceName = (typeof serviceOptions)[number];
export type TimePreference = (typeof timePreferenceOptions)[number];
export type ServiceSubcategory = (typeof serviceSubcategoryOptions)[number];
export type InquiryType = (typeof inquiryTypeOptions)[number];

export interface ServiceSubcategoryDetails {
  included: string[];
  notIncluded: string[];
}

export type ServiceDetailsBySubcategory = Record<ServiceSubcategory, ServiceSubcategoryDetails>;

export interface ServiceSubcategoryPlannerDetails {
  siteProfile: string;
  sampleSites: string[];
  operatingFocus: string[];
}

export interface SlotPlannerDetails {
  label: string;
  hours: string;
  availability: string;
  bestFor: string;
  shiftWindow: string;
  handover: string;
  checkpoints: string[];
}

export interface ExpertServiceConfig {
  id: string;
  name: ExpertServiceName;
  description: string;
  icon: LucideIcon;
  detailsBySubcategory: ServiceDetailsBySubcategory;
}

export const serviceSubcategoryPlannerDetails: Record<ServiceSubcategory, ServiceSubcategoryPlannerDetails> = {
  'Offices / Corporate': {
    siteProfile: 'Structured workplace environments with predictable footfall, employee-facing support, and admin coordination.',
    sampleSites: ['Corporate offices', 'Startups', 'Clinics', 'Consultant offices'],
    operatingFocus: ['Cabin and meeting-room readiness', 'Pantry and visitor experience', 'Admin desk coordination'],
  },
  'Commercial Buildings': {
    siteProfile: 'Multi-tenant properties with shared common areas, visitor movement, and routine facility escalation needs.',
    sampleSites: ['Commercial towers', 'Retail complexes', 'Business parks', 'Managed properties'],
    operatingFocus: ['Lobby and lift-area upkeep', 'Tenant query routing', 'Common-area issue reporting'],
  },
  'Residential Buildings': {
    siteProfile: 'Resident-facing communities where consistency, polite communication, and common-area discipline matter.',
    sampleSites: ['Housing societies', 'Gated communities', 'Apartment towers', 'Clubhouse facilities'],
    operatingFocus: ['Society office support', 'Common-area hygiene', 'Resident request coordination'],
  },
};

export const slotPlannerDetails: Record<TimePreference, SlotPlannerDetails> = {
  'Full Time (8 Hours)': {
    label: 'Full day shift',
    hours: '8 Hours',
    availability: 'Slots are available',
    bestFor: 'Daily operations that need continuous coverage, morning setup, mid-day upkeep, and end-of-day closure.',
    shiftWindow: 'Recommended 8-hour deployment window based on site opening and closing rhythm.',
    handover: 'Start-of-shift briefing plus end-of-shift handover note.',
    checkpoints: [
      'Dedicated staff coverage for the selected service scope',
      'Multiple task checkpoints across the day',
      'Better fit for high-footfall or larger sites',
      'Daily attendance and task status can be shared with the site contact',
    ],
  },
  'Half Time (4 Hours)': {
    label: 'Half day shift',
    hours: '4 Hours',
    availability: 'Slots are available',
    bestFor: 'Focused support for lean sites, limited task lists, peak-hour coverage, or morning/evening routines.',
    shiftWindow: 'Recommended 4-hour deployment window aligned to your busiest operating block.',
    handover: 'Compact task checklist with completion update at shift close.',
    checkpoints: [
      'Focused staff coverage for priority tasks',
      'Good fit for compact offices, smaller societies, or limited common areas',
      'Efficient option when full-day presence is not required',
      'Can be upgraded to full-day coverage after site assessment',
    ],
  },
};

const serviceDetails: Record<ExpertServiceName, ServiceDetailsBySubcategory> = {
  Housekeeping: {
    'Offices / Corporate': {
      included: [
        'Workstation, cabin, meeting room, and pantry cleaning support',
        'Washroom upkeep with routine hygiene checks during the shift',
        'Dustbin clearing, dry/wet floor cleaning, and daily checklist reporting',
        'Basic consumable coordination for housekeeping material availability',
      ],
      notIncluded: [
        'Deep cleaning, facade cleaning, pest control, or shampooing work',
        'Purchase cost of chemicals, machines, tissue, liners, or consumables',
        'Electrical, plumbing, carpentry, or technical maintenance work',
        'Biomedical, hazardous, or industrial waste handling',
      ],
    },
    'Commercial Buildings': {
      included: [
        'Lobby, lift area, staircase, corridor, and common washroom upkeep',
        'Tenant-floor common area cleaning as per agreed shift checklist',
        'Waste movement to the designated collection point',
        'Supervisor-ready daily attendance and task completion updates',
      ],
      notIncluded: [
        'High-rise glass, facade, basement machine scrubbing, or terrace deep cleaning',
        'Specialized machinery rental, chemicals, and consumable procurement',
        'Security, parking, fire-safety, or MEP technician duties',
        'Tenant office internal cleaning unless included in the final scope',
      ],
    },
    'Residential Buildings': {
      included: [
        'Society lobby, staircase, lift, corridor, and clubhouse routine cleaning',
        'Common washroom upkeep and visible hygiene checks during duty hours',
        'Daily sweeping, mopping, dustbin clearing, and common-area reporting',
        'Support for housekeeping coordination with society manager or committee',
      ],
      notIncluded: [
        'Individual flat cleaning, cooking, babysitting, or domestic helper duties',
        'Deep cleaning, water tank cleaning, pest control, or garden maintenance',
        'Cleaning materials, equipment, and consumables unless separately agreed',
        'Security gate duty, parking management, or technical repair work',
      ],
    },
  },
  'Office Assistant': {
    'Offices / Corporate': {
      included: [
        'Pantry coordination, water serving, meeting room readiness, and basic upkeep',
        'Courier, document movement, visitor coordination, and office errands',
        'Stationery, pantry stock, and routine admin support coordination',
        'Daily assistance to office admin, HR, and facility teams during shift hours',
      ],
      notIncluded: [
        'Accounting, payroll, legal, procurement ownership, or confidential approvals',
        'Driving, cash collection, banking responsibility, or outdoor travel beyond scope',
        'IT troubleshooting, electrical work, or specialized technician duties',
        'Personal domestic errands for employees or management',
      ],
    },
    'Commercial Buildings': {
      included: [
        'Building helpdesk support, tenant coordination, and visitor guidance',
        'Courier, notices, documents, and inward/outward register assistance',
        'Pantry or common office support for site management teams',
        'Coordination support for facility supervisor and vendor visits',
      ],
      notIncluded: [
        'Security frisking, guard replacement, or access-control enforcement',
        'Lease, billing, legal, or tenant dispute handling',
        'Technical maintenance, lift operations, fire-panel operations, or repair work',
        'Cash handling or purchasing without written approval and process',
      ],
    },
    'Residential Buildings': {
      included: [
        'Society office assistance, visitor guidance, and resident communication support',
        'Courier, notice, register, and document movement assistance',
        'Basic clubhouse or management-office coordination during duty hours',
        'Support for committee, manager, and facility team follow-ups',
      ],
      notIncluded: [
        'Personal household errands, domestic helper work, or individual flat support',
        'Accounting ownership, maintenance billing decisions, or legal communication',
        'Security guard duties, parking enforcement, or conflict handling',
        'Technical repair, water pump operation, or lift/fire-panel operation',
      ],
    },
  },
  'Facility Supervisor': {
    'Offices / Corporate': {
      included: [
        'Daily staff attendance tracking, shift coordination, and checklist monitoring',
        'Housekeeping, pantry, reception, and vendor coordination for office operations',
        'Issue escalation, basic site reporting, and facility manager updates',
        'SLA follow-up for routine workplace support activities',
      ],
      notIncluded: [
        'Licensed engineering, electrical, HVAC, fire, or lift technician work',
        'Procurement approvals, vendor contracting, or budget ownership',
        'Statutory compliance sign-off or legal responsibility on behalf of the client',
        'Security command responsibility unless separately scoped',
      ],
    },
    'Commercial Buildings': {
      included: [
        'Common-area operations supervision across lobby, lift, washroom, and corridors',
        'Vendor visit coordination, complaint follow-up, and daily site reporting',
        'Attendance checks and task allocation for deployed support staff',
        'Tenant-facing coordination for routine facility service requests',
      ],
      notIncluded: [
        'MEP plant operation, lift rescue, firefighting command, or licensed technical work',
        'Major project management, civil work supervision, or AMC ownership',
        'Collection of rent, CAM charges, penalties, or financial dues',
        'Legal notices, tenant dispute resolution, or statutory certification',
      ],
    },
    'Residential Buildings': {
      included: [
        'Society staff attendance, daily task allocation, and common-area inspections',
        'Resident complaint coordination and escalation to committee or manager',
        'Vendor visit support for housekeeping, security, gardening, and repairs',
        'Daily operations reporting for towers, amenities, and common facilities',
      ],
      notIncluded: [
        'Society accounting, billing ownership, legal notices, or committee decisions',
        'Licensed electrical, plumbing, lift, STP, fire, or pump-room operation',
        'Security command, dispute handling, or enforcement beyond escalation support',
        'Capital repair projects, material purchase approvals, or vendor contracts',
      ],
    },
  },
  Receptionist: {
    'Offices / Corporate': {
      included: [
        'Front desk handling, visitor greeting, call routing, and appointment support',
        'Visitor register, courier register, and meeting-room coordination',
        'Professional reception presence during selected shift hours',
        'Basic admin coordination with HR, admin, and facility teams',
      ],
      notIncluded: [
        'Sales calling, telemarketing, collection calling, or lead qualification targets',
        'Executive assistant duties, travel desk ownership, or confidential scheduling',
        'Security frisking, access-control enforcement, or baggage checking',
        'Night-shift reception unless separately agreed',
      ],
    },
    'Commercial Buildings': {
      included: [
        'Lobby reception support, visitor guidance, and tenant directory assistance',
        'Call routing, visitor log maintenance, and basic helpdesk coordination',
        'Courier and document handover coordination at the reception desk',
        'Escalation of visitor or tenant queries to the site team',
      ],
      notIncluded: [
        'Security guard work, physical checking, or entry denial responsibility',
        'Tenant billing, lease queries, legal notices, or dispute handling',
        'Technical complaint resolution beyond logging and escalation',
        'Concierge, valet, travel booking, or hospitality services unless scoped',
      ],
    },
    'Residential Buildings': {
      included: [
        'Society reception desk support, visitor guidance, and resident query routing',
        'Visitor/courier register coordination and basic clubhouse desk assistance',
        'Call transfer and communication support for manager or committee office',
        'Professional front-desk presence for selected shift hours',
      ],
      notIncluded: [
        'Security gate duty, guard replacement, frisking, or vehicle checking',
        'Resident dispute handling, rule enforcement, or penalty communication',
        'Household services, domestic errands, or individual flat coordination',
        'Accounting, billing, maintenance collection, or legal notice handling',
      ],
    },
  },
};

export const expertServices: ExpertServiceConfig[] = [
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    description: 'Trained housekeeping support for offices, commercial buildings, societies, and managed facilities.',
    icon: Sparkles,
    detailsBySubcategory: serviceDetails.Housekeeping,
  },
  {
    id: 'office-assistant',
    name: 'Office Assistant',
    description: 'Reliable office support for daily admin errands, pantry coordination, courier handling, and workplace assistance.',
    icon: BriefcaseBusiness,
    detailsBySubcategory: serviceDetails['Office Assistant'],
  },
  {
    id: 'facility-supervisor',
    name: 'Facility Supervisor',
    description: 'On-site supervision for staffing coordination, daily reporting, attendance checks, and site operations.',
    icon: BadgeCheck,
    detailsBySubcategory: serviceDetails['Facility Supervisor'],
  },
  {
    id: 'receptionist',
    name: 'Receptionist',
    description: 'Front-desk staffing for visitor handling, call coordination, reception records, and professional guest experience.',
    icon: UserRoundCheck,
    detailsBySubcategory: serviceDetails.Receptionist,
  },
];

export const defaultExpertService = expertServices[0];
export const defaultTimePreference: TimePreference = 'Full Time (8 Hours)';
export const defaultServiceSubcategory: ServiceSubcategory = 'Offices / Corporate';
export const defaultInquiryType: InquiryType = 'General Inquiry';
