import type { LucideIcon } from 'lucide-react';
import { BriefcaseBusiness, Building2,  Sparkles, UserCheck } from 'lucide-react';

export type StaffingCategoryKey =
  | 'officeSupport'
  | 'housekeeping'
  | 'frontDesk'
  | 'facilityManagement';

export interface StaffingPricingPlan {
  id: string;
  categoryBadge: string;
  roleName: string;
  shiftTiming: string;
  monthlyPrice: number;
  availability: string;
  replacement: string;
  workingHours: string;
  features: string[];
  useCase: string;
  highlighted?: boolean;
}

export interface StaffingPricingCategory {
  id: StaffingCategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  plans: StaffingPricingPlan[];
}
export const staffingPricingData: Record<StaffingCategoryKey, StaffingPricingCategory> = {
  officeSupport: {
    id: 'officeSupport',
    label: 'Office Support',
    shortLabel: 'Office',
    description: 'Daily office operational support',
    icon: BriefcaseBusiness,
    plans: [
      {
        id: 'office-boy-basic',
        categoryBadge: 'Office Support',
        roleName: 'Office Boy Basic',
        shiftTiming: '9 AM - 6 PM',
        monthlyPrice: 12000,
        workingHours: '9 working hours',
        availability: '95% availability',
        replacement: '48 hour replacement',
        features: [
          'Police verified staff',
          'Background checked employees',
          'Attendance support',
          'Basic grooming standards',
          'Support coordination',
        ],
        useCase: 'Best for startups, clinics, offices, and small commercial operations.',
      },
      {
        id: 'office-boy-premium',
        categoryBadge: 'Office Support',
        roleName: 'Office Boy Premium',
        shiftTiming: '8 AM - 6 PM',
        monthlyPrice: 15500,
        workingHours: '10 working hours',
        availability: '98% availability',
        replacement: '24 hour replacement',
        highlighted: true,
        features: [
          'Trained and groomed professional',
          'Uniformed staff',
          'Supervisor monitoring',
          'Visitor and courier coordination',
          'Backup replacement support',
        ],
        useCase: 'Designed for growing offices that need dependable daily site support.',
      },
      {
        id: 'pantry-support',
        categoryBadge: 'Office Support',
        roleName: 'Pantry Staff',
        shiftTiming: '8 AM - 5 PM',
        monthlyPrice: 14500,
        workingHours: '9 working hours',
        availability: '97% availability',
        replacement: '24-48 hour support',
        features: [
          'Hygiene trained staff',
          'Tea and pantry service',
          'Inventory coordination',
          'Uniformed deployment',
          'Escalation management',
        ],
        useCase: 'Ideal for offices, clinics, and businesses with daily pantry operations.',
      },
    ],
  },
  housekeeping: {
    id: 'housekeeping',
    label: 'Housekeeping',
    shortLabel: 'Cleaning',
    description: 'Professional cleaning staff',
    icon: Sparkles,
    plans: [
      {
        id: 'housekeeping-daily-care',
        categoryBadge: 'Housekeeping',
        roleName: 'Daily Care Staff',
        shiftTiming: '8 AM - 5 PM',
        monthlyPrice: 14000,
        workingHours: '9 working hours',
        availability: '98% availability',
        replacement: '24 hour replacement',
        features: [
          'Uniformed staff',
          'Daily cleaning checklist',
          'Trained professionals',
          'Attendance support',
          'Supervisor inspection',
        ],
        useCase: 'Ideal for offices, clinics, schools, and apartment communities.',
      },
      {
        id: 'deep-cleaning-staff',
        categoryBadge: 'Housekeeping',
        roleName: 'Deep Cleaning Staff',
        shiftTiming: 'Flexible shift',
        monthlyPrice: 19000,
        workingHours: '9 working hours',
        availability: '99% availability',
        replacement: 'Same-day support',
        highlighted: true,
        features: [
          'Deep-clean trained staff',
          'Quality audit support',
          'Consumables coordination',
          'Supervisor monitoring',
          'Escalation management',
        ],
        useCase: 'Suitable for high-footfall offices, hospitals, schools, and CHS sites.',
      },
      {
        id: 'housekeeping-night',
        categoryBadge: 'Housekeeping',
        roleName: 'Night Shift Cleaner',
        shiftTiming: 'Night shift available',
        monthlyPrice: 16500,
        workingHours: '8 working hours',
        availability: '97% availability',
        replacement: '48 hour replacement',
        features: [
          'Background checked employees',
          'After-hours cleaning',
          'Site handover reporting',
          'Uniformed staff',
          'Support coordination',
        ],
        useCase: 'Best for commercial buildings and offices that need after-hours cleaning.',
      },
    ],
  },
  
  frontDesk: {
    id: 'frontDesk',
    label: 'Front Desk',
    shortLabel: 'Front Desk',
    description: 'Professional reception support',
    icon: UserCheck,
    plans: [
      {
        id: 'reception-executive',
        categoryBadge: 'Front Desk',
        roleName: 'Reception Executive',
        shiftTiming: '9 AM - 6 PM',
        monthlyPrice: 22000,
        workingHours: '9 working hours',
        availability: '98% availability',
        replacement: '48 hour replacement',
        highlighted: true,
        features: [
          'Trained and groomed professionals',
          'Visitor desk management',
          'Call coordination',
          'Attendance support',
          'Supervisor monitoring',
        ],
        useCase: 'Best for offices, clinics, schools, hospitals, and commercial receptions.',
      },
      {
        id: 'front-desk-assistant',
        categoryBadge: 'Front Desk',
        roleName: 'Front Desk Assistant',
        shiftTiming: '10 AM - 7 PM',
        monthlyPrice: 18500,
        workingHours: '9 working hours',
        availability: '96% availability',
        replacement: '48 hour replacement',
        features: [
          'Background checked employees',
          'Visitor coordination',
          'Courier and call handling',
          'Professional grooming',
          'Support coordination',
        ],
        useCase: 'A practical option for small businesses and shared office receptions.',
      },
      {
        id: 'hospital-reception',
        categoryBadge: 'Front Desk',
        roleName: 'Hospital Reception Support',
        shiftTiming: '8 AM - 5 PM',
        monthlyPrice: 24000,
        workingHours: '9 working hours',
        availability: '99% availability',
        replacement: '24 hour replacement',
        features: [
          'Patient desk coordination',
          'Trained front-office staff',
          'Escalation management',
          'Uniformed staff',
          'Supervisor monitoring',
        ],
        useCase: 'Suitable for hospitals, diagnostic centers, and clinic reception desks.',
      },
    ],
  },
  facilityManagement: {
    id: 'facilityManagement',
    label: 'Facility Management',
    shortLabel: 'Facility',
    description: 'Supervisory and management staff',
    icon: Building2,
    plans: [
      {
        id: 'facility-supervisor',
        categoryBadge: 'Facility Management',
        roleName: 'Facility Supervisor',
        shiftTiming: '9 AM - 6 PM',
        monthlyPrice: 28000,
        workingHours: '9 working hours',
        availability: '98% availability',
        replacement: '48 hour replacement',
        features: [
          'Supervisor monitoring',
          'Team attendance oversight',
          'Site checklist management',
          'Escalation management',
          'Dedicated support coordination',
        ],
        useCase: 'Designed for sites with multiple support staff and daily operational reporting.',
      },
      {
        id: 'facility-manager',
        categoryBadge: 'Facility Management',
        roleName: 'Facility Manager',
        shiftTiming: '9 AM - 6 PM',
        monthlyPrice: 42000,
        workingHours: '9 working hours',
        availability: '99% availability',
        replacement: '24-48 hour support',
        highlighted: true,
        features: [
          'Facility operations management',
          'Vendor and staff coordination',
          'SLA monitoring',
          'Client escalation handling',
          'Monthly performance reporting',
        ],
        useCase: 'Best for commercial buildings, hospitals, campuses, and large offices.',
      },
      {
        id: 'site-operations-lead',
        categoryBadge: 'Facility Management',
        roleName: 'Site Operations Lead',
        shiftTiming: 'Flexible shift',
        monthlyPrice: 36000,
        workingHours: '9 working hours',
        availability: '98% availability',
        replacement: '48 hour replacement',
        features: [
          'Multi-role staff coordination',
          'Daily handover reporting',
          'Backup replacement support',
          'Quality inspection',
          'Support coordination',
        ],
        useCase: 'Ideal for societies, schools, and offices with blended support teams.',
      },
    ],
  },
};

export const staffingPricingCategories = Object.values(staffingPricingData);
