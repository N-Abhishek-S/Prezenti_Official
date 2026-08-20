import { publicAsset } from '../../lib/publicAsset';

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
  { value: 'Housekeeping', label: 'Workplace Services' },
  { value: 'Facility', label: 'Management Services' },
  { value: 'Support', label: 'Staffing Services' },
  { value: 'Site-Specific', label: 'Service Planning' },
] as const;

export const homepageFaqs = [
  {
    question: 'What is included in your integrated facility management services?',
    answer: 'Prezenti offers end-to-end soft services including corporate housekeeping, office boy deployment, pantry management, and receptionist staffing tailored for commercial environments.'
  },
  {
    question: 'Are all your deployed staff PF and ESIC compliant?',
    answer: 'PF, ESIC, and PT requirements can be considered when defining workforce responsibilities and engagement requirements in line with applicable labour regulations.'
  },
  {
    question: 'Do you conduct background checks on your facility staff?',
    answer: 'Personnel verification requirements can be defined according to the site, role, and engagement requirements.'
  },
  {
    question: 'Which areas in Pune do you serve?',
    answer: 'We provide facility management services across all major commercial hubs in Pune, including Hinjawadi, Kharadi, Magarpatta, Baner, Viman Nagar, and surrounding corporate zones.'
  }
];
