import { useState } from 'react';
import { Building2, CheckCircle2,  Home, Landmark, ListChecks, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { TalkToExpertModal } from '../inquiry/TalkToExpertModal';
import {
  defaultExpertService,
  defaultServiceSubcategory,
  defaultTimePreference,
  expertServices,
  
  serviceSubcategoryOptions,

  type ExpertServiceConfig,
  type ServiceSubcategory,
} from '../../modules/inquiry/inquiryConfig';
import { cn } from '../../lib/cn';

const subcategoryMeta: Record<ServiceSubcategory, { description: string; Icon: typeof Building2 }> = {
  'Offices / Corporate': {
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
};

const servicesWithCategories = new Set(['housekeeping', 'facility-supervisor']);

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
  const [selectedService, setSelectedService] = useState<ExpertServiceConfig>(defaultExpertService);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ServiceSubcategory>(defaultServiceSubcategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldShowSiteCategorySelection = servicesWithCategories.has(selectedService.id);
  const effectiveSubcategory = shouldShowSiteCategorySelection ? selectedSubcategory : defaultServiceSubcategory;
  const selectedDetails = selectedService.detailsBySubcategory[effectiveSubcategory];
  const ServiceIcon = selectedService.icon;

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
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {expertServices.map((service) => {
                const isSelected = service.id === selectedService.id;
                const Icon = service.icon;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    aria-pressed={isSelected}
                    className={cn(
                      'group flex min-h-30 items-start gap-4 rounded-2xl border p-4 text-left transition',
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

          <div className="rounded-[28px] border border-neutral-200 bg-neutral-50/70 p-4 shadow-[0_28px_86px_rgba(10,42,34,0.08)] sm:p-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white">
                  <ServiceIcon size={22} />
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
                <div className="text-xs font-semibold uppercase leading-5 tracking-[0.16em] r text-success-600 sm:text-right">
                  <span>Full day {"(8 HOURs)"}</span>&ensp;&ensp; <span>&</span>&ensp;&ensp;
                  <span>Half day {"(4 HOURs)"}</span>

                  
                </div>
              </div>
              
            </div>
            {shouldShowSiteCategorySelection && (
              <div className="mt-5">
                <div className="mb-3 text-sm font-semibold text-neutral-900">Select site category</div>
                <div className="grid gap-3 lg:grid-cols-3">
                  {serviceSubcategoryOptions.map((option) => {
                    const isSelected = option === selectedSubcategory;
                    const { Icon, description } = subcategoryMeta[option];

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedSubcategory(option)}
                        aria-pressed={isSelected}
                        className={cn(
                          'rounded-2xl border p-4 text-left transition',
                          isSelected
                            ? 'border-primary-800 bg-primary-50 text-primary-950 shadow-card'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50',
                        )}
                      >
                        <span className="mb-3 flex items-center justify-between gap-3">
                          <span className={cn('inline-flex h-9 w-9 items-center justify-center rounded-xl', isSelected ? 'bg-primary-800 text-white' : 'bg-neutral-100 text-primary-800')}>
                            <Icon size={17} />
                          </span>
                          {isSelected && <CheckCircle2 size={17} className="text-primary-800" />}
                        </span>
                        <span className="block text-sm font-semibold">{option}</span>
                        <span className="mt-2 block text-xs leading-5 text-neutral-500">{description}</span>
                      </button>
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
        initialTimePreference={defaultTimePreference}
      />
    </div>
  );
}
