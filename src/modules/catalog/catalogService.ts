import { BadgeCheck, BriefcaseBusiness, Sparkles, UserRoundCheck, type LucideIcon } from 'lucide-react';
import {
  mockCompanyRepository,
  mockLeadRepository,
  mockLocationRepository,
  mockPackageRepository,
  mockServiceRepository,
} from './mockCatalogRepository';
import type {
  Area,
  BrandingSettings,
  City,
  CompanyRepository,
  ContactDetails,
  CreateLeadInput,
  LeadRepository,
  LeadStatus,
  LocationRepository,
  PackageRepository,
  ServiceOffering,
  ServiceOfferingView,
  ServiceRepository,
  TrustPackage,
} from './types';

const iconRegistry: Record<string, LucideIcon> = {
  reception: UserRoundCheck,
  facility: BadgeCheck,
  office: BriefcaseBusiness,
  housekeeping: Sparkles,
};

export class CatalogService {
  private readonly serviceRepository: ServiceRepository;
  private readonly packageRepository: PackageRepository;

  constructor(serviceRepository: ServiceRepository, packageRepository: PackageRepository) {
    this.serviceRepository = serviceRepository;
    this.packageRepository = packageRepository;
  }

  async getServiceViews(): Promise<ServiceOfferingView[]> {
    const [services, packages] = await Promise.all([
      this.serviceRepository.getServices(),
      this.packageRepository.getPackages(),
    ]);

    return services
      .filter((service) => service.isActive)
      .map((service) => ({
        ...service,
        icon: iconRegistry[service.iconKey] ?? BriefcaseBusiness,
        packages: packages
          .filter((item) => item.serviceId === service.id && item.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder),
      }));
  }

  getServices() {
    return this.serviceRepository.getServices();
  }

  createService(input: Omit<ServiceOffering, 'id'>) {
    return this.serviceRepository.createService(input);
  }

  updateService(id: string, input: Partial<Omit<ServiceOffering, 'id'>>) {
    return this.serviceRepository.updateService(id, input);
  }

  deleteService(id: string) {
    return this.serviceRepository.deleteService(id);
  }

  reorderServices(ids: string[]) {
    return this.serviceRepository.reorderServices(ids);
  }

  getPackages() {
    return this.packageRepository.getPackages();
  }

  createPackage(input: Omit<TrustPackage, 'id'>) {
    return this.packageRepository.createPackage(input);
  }

  updatePackage(id: string, input: Partial<Omit<TrustPackage, 'id'>>) {
    return this.packageRepository.updatePackage(id, input);
  }

  deletePackage(id: string) {
    return this.packageRepository.deletePackage(id);
  }
}

export class LocationService {
  private readonly locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  getCities() {
    return this.locationRepository.getCities();
  }

  getAreas(cityId?: string) {
    return this.locationRepository.getAreas(cityId);
  }

  createCity(input: Omit<City, 'id'>) {
    return this.locationRepository.createCity(input);
  }

  updateCity(id: string, input: Partial<Omit<City, 'id'>>) {
    return this.locationRepository.updateCity(id, input);
  }

  deleteCity(id: string) {
    return this.locationRepository.deleteCity(id);
  }

  createArea(input: Omit<Area, 'id'>) {
    return this.locationRepository.createArea(input);
  }

  updateArea(id: string, input: Partial<Omit<Area, 'id'>>) {
    return this.locationRepository.updateArea(id, input);
  }

  deleteArea(id: string) {
    return this.locationRepository.deleteArea(id);
  }
}

export class CompanyService {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  getContactDetails() {
    return this.companyRepository.getContactDetails();
  }

  updateContactDetails(input: ContactDetails) {
    return this.companyRepository.updateContactDetails(input);
  }

  getBranding() {
    return this.companyRepository.getBranding();
  }

  updateBranding(input: BrandingSettings) {
    return this.companyRepository.updateBranding(input);
  }
}

export class LeadService {
  private readonly leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  getLeads() {
    return this.leadRepository.getLeads();
  }

  createLead(input: CreateLeadInput) {
    return this.leadRepository.createLead(input);
  }

  updateLeadStatus(id: string, status: LeadStatus) {
    return this.leadRepository.updateLeadStatus(id, status);
  }

  exportLeads() {
    return this.leadRepository.exportLeads();
  }
}

export const catalogService = new CatalogService(mockServiceRepository, mockPackageRepository);
export const locationService = new LocationService(mockLocationRepository);
export const companyService = new CompanyService(mockCompanyRepository);
export const leadService = new LeadService(mockLeadRepository);
