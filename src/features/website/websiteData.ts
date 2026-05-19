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
