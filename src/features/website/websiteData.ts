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
  { value: '100%', label: 'Statutory Compliant (PF/ESIC)' },
  { value: '100%', label: 'Police Verified Staff' },
  { value: '200+', label: 'Enterprise Clients' },
  { value: '98.4%', label: 'SLA Compliance' },
] as const;

export const homepageFaqs = [
  {
    question: 'What is included in your integrated facility management services?',
    answer: 'Prezenti offers end-to-end soft services including corporate housekeeping, office boy deployment, pantry management, receptionist staffing, and comprehensive security services tailored for commercial environments.'
  },
  {
    question: 'Are all your deployed staff PF and ESIC compliant?',
    answer: 'Yes. 100% of our workforce is deployed strictly adhering to state and central labor laws, with full PF, ESIC, and PT compliance managed by our in-house HR operations.'
  },
  {
    question: 'Do you conduct background checks on your facility staff?',
    answer: 'Absolutely. Every staff member undergoes rigorous address verification and police background checks before deployment to ensure the highest level of security for your corporate premises.'
  },
  {
    question: 'Which areas in Pune do you serve?',
    answer: 'We provide facility management services across all major commercial hubs in Pune, including Hinjawadi, Kharadi, Magarpatta, Baner, Viman Nagar, and surrounding corporate zones.'
  }
];
