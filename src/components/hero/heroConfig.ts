export type HeroRoleAnimation = 'supervise' | 'clean' | 'serve' | 'welcome';

export interface HeroRole {
  id: string;
  name: string;
  title: string;
  headline: string;
  description: string;
  imagePath: string;
  modelPath: string;
  animation: HeroRoleAnimation;
  accent: string;
}

/**
 * Strict role mapping — matches exact uploaded staff PNGs.
 * Order: Admin Manager (primary hero), then rotating secondaries.
 */
export const heroRoles: HeroRole[] = [
  {
    id: 'admin',
    name: 'Facility Supervision',
    title: 'Admin / Facility Manager',
    headline: 'On-site operational leadership',
    description: 'Supervisory operations management with real-time oversight and quality control.',
    imagePath: '/hero/staff/admin-manager.png',
    modelPath: '/hero/models/admin-manager.png',
    animation: 'supervise',
    accent: '#123F35',
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping Excellence',
    title: 'Housekeeping Staff',
    headline: 'Professional cleaning support',
    description: 'Trained cleaning teams delivering spotless facility maintenance every day.',
    imagePath: '/hero/staff/housekeeping.png',
    modelPath: '/hero/models/housekeeping.glb',
    animation: 'clean',
    accent: '#4F4F6F',
  },
  {
    id: 'pantry',
    name: 'Pantry Services',
    title: 'Office Boy / Pantry Support',
    headline: 'Hospitality support at your service',
    description: 'Professional pantry and hospitality staff ensuring seamless office support.',
    imagePath: '/hero/staff/office-boy.png',
    modelPath: '/hero/models/office-boy.glb',
    animation: 'serve',
    accent: '#6B8E23',
  },
  {
    id: 'reception',
    name: 'Reception Teams',
    title: 'Receptionist',
    headline: 'Front desk customer interaction',
    description: 'Professional front desk support creating exceptional first impressions.',
    imagePath: '/hero/staff/receptionist.png',
    modelPath: '/hero/models/receptionist.glb',
    animation: 'welcome',
    accent: '#148F89',
  },
];

export const heroTrustSignals = [
  { label: 'Verified Staff', icon: 'shield' },
  { label: '24/7 Support', icon: 'clock' },
  { label: 'Trained Professionals', icon: 'badge' },
  { label: 'Fast Deployment', icon: 'zap' },
  { label: 'Managed Operations', icon: 'settings' },
  { label: 'Professional Hospitality', icon: 'star' },
] as const;

export const heroStats = [
  { value: '200+', label: 'Enterprise Clients', icon: 'building' },
  { value: 'Verified', label: 'Staff Identity', icon: 'shield' },
  { value: '98.4%', label: 'SLA Compliance', icon: 'chart' },
  { value: '15K+', label: 'Staff Managed', icon: 'users' },
] as const;
