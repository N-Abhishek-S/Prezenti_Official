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
  { value: '200+', label: 'Enterprise Clients' },
  { value: '98.4%', label: 'Avg. SLA Compliance' },
  { value: '15,000+', label: 'Workforce Managed' },
  { value: '500+', label: 'Sites Operational' },
] as const;
