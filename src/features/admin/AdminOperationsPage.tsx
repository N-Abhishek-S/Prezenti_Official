import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Building2,
  Download,
  Edit3,
  FileText,
  Layers3,
  MapPin,
  PackageCheck,
  Palette,
  Plus,
  RotateCw,
  Trash2,
  UsersRound,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { catalogService, companyService, leadService, locationService } from '../../modules/catalog/catalogService';
import type {
  Area,
  BrandingSettings,
  City,
  ContactDetails,
  LeadRecord,
  LeadStatus,
  PropertyType,
  ServiceFlowType,
  ServiceOffering,
  TrustPackage,
  WorkType,
} from '../../modules/catalog/types';

type AdminTab = 'services' | 'packages' | 'cities' | 'areas' | 'contact' | 'branding' | 'leads';

const tabs: { id: AdminTab; label: string; icon: typeof Layers3 }[] = [
  { id: 'services', label: 'Services', icon: Layers3 },
  { id: 'packages', label: 'Packages', icon: PackageCheck },
  { id: 'cities', label: 'Cities', icon: Building2 },
  { id: 'areas', label: 'Areas', icon: MapPin },
  { id: 'contact', label: 'Contact', icon: FileText },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'leads', label: 'Leads', icon: UsersRound },
];

const slugify = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const lines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

const emptyServiceForm = {
  id: '',
  name: '',
  slug: '',
  description: '',
  type: 'direct' as ServiceFlowType,
  iconKey: 'office',
  isActive: true,
  displayOrder: 1,
  propertyTypes: '',
};

const emptyPackageForm = {
  id: '',
  serviceId: '',
  propertyType: '',
  workType: 'Full Time' as WorkType,
  hours: 8,
  description: '',
  includedServices: '',
  excludedServices: '',
  primaryCtaLabel: 'Get Quote',
  secondaryCtaLabel: 'Talk to Expert',
  whatsappCtaLabel: 'WhatsApp Us',
  pricingPlaceholder: 'Custom quote after site assessment',
  isActive: true,
  displayOrder: 1,
};

export function AdminOperationsPage() {
  const location = useLocation();
  const initialTab = (location.pathname.includes('packages')
    ? 'packages'
    : location.pathname.includes('cities')
      ? 'cities'
      : location.pathname.includes('leads')
        ? 'leads'
        : 'services') satisfies AdminTab;
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [services, setServices] = useState<ServiceOffering[]>([]);
  const [packages, setPackages] = useState<TrustPackage[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
  const [branding, setBranding] = useState<BrandingSettings | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [packageForm, setPackageForm] = useState(emptyPackageForm);
  const [cityName, setCityName] = useState('');
  const [areaForm, setAreaForm] = useState({ id: '', cityId: 'city-pune', name: '', isActive: true });
  const [leadFilter, setLeadFilter] = useState('');
  const [status, setStatus] = useState('');

  const loadData = useCallback(async () => {
    const [serviceData, packageData, cityData, areaData, contactData, brandingData, leadData] = await Promise.all([
      catalogService.getServices(),
      catalogService.getPackages(),
      locationService.getCities(),
      locationService.getAreas(),
      companyService.getContactDetails(),
      companyService.getBranding(),
      leadService.getLeads(),
    ]);

    setServices(serviceData);
    setPackages(packageData);
    setCities(cityData);
    setAreas(areaData);
    setContactDetails(contactData);
    setBranding(brandingData);
    setLeads(leadData);
    setPackageForm((current) => ({ ...current, serviceId: current.serviceId || serviceData[0]?.id || '' }));
    setAreaForm((current) => ({ ...current, cityId: current.cityId || cityData[0]?.id || '' }));
  }, []);

  useEffect(() => {
    loadData().catch(() => setStatus('Could not load mock admin data.'));
  }, [loadData]);

  const serviceNameById = useMemo(
    () => new Map(services.map((service) => [service.id, service.name])),
    [services],
  );

  const filteredLeads = useMemo(() => {
    const needle = leadFilter.toLowerCase();
    return leads.filter((lead) =>
      [lead.fullName, lead.phone, lead.email, lead.serviceName, lead.area, lead.status]
        .some((value) => value.toLowerCase().includes(needle)),
    );
  }, [leadFilter, leads]);

  const saveService = async () => {
    const payload = {
      name: serviceForm.name,
      slug: serviceForm.slug || slugify(serviceForm.name),
      description: serviceForm.description,
      type: serviceForm.type,
      iconKey: serviceForm.iconKey,
      isActive: serviceForm.isActive,
      displayOrder: Number(serviceForm.displayOrder),
      propertyTypes: lines(serviceForm.propertyTypes) as PropertyType[],
    };

    if (serviceForm.id) {
      await catalogService.updateService(serviceForm.id, payload);
      setStatus('Service updated.');
    } else {
      await catalogService.createService(payload);
      setStatus('Service created.');
    }

    setServiceForm(emptyServiceForm);
    await loadData();
  };

  const editService = (service: ServiceOffering) => {
    setServiceForm({
      id: service.id,
      name: service.name,
      slug: service.slug,
      description: service.description,
      type: service.type,
      iconKey: service.iconKey,
      isActive: service.isActive,
      displayOrder: service.displayOrder,
      propertyTypes: service.propertyTypes.join('\n'),
    });
    setActiveTab('services');
  };

  const moveService = async (service: ServiceOffering, direction: -1 | 1) => {
    const sorted = [...services].sort((a, b) => a.displayOrder - b.displayOrder);
    const index = sorted.findIndex((item) => item.id === service.id);
    const targetIndex = index + direction;
    if (index < 0 || targetIndex < 0 || targetIndex >= sorted.length) return;
    [sorted[index], sorted[targetIndex]] = [sorted[targetIndex], sorted[index]];
    await catalogService.reorderServices(sorted.map((item) => item.id));
    await loadData();
  };

  const savePackage = async () => {
    const payload = {
      serviceId: packageForm.serviceId,
      propertyType: packageForm.propertyType ? packageForm.propertyType as PropertyType : undefined,
      workType: packageForm.workType,
      hours: Number(packageForm.hours),
      description: packageForm.description,
      includedServices: lines(packageForm.includedServices),
      excludedServices: lines(packageForm.excludedServices),
      primaryCtaLabel: packageForm.primaryCtaLabel,
      secondaryCtaLabel: packageForm.secondaryCtaLabel,
      whatsappCtaLabel: packageForm.whatsappCtaLabel,
      pricingPlaceholder: packageForm.pricingPlaceholder,
      isActive: packageForm.isActive,
      displayOrder: Number(packageForm.displayOrder),
    };

    if (packageForm.id) {
      await catalogService.updatePackage(packageForm.id, payload);
      setStatus('Package updated.');
    } else {
      await catalogService.createPackage(payload);
      setStatus('Package created.');
    }

    setPackageForm({ ...emptyPackageForm, serviceId: services[0]?.id ?? '' });
    await loadData();
  };

  const editPackage = (item: TrustPackage) => {
    setPackageForm({
      id: item.id,
      serviceId: item.serviceId,
      propertyType: item.propertyType ?? '',
      workType: item.workType,
      hours: item.hours,
      description: item.description,
      includedServices: item.includedServices.join('\n'),
      excludedServices: item.excludedServices.join('\n'),
      primaryCtaLabel: item.primaryCtaLabel,
      secondaryCtaLabel: item.secondaryCtaLabel,
      whatsappCtaLabel: item.whatsappCtaLabel,
      pricingPlaceholder: item.pricingPlaceholder,
      isActive: item.isActive,
      displayOrder: item.displayOrder,
    });
    setActiveTab('packages');
  };

  const saveCity = async () => {
    if (!cityName.trim()) return;
    await locationService.createCity({
      name: cityName,
      slug: slugify(cityName),
      isActive: true,
      displayOrder: cities.length + 1,
    });
    setCityName('');
    setStatus('City created.');
    await loadData();
  };

  const saveArea = async () => {
    if (!areaForm.name.trim()) return;
    const payload = {
      cityId: areaForm.cityId,
      name: areaForm.name,
      slug: slugify(areaForm.name),
      isActive: areaForm.isActive,
      displayOrder: areas.length + 1,
    };
    if (areaForm.id) {
      await locationService.updateArea(areaForm.id, payload);
      setStatus('Area updated.');
    } else {
      await locationService.createArea(payload);
      setStatus('Area created.');
    }
    setAreaForm({ id: '', cityId: cities[0]?.id ?? 'city-pune', name: '', isActive: true });
    await loadData();
  };

  const exportLeads = async () => {
    const csv = await leadService.exportLeads();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presenti-leads.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-800">
            <BadgeCheck size={14} />
            Mock-backed production architecture
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">Admin Operations Console</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
            Manage services, packages, Pune coverage, contact details, branding, and leads through repository-backed modules ready for API or database adapters.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {status && <Badge variant="info">{status}</Badge>}
          <Button type="button" variant="outline" onClick={loadData}>
            <RotateCw size={15} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto rounded-[18px] border border-neutral-200 bg-white p-2 shadow-card">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all ${
                isActive ? 'bg-primary-800 text-white shadow-[0_14px_30px_rgba(18,63,53,0.2)]' : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-800'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'services' && (
        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <Card>
            <CardHeader><h2 className="font-semibold">{serviceForm.id ? 'Edit Service' : 'Create Service'}</h2></CardHeader>
            <CardBody className="space-y-3">
              <input value={serviceForm.name} onChange={(event) => setServiceForm({ ...serviceForm, name: event.target.value })} placeholder="Service name" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <input value={serviceForm.slug} onChange={(event) => setServiceForm({ ...serviceForm, slug: event.target.value })} placeholder="Slug" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <textarea value={serviceForm.description} onChange={(event) => setServiceForm({ ...serviceForm, description: event.target.value })} placeholder="Description" rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <div className="grid gap-3 sm:grid-cols-2">
                <select value={serviceForm.type} onChange={(event) => setServiceForm({ ...serviceForm, type: event.target.value as ServiceFlowType })} className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm">
                  <option value="direct">Direct</option>
                  <option value="property">Property</option>
                </select>
                <input value={serviceForm.iconKey} onChange={(event) => setServiceForm({ ...serviceForm, iconKey: event.target.value })} placeholder="icon key" className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              </div>
              <textarea value={serviceForm.propertyTypes} onChange={(event) => setServiceForm({ ...serviceForm, propertyTypes: event.target.value })} placeholder="Property types, one per line" rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <input type="checkbox" checked={serviceForm.isActive} onChange={(event) => setServiceForm({ ...serviceForm, isActive: event.target.checked })} />
                Active
              </label>
              <Button type="button" onClick={saveService} className="w-full">
                <Plus size={15} />
                Save Service
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold">Service Catalog</h2></CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-sm">
                <thead className="bg-neutral-50 text-xs uppercase tracking-[0.12em] text-neutral-500">
                  <tr><th className="px-4 py-3 text-left">Service</th><th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-t border-neutral-100">
                      <td className="px-4 py-3"><div className="font-semibold text-neutral-950">{service.name}</div><div className="text-xs text-neutral-500">{service.description}</div></td>
                      <td className="px-4 py-3 capitalize">{service.type}</td>
                      <td className="px-4 py-3"><Badge variant={service.isActive ? 'success' : 'warning'}>{service.isActive ? 'Active' : 'Inactive'}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button size="icon-sm" variant="ghost" onClick={() => moveService(service, -1)}>↑</Button>
                          <Button size="icon-sm" variant="ghost" onClick={() => moveService(service, 1)}>↓</Button>
                          <Button size="icon-sm" variant="ghost" onClick={() => editService(service)}><Edit3 size={14} /></Button>
                          <Button size="icon-sm" variant="danger" onClick={async () => { await catalogService.deleteService(service.id); await loadData(); }}><Trash2 size={14} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <Card>
            <CardHeader><h2 className="font-semibold">{packageForm.id ? 'Edit Package' : 'Create Package'}</h2></CardHeader>
            <CardBody className="space-y-3">
              <select value={packageForm.serviceId} onChange={(event) => setPackageForm({ ...packageForm, serviceId: event.target.value })} className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm">
                {services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
              </select>
              <div className="grid gap-3 sm:grid-cols-3">
                <select value={packageForm.propertyType} onChange={(event) => setPackageForm({ ...packageForm, propertyType: event.target.value })} className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm">
                  <option value="">No property</option>
                  <option>Residential Building</option>
                  <option>Commercial Building</option>
                </select>
                <select value={packageForm.workType} onChange={(event) => setPackageForm({ ...packageForm, workType: event.target.value as WorkType, hours: event.target.value === 'Full Time' ? 8 : 4 })} className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm">
                  <option>Full Time</option>
                  <option>Half Time</option>
                </select>
                <input type="number" value={packageForm.hours} onChange={(event) => setPackageForm({ ...packageForm, hours: Number(event.target.value) })} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
              </div>
              <textarea value={packageForm.description} onChange={(event) => setPackageForm({ ...packageForm, description: event.target.value })} placeholder="Package description" rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <textarea value={packageForm.includedServices} onChange={(event) => setPackageForm({ ...packageForm, includedServices: event.target.value })} placeholder="Included services, one per line" rows={5} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <textarea value={packageForm.excludedServices} onChange={(event) => setPackageForm({ ...packageForm, excludedServices: event.target.value })} placeholder="Excluded services, one per line" rows={5} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <div className="grid gap-3 sm:grid-cols-3">
                <input value={packageForm.primaryCtaLabel} onChange={(event) => setPackageForm({ ...packageForm, primaryCtaLabel: event.target.value })} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
                <input value={packageForm.secondaryCtaLabel} onChange={(event) => setPackageForm({ ...packageForm, secondaryCtaLabel: event.target.value })} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
                <input value={packageForm.whatsappCtaLabel} onChange={(event) => setPackageForm({ ...packageForm, whatsappCtaLabel: event.target.value })} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
              </div>
              <input value={packageForm.pricingPlaceholder} onChange={(event) => setPackageForm({ ...packageForm, pricingPlaceholder: event.target.value })} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <input type="checkbox" checked={packageForm.isActive} onChange={(event) => setPackageForm({ ...packageForm, isActive: event.target.checked })} />
                Active
              </label>
              <Button type="button" onClick={savePackage} className="w-full"><Plus size={15} /> Save Package</Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold">Packages</h2></CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-[860px] w-full text-sm">
                <thead className="bg-neutral-50 text-xs uppercase tracking-[0.12em] text-neutral-500">
                  <tr><th className="px-4 py-3 text-left">Package</th><th className="px-4 py-3 text-left">Service</th><th className="px-4 py-3 text-left">Scope</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {packages.map((item) => (
                    <tr key={item.id} className="border-t border-neutral-100">
                      <td className="px-4 py-3 font-semibold">{item.workType} · {item.hours} Hours</td>
                      <td className="px-4 py-3">{serviceNameById.get(item.serviceId)}</td>
                      <td className="px-4 py-3">{item.propertyType ?? 'Direct service'}</td>
                      <td className="px-4 py-3"><Badge variant={item.isActive ? 'success' : 'warning'}>{item.isActive ? 'Active' : 'Inactive'}</Badge></td>
                      <td className="px-4 py-3"><div className="flex justify-end gap-2"><Button size="icon-sm" variant="ghost" onClick={() => editPackage(item)}><Edit3 size={14} /></Button><Button size="icon-sm" variant="danger" onClick={async () => { await catalogService.deletePackage(item.id); await loadData(); }}><Trash2 size={14} /></Button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'cities' && (
        <Card>
          <CardHeader><h2 className="font-semibold">Cities CRUD</h2></CardHeader>
          <CardBody>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row">
              <input value={cityName} onChange={(event) => setCityName(event.target.value)} placeholder="City name" className="min-h-11 flex-1 rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-primary-600" />
              <Button type="button" onClick={saveCity}><Plus size={15} /> Add City</Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {cities.map((city) => (
                <div key={city.id} className="rounded-xl border border-neutral-200 p-4">
                  <div className="font-semibold">{city.name}</div>
                  <div className="mt-1 text-xs text-neutral-500">{city.slug}</div>
                  <div className="mt-4 flex gap-2"><Badge variant={city.isActive ? 'success' : 'warning'}>{city.isActive ? 'Active' : 'Inactive'}</Badge><Button size="icon-sm" variant="danger" onClick={async () => { await locationService.deleteCity(city.id); await loadData(); }}><Trash2 size={14} /></Button></div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'areas' && (
        <Card>
          <CardHeader><h2 className="font-semibold">Areas CRUD</h2></CardHeader>
          <CardBody>
            <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
              <select value={areaForm.cityId} onChange={(event) => setAreaForm({ ...areaForm, cityId: event.target.value })} className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm">
                {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
              <input value={areaForm.name} onChange={(event) => setAreaForm({ ...areaForm, name: event.target.value })} placeholder="Area name" className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <Button type="button" onClick={saveArea}><Plus size={15} /> Save Area</Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area) => (
                <div key={area.id} className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3">
                  <button type="button" className="text-left" onClick={() => setAreaForm({ id: area.id, cityId: area.cityId, name: area.name, isActive: area.isActive })}>
                    <div className="text-sm font-semibold">{area.name}</div>
                    <div className="text-xs text-neutral-500">{cities.find((city) => city.id === area.cityId)?.name}</div>
                  </button>
                  <Button size="icon-sm" variant="danger" onClick={async () => { await locationService.deleteArea(area.id); await loadData(); }}><Trash2 size={14} /></Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'contact' && contactDetails && (
        <Card>
          <CardHeader><h2 className="font-semibold">Contact Details CRUD</h2></CardHeader>
          <CardBody className="space-y-4">
            <textarea value={contactDetails.phones.join('\n')} onChange={(event) => setContactDetails({ ...contactDetails, phones: lines(event.target.value) })} rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
            <textarea value={contactDetails.emails.join('\n')} onChange={(event) => setContactDetails({ ...contactDetails, emails: lines(event.target.value) })} rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
            <textarea value={contactDetails.officeAddress} onChange={(event) => setContactDetails({ ...contactDetails, officeAddress: event.target.value })} rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
            <input value={contactDetails.ctaText} onChange={(event) => setContactDetails({ ...contactDetails, ctaText: event.target.value })} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
            <input value={contactDetails.supportText} onChange={(event) => setContactDetails({ ...contactDetails, supportText: event.target.value })} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
            <Button type="button" onClick={async () => { await companyService.updateContactDetails(contactDetails); setStatus('Contact details updated.'); await loadData(); }}>Save Contact Details</Button>
          </CardBody>
        </Card>
      )}

      {activeTab === 'branding' && branding && (
        <Card>
          <CardHeader><h2 className="font-semibold">Branding CRUD</h2></CardHeader>
          <CardBody className="space-y-4">
            {(['logoPath', 'faviconPath', 'heroPrimaryVideoPath', 'heroSupportingVideoPath'] as const).map((key) => (
              <label key={key} className="block text-sm font-semibold text-neutral-700">
                {key}
                <input value={branding[key]} onChange={(event) => setBranding({ ...branding, [key]: event.target.value })} className="mt-1.5 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm" />
              </label>
            ))}
            <Button type="button" onClick={async () => { await companyService.updateBranding(branding); setStatus('Branding updated.'); await loadData(); }}>Save Branding</Button>
          </CardBody>
        </Card>
      )}

      {activeTab === 'leads' && (
        <Card>
          <CardHeader className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <h2 className="font-semibold">Lead Management</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input value={leadFilter} onChange={(event) => setLeadFilter(event.target.value)} placeholder="Filter leads" className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600" />
              <Button type="button" variant="outline" onClick={exportLeads}><Download size={15} /> Export CSV</Button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-[0.12em] text-neutral-500">
                <tr><th className="px-4 py-3 text-left">Lead</th><th className="px-4 py-3 text-left">Requirement</th><th className="px-4 py-3 text-left">Location</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Message</th></tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-neutral-100 align-top">
                    <td className="px-4 py-3"><div className="font-semibold">{lead.fullName}</div><div className="text-xs text-neutral-500">{lead.phone} · {lead.email}</div></td>
                    <td className="px-4 py-3">{lead.serviceName}<div className="text-xs text-neutral-500">{lead.workType} · {lead.hours} Hours</div></td>
                    <td className="px-4 py-3">{lead.area}, {lead.city}</td>
                    <td className="px-4 py-3">
                      <select value={lead.status} onChange={async (event) => { await leadService.updateLeadStatus(lead.id, event.target.value as LeadStatus); await loadData(); }} className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-xs">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs leading-5 text-neutral-600">{lead.autoMessage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
