export type Role = 'admin' | 'client' | 'supervisor' | 'executive' | 'workforce';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[];
  organization: string;
  avatar?: string;
}

export interface KpiData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  branch: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'active' | 'inactive';
  workforceCount: number;
  slaScore: number;
}

export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
  children?: SidebarItem[];
}

export interface NavItem {
  label: string;
  href: string;
}
