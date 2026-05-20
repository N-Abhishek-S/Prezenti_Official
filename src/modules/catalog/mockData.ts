import type { Area, BrandingSettings, City, ContactDetails, LeadRecord, ServiceOffering, TrustPackage } from './types';

export const initialServices: ServiceOffering[] = [
  {
    id: 'svc-reception-admin',
    name: 'Reception - Admin',
    slug: 'reception-admin',
    description: 'Professional reception and admin assistance for visitor handling, calls, records, and front-office coordination.',
    type: 'direct',
    iconKey: 'reception',
    isActive: true,
    displayOrder: 1,
    propertyTypes: [],
  },
  {
    id: 'svc-facility-manager',
    name: 'Facility Manager - Supervision',
    slug: 'facility-manager-supervision',
    description: 'On-site supervision for facility teams, attendance, escalations, vendor coordination, and daily operations.',
    type: 'property',
    iconKey: 'facility',
    isActive: true,
    displayOrder: 2,
    propertyTypes: ['Residential Building', 'Commercial Building'],
  },
  {
    id: 'svc-office-assistant',
    name: 'Office Assistant - Office Boy',
    slug: 'office-assistant-office-boy',
    description: 'Reliable office support for admin errands, pantry coordination, courier handling, and daily office assistance.',
    type: 'direct',
    iconKey: 'office',
    isActive: true,
    displayOrder: 3,
    propertyTypes: [],
  },
  {
    id: 'svc-house-keeping',
    name: 'House Keeping',
    slug: 'house-keeping',
    description: 'Trained housekeeping staff for daily cleaning routines, checklists, hygiene support, and site upkeep.',
    type: 'property',
    iconKey: 'housekeeping',
    isActive: true,
    displayOrder: 4,
    propertyTypes: ['Residential Building', 'Commercial Building'],
  },
];

const included: string[] = [];

const excluded: string[] = [];

function buildPackages(service: ServiceOffering): TrustPackage[] {
  const propertyVariants = service.type === 'property' ? service.propertyTypes : [undefined];

  return propertyVariants.flatMap((propertyType, propertyIndex) => [
    {
      id: `pkg-${service.slug}-${propertyType ? propertyType.toLowerCase().replace(/\s+/g, '-') : 'standard'}-full-time`,
      serviceId: service.id,
      propertyType,
      workType: 'Full Time',
      hours: 8,
      description: 'Dedicated daily support for consistent facility operations and reliable coverage.',
      includedServices: included,
      excludedServices: excluded,
      pricingPlaceholder: 'Custom quote after site assessment',
      isActive: true,
      displayOrder: propertyIndex * 2 + 1,
    },
    {
      id: `pkg-${service.slug}-${propertyType ? propertyType.toLowerCase().replace(/\s+/g, '-') : 'standard'}-half-time`,
      serviceId: service.id,
      propertyType,
      workType: 'Half Time',
      hours: 4,
      description: 'Focused daily support for selected duties, lean operations, and smaller coverage windows.',
      includedServices: included,
      excludedServices: excluded,
      pricingPlaceholder: 'Custom quote after site assessment',
      isActive: true,
      displayOrder: propertyIndex * 2 + 2,
    },
  ]);
}

export const initialPackages: TrustPackage[] = initialServices.flatMap(buildPackages);

export const initialCities: City[] = [
  {
    id: 'city-pune',
    name: 'Pune',
    slug: 'pune',
    isActive: true,
    displayOrder: 1,
  },
];

export const initialAreas: Area[] = [
  'Baner',
  'Hinjewadi',
  'Wakad',
  'Balewadi',
  'Aundh',
  'Pimple Saudagar',
  'Pimple Gurav',
  'Kharadi',
  'Viman Nagar',
  'Hadapsar',
  'Magarpatta',
  'Koregaon Park',
  'Kalyani Nagar',
  'Kothrud',
  'Bavdhan',
  'Shivaji Nagar',
  'Camp',
  'Yerwada',
  'Kondhwa',
  'NIBM',
  'Undri',
  'Bibwewadi',
  'Sinhagad Road',
  'Katraj',
  'Pimpri',
  'Chinchwad',
  'Bhosari',
  'Ravet',
  'Tathawade',
  'Sus',
  'Mahalunge',
  'Mundhwa',
  'Manjari',
  'Lohegaon',
  'Dhanori',
].map((name, index) => ({
  id: `area-${name.toLowerCase().replace(/\s+/g, '-')}`,
  cityId: 'city-pune',
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  isActive: true,
  displayOrder: index + 1,
}));

export const initialContactDetails: ContactDetails = {
  id: 'contact-primary',
  phones: ['8788726752', '9226290310'],
  emails: ['bd@kargar.co.in', 'rushita@kargar.co.in'],
  officeAddress: '301-302, Unity Commercial, Near Amar Business Zone, Baner, Pune, Maharashtra - 411045',
  ctaText: 'Get staffing quote',
  supportText: 'Pune staffing support',
};

export const initialBranding: BrandingSettings = {
  id: 'brand-primary',
  logoPath: '/brand/prezenti-logo.png',
  faviconPath: '/favicon.svg',
  heroPrimaryVideoPath: '/hero/video/prezenti-namaste-reception.webm',
  heroSupportingVideoPath: '/hero/video/prezenti-workforce-vertical.webm',
};

export const initialLeads: LeadRecord[] = [
  {
    id: 'lead-demo-1',
    fullName: 'Sample Operations Manager',
    phone: '8788726752',
    email: 'bd@kargar.co.in',
    serviceId: 'svc-house-keeping',
    serviceName: 'House Keeping',
    propertyType: 'Commercial Building',
    workType: 'Full Time',
    hours: 8,
    city: 'Pune',
    area: 'Baner',
    autoMessage:
      'I am interested in House Keeping service for Commercial Building in Baner, Pune with Full Time (8 Hours) staffing support. Please contact me.',
    status: 'new',
    createdAt: new Date().toISOString(),
  },
];
