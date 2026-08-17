/**
 * Centralized data for the duration-based staffing model shown on the
 * Pricing page. Approved public starting prices — single source of truth,
 * do not hardcode these numbers elsewhere. These are indicative starting
 * prices, not fixed quotes; the "Final pricing may vary" disclaimer on
 * PricingPage.tsx carries that distinction.
 */
export interface DurationPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  minimumDuration?: string;
  totalNote?: string;
  suitableFor: string[];
  features: string[];
  cta: string;
  popular?: boolean;
  popularLabel?: string;
}

export const durationPlans: DurationPlan[] = [
  {
    id: 'hourly',
    name: 'Hourly',
    tagline: 'Short-duration coverage billed by the hour.',
    price: '₹249',
    unit: '/ hour',
    suitableFor: [
      'Short-duration housekeeping',
      'Office or guest-area cleaning',
      'Event support',
      'Temporary requirements',
    ],
    features: [
      'Flexible short-duration staffing',
      'Suitable for urgent requirements',
      'Ideal for offices and properties',
      'Staff scheduling based on availability',
    ],
    cta: 'Request Hourly Staff',
  },
  {
    id: 'one-day',
    name: 'One Day',
    tagline: 'A full day of dedicated housekeeping support.',
    price: '₹1,499',
    unit: '/ day',
    suitableFor: [
      'One-day housekeeping',
      'Office cleaning',
      'Deep-clean support',
      'Event or property requirements',
    ],
    features: [
      'Full-day housekeeping support',
      'Suitable for temporary requirements',
      'Flexible deployment',
      'Professional staffing coordination',
    ],
    cta: 'Book for a Day',
  },
  {
    id: 'multi-day',
    name: 'Multi-Day',
    tagline: 'Consistent coverage across a short project window.',
    price: '₹1,299',
    unit: '/ day',
    minimumDuration: 'Minimum 3 days',
    totalNote: 'From ₹3,897 for 3 days',
    suitableFor: [
      'Short projects',
      'Temporary staffing',
      'Property preparation',
      'Extended cleaning requirements',
    ],
    features: [
      'Better suited for short projects',
      'Consistent staffing support',
      'Flexible duration',
      'Suitable for temporary facility requirements',
    ],
    cta: 'Plan Multiple Days',
  },
  {
    id: 'weekly',
    name: 'Weekly',
    tagline: 'Planned, recurring staffing on a weekly cadence.',
    price: '₹7,999',
    unit: '/ week',
    suitableFor: [
      'Small offices',
      'Commercial spaces',
      'Temporary staffing requirements',
      'Recurring housekeeping',
    ],
    features: [
      'Recurring weekly support',
      'Planned staffing',
      'Suitable for small and medium facilities',
      'Flexible service scheduling',
    ],
    cta: 'Choose Weekly',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    tagline: 'Ongoing staffing built for operational continuity.',
    price: '₹22,999',
    unit: '/ month',
    suitableFor: [
      'Regular office housekeeping',
      'Commercial facilities',
      'Residential societies',
      'Long-term staffing requirements',
    ],
    features: [
      'Long-term housekeeping support',
      'Recurring staffing',
      'Better operational continuity',
      'Dedicated staffing coordination',
    ],
    cta: 'Request Monthly Staff',
    popular: true,
    popularLabel: 'Best for Regular Operations',
  },
];

export interface PlanRecommendation {
  requirement: string;
  recommended: string;
}

export const planRecommendations: PlanRecommendation[] = [
  { requirement: 'Short-duration support', recommended: 'Hourly' },
  { requirement: 'Single-day requirement', recommended: 'One Day' },
  { requirement: 'Short project', recommended: 'Multi-Day' },
  { requirement: 'Recurring weekly cleaning', recommended: 'Weekly' },
  { requirement: 'Regular facility operations', recommended: 'Monthly' },
];

export interface PricingFaq {
  question: string;
  answer: string;
}

export const pricingFaqs: PricingFaq[] = [
  {
    question: 'Are the prices fixed?',
    answer: 'The displayed amounts are starting prices. Final pricing may vary depending on staffing requirements, shift duration, location, scope of work, working hours and service frequency.',
  },
  {
    question: 'Can I hire housekeeping staff for only a few hours?',
    answer: 'Yes. Prezenti offers hourly staffing options subject to staff availability and requirement.',
  },
  {
    question: 'Can I hire staff for one day?',
    answer: 'Yes. One-day housekeeping staffing is available for temporary and short-term requirements.',
  },
  {
    question: 'Can I request staff for multiple days?',
    answer: 'Yes. Multi-day staffing can be arranged based on the required duration and staffing availability, with a minimum of 3 days.',
  },
  {
    question: 'Is monthly housekeeping staffing available?',
    answer: 'Yes. Monthly staffing is suitable for organizations requiring recurring housekeeping support.',
  },
  {
    question: 'Can I request multiple housekeeping staff?',
    answer: 'Yes. Staffing requirements can be discussed with the Prezenti team and quoted according to the requirement.',
  },
  {
    question: 'How do I get the final price?',
    answer: 'Submit an inquiry through our contact form and share the location, number of staff, duration and working hours. Our team reviews it and prepares a quotation for your requirement.',
  },
];
