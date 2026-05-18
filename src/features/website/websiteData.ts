import { publicAsset } from '../../lib/publicAsset';

export type StaffingMode = 'Full Time' | 'Half Time';

export type ServiceType =
  | 'Housekeeping'
  | 'Pantry'
  | 'Receptionist'
  | 'Security'
  | 'Office Boy'
  | 'Facility Manager';

export interface ServiceConfiguratorItem {
  type: ServiceType;
  title: string;
  description: string;
  responsibilities: string[];
  deliverables: string[];
  scope: string[];
  coverage: Partial<Record<StaffingMode, string[]>>;
}

export const serviceConfiguratorItems: ServiceConfiguratorItem[] = [
  {
    type: 'Housekeeping',
    title: 'Housekeeping & Facility Cleaning',
    description: 'Professional cleaning services for corporate offices, IT parks, hospitals, and industrial facilities.',
    responsibilities: [
      'Daily, weekly, and deep cleaning schedules',
      'Digital quality audit checklists',
      'Trained and background-verified staff',
      'Real-time supervisor monitoring',
      'Specialized medical & cleanroom cleaning',
    ],
    deliverables: [
      'Daily cleaning checklist',
      'Uniformed staff',
      'Verified employee',
      'Supervisor inspection',
    ],
    scope: [
      'Professional cleaning with quality audits and digital checklists.',
      'Trained facility cleaning staff with supervisor checks and replacement support.',
    ],
    coverage: {
      'Full Time': [
        '8 AM to 5 PM',
        '9 hours',
        '98% monthly availability',
        'Replacement within 24 hours',
      ],
      'Half Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
    },
  },
  {
    type: 'Pantry',
    title: 'Pantry & Cafeteria',
    description: 'Managed pantry and cafeteria services with hygiene compliance and inventory management.',
    responsibilities: [
      'Menu planning & nutrition tracking',
      'FSSAI compliance management',
      'Inventory & procurement automation',
      'Hygiene audit schedules',
      'Feedback & satisfaction tracking',
    ],
    deliverables: [
      'Managed pantry services with inventory tracking and hygiene standards.',
      'Professional pantry and hospitality staff ensuring seamless office support.',
    ],
    scope: [
      'Hospitality support at your service',
      'Office Boy / Pantry Support',
    ],
    coverage: {
      'Full Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
      'Half Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
    },
  },
  {
    type: 'Receptionist',
    title: 'Receptionist',
    description: 'Professional front desk support creating exceptional first impressions.',
    responsibilities: [
      'Front desk customer interaction',
      'Professional front desk support creating exceptional first impressions.',
    ],
    deliverables: ['Reception Teams'],
    scope: ['Front desk customer interaction'],
    coverage: {
      'Full Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
      'Half Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
    },
  },
  {
    type: 'Security',
    title: 'Security Services',
    description: 'Trained security personnel with technology-enabled monitoring and incident management.',
    responsibilities: [
      'GPS-tracked security patrols',
      'Incident reporting & escalation',
      'Access control management',
      'CCTV monitoring coordination',
      'Emergency response protocols',
    ],
    deliverables: [
      'Background verified guard',
      'Gate register management',
      'Visitor coordination',
      'Incident escalation support',
    ],
    scope: [
      'Verified security personnel for access control, gate management, and site safety.',
      'Trained security personnel with GPS tracking and incident reporting.',
    ],
    coverage: {
      'Full Time': [
        '12-hour shift',
        '12 hours',
        '98% monthly availability',
        'Replacement within 24 hours',
      ],
      'Half Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
    },
  },
  {
    type: 'Office Boy',
    title: 'Office Boy',
    description: 'Office support staff for daily admin, visitor, courier, and pantry coordination.',
    responsibilities: [
      'Daily office assistance for admin, pantry, visitor, and courier operations.',
      'Visitor and courier coordination',
      'Attendance support',
      'Basic grooming standards',
    ],
    deliverables: [
      'Trained office support staff',
      'Police verified employee',
      'Replacement support',
      'Supervisor check-ins',
    ],
    scope: [
      'Best for small offices that need reliable daily support.',
      'Includes supervisor checks and priority replacement handling.',
    ],
    coverage: {
      'Full Time': [
        '9 AM to 6 PM',
        '9 hours',
        '98% monthly availability',
        'Replacement within 24 hours',
      ],
      'Half Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
    },
  },
  {
    type: 'Facility Manager',
    title: 'Admin / Facility Manager',
    description: 'Supervisory operations management with real-time oversight and quality control.',
    responsibilities: [
      'On-site operational leadership',
      'Supervisory operations management with real-time oversight and quality control.',
    ],
    deliverables: ['Facility Supervision'],
    scope: ['Managed Operations'],
    coverage: {
      'Full Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
      'Half Time': ['Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.'],
    },
  },
];

export const serviceSummaryItems = [
  { title: 'Housekeeping', description: 'Professional cleaning with quality audits and digital checklists.' },
  { title: 'Security', description: 'Trained security personnel with GPS tracking and incident reporting.' },
  { title: 'Pantry', description: 'Managed pantry services with inventory tracking and hygiene standards.' },
  { title: 'Office Boy', description: 'Office support staff for daily admin, visitor, courier, and pantry coordination.' },
  { title: 'Receptionist', description: 'Professional front desk support creating exceptional first impressions.' },
  { title: 'Facility Manager', description: 'Supervisory operations management with real-time oversight and quality control.' },
] as const;

export const comparisonItems = [
  'From local referrals to instant staffing.',
  'From manual hiring chaos to smart deployment.',
  'Old-school recruitment. New-age staffing.',
  'From watchman references to app-based workforce access.',
  'From searching endlessly to staffing instantly.',
] as const;

export const comparisonMedia = {
  src: publicAsset('/comparison/prezenti-web-video.mp4'),
} as const;

export const impactMetrics = [
  { value: '200+', label: 'Enterprise Clients' },
  { value: '98.4%', label: 'Avg. SLA Compliance' },
  { value: '15,000+', label: 'Workforce Managed' },
  { value: '500+', label: 'Sites Operational' },
] as const;

export const quickGuideSteps = [
  {
    title: 'Discovery & Assessment',
    description: 'We audit your facility needs, compliance gaps, and service requirements.',
  },
  {
    title: 'Custom Deployment',
    description: 'Tailored workforce deployment with SLA frameworks and KPI definitions.',
  },
  {
    title: 'Platform Activation',
    description: 'Go live with dashboards, attendance tracking, and compliance monitoring.',
  },
  {
    title: 'Continuous Optimization',
    description: 'Ongoing reviews, analytics-driven improvements, and SLA refinements.',
  },
] as const;

export const appIntegration = {
  title: 'Mobile Workforce App',
  description: 'Field staff companion app with GPS check-in, task checklists, incident reporting, and proof uploads.',
} as const;

export const locationAvailability = {
  city: 'Pune',
  zone: 'Pune - Hinjewadi',
  label: 'Pune availability',
} as const;

export const contactDetails = {
  office: '91 Springboard, Sector 44\nGurugram, Haryana 122003',
  phone: '+91 124 456 7890',
  email: 'enterprise@presenti.in',
  hours: 'Mon-Fri: 9 AM - 6 PM IST',
  support: '1800-123-PRESENTI',
} as const;
