import type {
  Area,
  BrandingSettings,
  City,
  CompanyRepository,
  ContactDetails,
  CreateLeadInput,
  LeadRecord,
  LeadRepository,
  LeadStatus,
  LocationRepository,
  PackageRepository,
  ServiceOffering,
  ServiceRepository,
  TrustPackage,
} from './types';
import {
  initialAreas,
  initialBranding,
  initialCities,
  initialContactDetails,
  initialLeads,
  initialPackages,
  initialServices,
} from './mockData';

const clone = <T>(value: T): T => structuredClone(value);
const idFrom = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

let services = clone(initialServices);
let packages = clone(initialPackages);
let cities = clone(initialCities);
let areas = clone(initialAreas);
let contactDetails = clone(initialContactDetails);
let branding = clone(initialBranding);
let leads = clone(initialLeads);

function sortByOrder<T extends { displayOrder: number }>(items: T[]) {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

class MockServiceRepository implements ServiceRepository {
  async getServices() {
    return clone(sortByOrder(services));
  }

  async createService(input: Omit<ServiceOffering, 'id'>) {
    const service = { ...input, id: idFrom('svc') };
    services = sortByOrder([...services, service]);
    return clone(service);
  }

  async updateService(id: string, input: Partial<Omit<ServiceOffering, 'id'>>) {
    services = services.map((service) => (service.id === id ? { ...service, ...input } : service));
    const updated = services.find((service) => service.id === id);
    if (!updated) throw new Error('Service not found');
    return clone(updated);
  }

  async deleteService(id: string) {
    services = services.filter((service) => service.id !== id);
    packages = packages.filter((item) => item.serviceId !== id);
  }

  async reorderServices(ids: string[]) {
    services = services.map((service) => {
      const index = ids.indexOf(service.id);
      return index >= 0 ? { ...service, displayOrder: index + 1 } : service;
    });
    return clone(sortByOrder(services));
  }
}

class MockPackageRepository implements PackageRepository {
  async getPackages() {
    return clone(sortByOrder(packages));
  }

  async createPackage(input: Omit<TrustPackage, 'id'>) {
    const item = { ...input, id: idFrom('pkg') };
    packages = sortByOrder([...packages, item]);
    return clone(item);
  }

  async updatePackage(id: string, input: Partial<Omit<TrustPackage, 'id'>>) {
    packages = packages.map((item) => (item.id === id ? { ...item, ...input } : item));
    const updated = packages.find((item) => item.id === id);
    if (!updated) throw new Error('Package not found');
    return clone(updated);
  }

  async deletePackage(id: string) {
    packages = packages.filter((item) => item.id !== id);
  }
}

class MockLocationRepository implements LocationRepository {
  async getCities() {
    return clone(sortByOrder(cities));
  }

  async getAreas(cityId?: string) {
    return clone(sortByOrder(cityId ? areas.filter((area) => area.cityId === cityId) : areas));
  }

  async createCity(input: Omit<City, 'id'>) {
    const city = { ...input, id: idFrom('city') };
    cities = sortByOrder([...cities, city]);
    return clone(city);
  }

  async updateCity(id: string, input: Partial<Omit<City, 'id'>>) {
    cities = cities.map((city) => (city.id === id ? { ...city, ...input } : city));
    const updated = cities.find((city) => city.id === id);
    if (!updated) throw new Error('City not found');
    return clone(updated);
  }

  async deleteCity(id: string) {
    cities = cities.filter((city) => city.id !== id);
    areas = areas.filter((area) => area.cityId !== id);
  }

  async createArea(input: Omit<Area, 'id'>) {
    const area = { ...input, id: idFrom('area') };
    areas = sortByOrder([...areas, area]);
    return clone(area);
  }

  async updateArea(id: string, input: Partial<Omit<Area, 'id'>>) {
    areas = areas.map((area) => (area.id === id ? { ...area, ...input } : area));
    const updated = areas.find((area) => area.id === id);
    if (!updated) throw new Error('Area not found');
    return clone(updated);
  }

  async deleteArea(id: string) {
    areas = areas.filter((area) => area.id !== id);
  }
}

class MockCompanyRepository implements CompanyRepository {
  async getContactDetails() {
    return clone(contactDetails);
  }

  async updateContactDetails(input: ContactDetails) {
    contactDetails = clone(input);
    return clone(contactDetails);
  }

  async getBranding() {
    return clone(branding);
  }

  async updateBranding(input: BrandingSettings) {
    branding = clone(input);
    return clone(branding);
  }
}

class MockLeadRepository implements LeadRepository {
  async getLeads() {
    return clone([...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }

  async createLead(input: CreateLeadInput) {
    const lead: LeadRecord = {
      ...input,
      id: idFrom('lead'),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    leads = [lead, ...leads];
    return clone(lead);
  }

  async updateLeadStatus(id: string, status: LeadStatus) {
    leads = leads.map((lead) => (lead.id === id ? { ...lead, status } : lead));
    const updated = leads.find((lead) => lead.id === id);
    if (!updated) throw new Error('Lead not found');
    return clone(updated);
  }

  async exportLeads() {
    const header = ['Name', 'Phone', 'Email', 'Service', 'Property', 'Work Type', 'Hours', 'City', 'Area', 'Status', 'Message'];
    const rows = leads.map((lead) => [
      lead.fullName,
      lead.phone,
      lead.email,
      lead.serviceName,
      lead.propertyType ?? '',
      lead.workType,
      String(lead.hours),
      lead.city,
      lead.area,
      lead.status,
      lead.autoMessage,
    ]);

    return [header, ...rows].map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
  }
}

export const mockServiceRepository = new MockServiceRepository();
export const mockPackageRepository = new MockPackageRepository();
export const mockLocationRepository = new MockLocationRepository();
export const mockCompanyRepository = new MockCompanyRepository();
export const mockLeadRepository = new MockLeadRepository();
