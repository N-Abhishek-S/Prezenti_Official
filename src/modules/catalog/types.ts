import type { LucideIcon } from 'lucide-react';

export type ServiceFlowType = 'direct' | 'property';
export type PropertyType = 'Residential Building' | 'Commercial Building';
export type WorkType = 'Full Time' | 'Half Time';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface TrustPackage {
  id: string;
  serviceId: string;
  propertyType?: PropertyType;
  workType: WorkType;
  hours: number;
  description: string;
  includedServices: string[];
  excludedServices: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  whatsappCtaLabel: string;
  pricingPlaceholder: string;
  isActive: boolean;
  displayOrder: number;
}

export interface ServiceOffering {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ServiceFlowType;
  iconKey: string;
  isActive: boolean;
  displayOrder: number;
  propertyTypes: PropertyType[];
}

export interface ServiceOfferingView extends ServiceOffering {
  icon: LucideIcon;
  packages: TrustPackage[];
}

export interface City {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

export interface Area {
  id: string;
  cityId: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

export interface ContactDetails {
  id: string;
  phones: string[];
  emails: string[];
  officeAddress: string;
  ctaText: string;
  supportText: string;
}

export interface BrandingSettings {
  id: string;
  logoPath: string;
  faviconPath: string;
  heroPrimaryVideoPath: string;
  heroSupportingVideoPath: string;
}

export interface LeadRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  propertyType?: PropertyType;
  workType: WorkType;
  hours: number;
  city: string;
  area: string;
  autoMessage: string;
  status: LeadStatus;
  createdAt: string;
}

export interface CreateLeadInput {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  propertyType?: PropertyType;
  workType: WorkType;
  hours: number;
  city: string;
  area: string;
  autoMessage: string;
}

export interface ServiceSelectionContext {
  service: ServiceOfferingView;
  package: TrustPackage;
  city: City;
  area: Area;
  propertyType?: PropertyType;
}

export interface ServiceRepository {
  getServices(): Promise<ServiceOffering[]>;
  createService(input: Omit<ServiceOffering, 'id'>): Promise<ServiceOffering>;
  updateService(id: string, input: Partial<Omit<ServiceOffering, 'id'>>): Promise<ServiceOffering>;
  deleteService(id: string): Promise<void>;
  reorderServices(ids: string[]): Promise<ServiceOffering[]>;
}

export interface PackageRepository {
  getPackages(): Promise<TrustPackage[]>;
  createPackage(input: Omit<TrustPackage, 'id'>): Promise<TrustPackage>;
  updatePackage(id: string, input: Partial<Omit<TrustPackage, 'id'>>): Promise<TrustPackage>;
  deletePackage(id: string): Promise<void>;
}

export interface LocationRepository {
  getCities(): Promise<City[]>;
  getAreas(cityId?: string): Promise<Area[]>;
  createCity(input: Omit<City, 'id'>): Promise<City>;
  updateCity(id: string, input: Partial<Omit<City, 'id'>>): Promise<City>;
  deleteCity(id: string): Promise<void>;
  createArea(input: Omit<Area, 'id'>): Promise<Area>;
  updateArea(id: string, input: Partial<Omit<Area, 'id'>>): Promise<Area>;
  deleteArea(id: string): Promise<void>;
}

export interface CompanyRepository {
  getContactDetails(): Promise<ContactDetails>;
  updateContactDetails(input: ContactDetails): Promise<ContactDetails>;
  getBranding(): Promise<BrandingSettings>;
  updateBranding(input: BrandingSettings): Promise<BrandingSettings>;
}

export interface LeadRepository {
  getLeads(): Promise<LeadRecord[]>;
  createLead(input: CreateLeadInput): Promise<LeadRecord>;
  updateLeadStatus(id: string, status: LeadStatus): Promise<LeadRecord>;
  exportLeads(): Promise<string>;
}
