import type { LucideIcon } from 'lucide-react';

export const timePreferenceOptions = [
  'Full Time (8 Hours)',
  'Half Time (4 Hours)',
] as const;

export const serviceSubcategoryOptions = [
  'Offices / Corporate',
  'Commercial Buildings',
  'Residential Buildings',
  'Hospital / Healthcare',
  'Cafes / Restaurants',
  'Pre Schools',
] as const;

export const inquiryTypeOptions = [
  'General Inquiry',
  'Request Callback',
  'Service Information',
  'Pricing Information',
  'Custom Requirement',
] as const;

export type ExpertServiceName = string;
export type TimePreference = (typeof timePreferenceOptions)[number];
export type ServiceSubcategory = (typeof serviceSubcategoryOptions)[number];
export type InquiryType = (typeof inquiryTypeOptions)[number];

export type ServiceDetailsBySubcategory = Record<ServiceSubcategory, {
  included: string[];
  notIncluded: string[];
}>;

export interface ExpertServiceConfig {
  id: string;
  name: ExpertServiceName;
  description: string;
  icon: LucideIcon;
  detailsBySubcategory: ServiceDetailsBySubcategory;
}

export const defaultTimePreference: TimePreference = 'Full Time (8 Hours)';
export const defaultServiceSubcategory: ServiceSubcategory = 'Offices / Corporate';
export const defaultInquiryType: InquiryType = 'General Inquiry';
