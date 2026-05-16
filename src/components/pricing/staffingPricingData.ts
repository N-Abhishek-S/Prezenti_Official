// ---------------------------------------------------------------------------
// Staffing Pricing – static data for the public pricing section
// ---------------------------------------------------------------------------

/** Feature entry displayed inside a pricing card. */
export interface StaffingFeature {
  id: string;
  label: string;
  isHighlighted: boolean;
}

/** A single staffing plan (e.g. "Basic", "Standard"). */
export interface StaffingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  currency: string;
  shiftTiming: string;
  workingHours: string;
  isPopular?: boolean;
  features: StaffingFeature[];
}

/** Category keys used across sidebar / accordion / row. */
export type StaffingCategoryKey = 'officeSupport' | 'housekeeping' | 'security';

/** A service category with its nested plans. */
export interface StaffingCategory {
  id: StaffingCategoryKey;
  name: string;
  description: string;
  plans: StaffingPlan[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const staffingPricingCategories: StaffingCategory[] = [
  {
    id: 'officeSupport',
    name: 'Office Support',
    description:
      'Daily office assistance for admin, pantry, visitor, and courier operations.',
    plans: [
      {
        id: 'office-basic',
        name: 'Basic',
        monthlyPrice: 12000,
        currency: 'INR',
        shiftTiming: '9 AM – 6 PM',
        workingHours: '9 hours',
        features: [
          { id: 'of-b-1', label: 'Trained office support staff', isHighlighted: true },
          { id: 'of-b-2', label: 'Police verified employee', isHighlighted: false },
          { id: 'of-b-3', label: 'Attendance tracking', isHighlighted: false },
          { id: 'of-b-4', label: 'Basic grooming standards', isHighlighted: false },
        ],
      },
      {
        id: 'office-standard',
        name: 'Standard',
        monthlyPrice: 15500,
        currency: 'INR',
        shiftTiming: '9 AM – 6 PM',
        workingHours: '9 hours',
        isPopular: true,
        features: [
          { id: 'of-s-1', label: 'Experienced office staff', isHighlighted: true },
          { id: 'of-s-2', label: 'Priority replacement support', isHighlighted: true },
          { id: 'of-s-3', label: 'Supervisor check-ins', isHighlighted: false },
          { id: 'of-s-4', label: 'Visitor & courier coordination', isHighlighted: false },
        ],
      },
      {
        id: 'office-premium',
        name: 'Premium',
        monthlyPrice: 19500,
        currency: 'INR',
        shiftTiming: 'Flexible shift',
        workingHours: '9 hours',
        features: [
          { id: 'of-p-1', label: 'Multi-skilled staff', isHighlighted: true },
          { id: 'of-p-2', label: 'Same-day replacement', isHighlighted: true },
          { id: 'of-p-3', label: 'Monthly performance reports', isHighlighted: false },
          { id: 'of-p-4', label: 'Transport included', isHighlighted: false },
        ],
      },
    ],
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    description:
      'Trained facility cleaning staff with supervisor checks and replacement support.',
    plans: [
      {
        id: 'hk-daily',
        name: 'Daily Care',
        monthlyPrice: 14000,
        currency: 'INR',
        shiftTiming: '8 AM – 5 PM',
        workingHours: '9 hours',
        features: [
          { id: 'hk-d-1', label: 'Daily cleaning checklist', isHighlighted: true },
          { id: 'hk-d-2', label: 'Uniformed staff', isHighlighted: false },
          { id: 'hk-d-3', label: 'Verified employee', isHighlighted: false },
          { id: 'hk-d-4', label: 'Supervisor inspection', isHighlighted: true },
        ],
      },
      {
        id: 'hk-premium',
        name: 'Premium Care',
        monthlyPrice: 19000,
        currency: 'INR',
        shiftTiming: 'Flexible shift',
        workingHours: '9 hours',
        isPopular: true,
        features: [
          { id: 'hk-p-1', label: 'Deep-clean trained staff', isHighlighted: true },
          { id: 'hk-p-2', label: 'Quality audits', isHighlighted: true },
          { id: 'hk-p-3', label: 'Consumables coordination', isHighlighted: false },
          { id: 'hk-p-4', label: 'Transport included', isHighlighted: false },
        ],
      },
    ],
  },
  {
    id: 'security',
    name: 'Security',
    description:
      'Verified guards for access control, gate management, and site safety.',
    plans: [
      {
        id: 'sec-standard',
        name: 'Standard Guard',
        monthlyPrice: 18000,
        currency: 'INR',
        shiftTiming: '12-hour shift',
        workingHours: '12 hours',
        features: [
          { id: 'sec-s-1', label: 'Background verified guard', isHighlighted: true },
          { id: 'sec-s-2', label: 'Gate register management', isHighlighted: false },
          { id: 'sec-s-3', label: 'Visitor coordination', isHighlighted: false },
          { id: 'sec-s-4', label: 'Incident escalation support', isHighlighted: true },
        ],
      },
      {
        id: 'sec-armed',
        name: 'Armed Guard',
        monthlyPrice: 25000,
        currency: 'INR',
        shiftTiming: '12-hour shift',
        workingHours: '12 hours',
        isPopular: true,
        features: [
          { id: 'sec-a-1', label: 'Licensed armed personnel', isHighlighted: true },
          { id: 'sec-a-2', label: 'CCTV patrol coordination', isHighlighted: true },
          { id: 'sec-a-3', label: 'Emergency response protocol', isHighlighted: false },
          { id: 'sec-a-4', label: 'Night patrol included', isHighlighted: false },
        ],
      },
    ],
  },
];
