import { useEffect, useState } from 'react';
import { Building2, CheckCircle2, Home, Hospital, Landmark, ListChecks, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { TalkToExpertModal } from '../inquiry/TalkToExpertModal';
import {
  defaultServiceSubcategory,
  serviceSubcategoryOptions,

  type ServiceSubcategory,
} from '../../modules/inquiry/inquiryConfig';
import { usePublicServiceCatalog } from '../../modules/inquiry/usePublicServiceCatalog';
import { cn } from '../../lib/cn';

const subcategoryMeta: Record<ServiceSubcategory, { description: string; Icon: typeof Building2; title?: string }> = {
  'Offices / Corporate': {
    title: 'Offices / Corporate / Educational Institute',
    description: 'Daily workplace support for offices, startups, clinics, consultants, and corporate floors.',
    Icon: Building2,
  },
  'Commercial Buildings': {
    description: 'Common-area and tenant-facing support for commercial towers, complexes, and managed sites.',
    Icon: Landmark,
  },
  'Residential Buildings': {
    description: 'Society and residential-property staffing for towers, gated communities, and apartments.',
    Icon: Home,
  },
  'Hospital / Healthcare': {
    description: 'Hospitals, clinics, diagnostic centers, nursing homes, and healthcare facilities.',
    Icon: Hospital,
  },
};

const servicesWithCategories = new Set(['housekeeping', 'facility-supervisor']);

function SiteCategoryButton({
  option,
  isSelected,
  onSelect,
  variant,
}: {
  option: ServiceSubcategory;
  isSelected: boolean;
  onSelect: (option: ServiceSubcategory) => void;
  variant: 'compact' | 'card';
}) {
  const { Icon, description, title } = subcategoryMeta[option];
  const displayTitle = title ?? option;

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => onSelect(option)}
        aria-label={displayTitle}
        aria-pressed={isSelected}
        className={cn(
          'flex min-h-[5.75rem] w-full items-start gap-2.5 rounded-2xl border p-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20',
          isSelected
            ? 'border-primary-800 bg-primary-50 text-primary-950 shadow-card'
            : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-primary-200 hover:bg-primary-50',
        )}
      >
        <span className={cn('mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl', isSelected ? 'bg-primary-800 text-white' : 'bg-neutral-100 text-primary-800')}>
          <Icon size={14} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="block text-sm font-semibold leading-5">{displayTitle}</span>
            {isSelected && <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary-800" />}
          </span>
          <span className="mt-0.5 block text-xs leading-4 text-neutral-500">{description}</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      aria-label={displayTitle}
      aria-pressed={isSelected}
      className={cn(
        'flex h-full min-h-[8rem] w-full min-w-0 items-start gap-3 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20',
        isSelected
          ? 'border-primary-800 bg-primary-50 text-primary-950 shadow-card'
          : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50',
      )}
    >
      <span className={cn('mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', isSelected ? 'bg-primary-800 text-white' : 'bg-neutral-100 text-primary-800')}>
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="block max-w-[22rem] text-sm font-semibold leading-5">{displayTitle}</span>
          {isSelected && <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary-800" />}
        </span>
        <span className="mt-1.5 block max-w-[24rem] text-xs leading-5 text-neutral-500">{description}</span>
      </span>
    </button>
  );
}

function DetailList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'included' | 'excluded';
}) {
  const isIncluded = tone === 'included';
  const Icon = isIncluded ? ListChecks : XCircle;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-neutral-900">
        <span
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-xl',
            isIncluded ? 'bg-success-50 text-success-600' : 'bg-neutral-100 text-neutral-500',
          )}
        >
          <Icon size={16} />
        </span>
        {title}
      </div>

      <ul className="space-y-2 text-sm leading-6 text-neutral-600">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={cn(
              'rounded-xl border px-4 py-3',
              isIncluded ? 'border-success-100 bg-success-50/80' : 'border-neutral-200 bg-neutral-50',
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceConfigurator() {
  const { services, isLoading, error } = usePublicServiceCatalog();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<ServiceSubcategory>(defaultServiceSubcategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedService = services.find((service) => service.id === selectedServiceId) ?? services[0] ?? null;

  useEffect(() => {
    if (!services.length) return;

    setSelectedServiceId((current) => (
      services.some((service) => service.id === current) ? current : services[0].id
    ));
  }, [services]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-card">
        <div className="h-5 w-36 rounded bg-neutral-100" />
        <div className="mt-4 h-8 max-w-xl rounded bg-neutral-100" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-24 rounded-lg bg-neutral-100" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !selectedService) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center shadow-card">
        <h3 className="text-lg font-semibold text-neutral-950">Services are temporarily unavailable</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-neutral-600">
          Please try again after the catalog is available.
        </p>
      </div>
    );
  }

  const shouldShowSiteCategorySelection = servicesWithCategories.has(selectedService.id)
    || /house|keeping|facility|supervisor/i.test(`${selectedService.id} ${selectedService.name}`);
  const effectiveSubcategory = shouldShowSiteCategorySelection ? selectedSubcategory : defaultServiceSubcategory;
  const selectedDetails = selectedService.detailsBySubcategory[effectiveSubcategory] ?? selectedService.detailsBySubcategory[defaultServiceSubcategory];
  const ServiceIcon = selectedService.icon;
  const unselectedServices = services.filter((service) => service.id !== selectedService.id);

  return (
    <div className="overflow-hidden rounded-[30px] border border-neutral-200 bg-white shadow-[0_32px_100px_rgba(10,42,34,0.08)]">
      <div className="border-b border-neutral-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(237,250,249,0.72))] p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Service planner</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Choose the exact staffing scope for your site.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
              Select a service, choose the property context, compare coverage, and send one clean inquiry to the Prezenti team.
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-xl px-6 py-3 font-semibold shadow-[0_18px_45px_rgba(18,63,53,0.22)] sm:w-auto"
          >
            Talk to Expert
          </Button>
        </div>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-3 text-sm font-semibold text-neutral-900">Select service</div>
            <div className="block md:hidden">
              <button
                type="button"
                onClick={() => setSelectedServiceId(selectedService.id)}
                aria-pressed
                className="group flex min-h-30 items-start gap-4 rounded-2xl border border-primary-800 bg-primary-50 p-4 text-left shadow-card transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20"
              >
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white transition">
                  {ServiceIcon && <ServiceIcon size={20} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-neutral-950">{selectedService.name}</span>
                    <CheckCircle2 size={18} className="shrink-0 text-primary-800" />
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-neutral-600">{selectedService.description}</span>
                </span>
              </button>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {unselectedServices.map((service) => {
                  const Icon = service.icon;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      aria-pressed={false}
                      className="group flex min-h-12 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-left text-neutral-700 transition hover:border-primary-200 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-primary-800 transition group-hover:bg-primary-100">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 text-sm font-semibold leading-5 text-neutral-950">{service.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {services.map((service) => {
                  const isSelected = service.id === selectedService.id;
                  const Icon = service.icon;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        'group flex min-h-30 items-start gap-4 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20',
                        isSelected
                          ? 'border-primary-800 bg-primary-50 shadow-card'
                          : 'border-neutral-200 bg-white hover:border-primary-200 hover:bg-primary-50',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition',
                          isSelected ? 'bg-primary-800 text-white' : 'bg-neutral-100 text-primary-800 group-hover:bg-primary-100',
                        )}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-base font-semibold text-neutral-950">{service.name}</span>
                          {isSelected && <CheckCircle2 size={18} className="shrink-0 text-primary-800" />}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-neutral-600">{service.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 block rounded-[28px] border border-neutral-200 bg-neutral-50/70 p-4 shadow-[0_28px_86px_rgba(10,42,34,0.08)] md:hidden">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white">
                    {ServiceIcon && <ServiceIcon size={22} />}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Role details</div>
                    <h3 className="mt-2 text-2xl font-semibold text-neutral-950">{selectedService.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{selectedService.description}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-semibold text-neutral-900">Slot options :</div>
                    <div className="text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-success-600 sm:text-right">
                      <span>Full day {"(8 HOURs)"}</span>&ensp;&ensp; <span>&</span>&ensp;&ensp;
                      <span>Half day {"(4 HOURs)"}</span>
                    </div>
                  </div>

                  {shouldShowSiteCategorySelection && (
                    <div className="mt-3">
                      <div className="mb-2 text-sm font-semibold text-neutral-900">Select site category</div>
                      <div className="grid auto-rows-fr gap-2">
                        {serviceSubcategoryOptions.map((option) => {
                          const isSelected = option === selectedSubcategory;

                          return (
                            <SiteCategoryButton
                              key={option}
                              option={option}
                              isSelected={isSelected}
                              onSelect={setSelectedSubcategory}
                              variant="compact"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:hidden">
              <DetailList title="What's included" items={selectedDetails.included} tone="included" />
              <DetailList title="What's not included" items={selectedDetails.notIncluded} tone="excluded" />
            </div>
          </div>

          <div className="hidden rounded-[28px] border border-neutral-200 bg-neutral-50/70 p-4 shadow-[0_28px_86px_rgba(10,42,34,0.08)] sm:p-6 md:block">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white">
                  {ServiceIcon && <ServiceIcon size={22} />}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Role details</div>
                  <h3 className="mt-2 text-2xl font-semibold text-neutral-950">{selectedService.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{selectedService.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-neutral-900">Slot options :</div>
                <div className="text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-success-600 sm:text-right">
                  <span>Full day {"(8 HOURs)"}</span>&ensp;&ensp; <span>&</span>&ensp;&ensp;
                  <span>Half day {"(4 HOURs)"}</span>

                  
                </div>
              </div>
              
            </div>
            {shouldShowSiteCategorySelection && (
              <div className="mt-5">
                <div className="mb-3 text-sm font-semibold text-neutral-900">Select site category</div>
                <div className="grid auto-rows-fr gap-3 md:grid-cols-[repeat(2,minmax(260px,1fr))]">
                  {serviceSubcategoryOptions.map((option) => {
                    const isSelected = option === selectedSubcategory;

                    return (
                      <SiteCategoryButton
                        key={option}
                        option={option}
                        isSelected={isSelected}
                        onSelect={setSelectedSubcategory}
                        variant="card"
                      />
                    );
                  })}
                </div>
              </div>
            )}



            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailList title="What's included" items={selectedDetails.included} tone="included" />
              <DetailList title="What's not included" items={selectedDetails.notIncluded} tone="excluded" />
            </div>
          </div>
        </div>
      </div>

      <TalkToExpertModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialServices={[selectedService.name]}
      />
    </div>
  );
}
