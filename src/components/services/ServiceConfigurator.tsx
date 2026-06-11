import { useMemo, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Hospital,
  House,
  Landmark,
  Sparkles,
  Utensils,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import {
  serviceSubcategoryOptions,
  type ServiceSubcategory,
} from '../../modules/inquiry/inquiryConfig';
import { usePublicServiceCatalog } from '../../modules/inquiry/usePublicServiceCatalog';
import { cn } from '../../lib/cn';

type SlotOption = 'full-day' | 'half-day';

interface CategoryDetailContent {
  included: string[];
  notIncluded: string[];
}

const roleDescription =
  'Trained housekeeping support for offices, commercial buildings, societies, hospitals, educational institutions, restaurants, and managed facilities.';

const slotOptions: { id: SlotOption; label: string }[] = [
  { id: 'full-day', label: 'FULL DAY (8 HOURS)' },
  { id: 'half-day', label: 'HALF DAY (4 HOURS)' },
];

const subcategoryMeta: Record<ServiceSubcategory, { title?: string; icon: LucideIcon }> = {
  'Offices / Corporate': {
    title: 'Offices / Corporate / Educational Institute',
    icon: Building2,
  },
  'Commercial Buildings': {
    icon: Landmark,
  },
  'Residential Buildings': {
    icon: House,
  },
  'Hospital / Healthcare': {
    icon: Hospital,
  },
  'Cafes / Restaurants': {
    icon: Utensils,
  },
  'Pre Schools': {
    icon: Building2,
  },
};

const categoryDetails: Record<ServiceSubcategory, CategoryDetailContent> = {
  'Offices / Corporate': {
    included: [
      'Workstation Cleaning',
      'Reception Area Cleaning',
      'Meeting Room Cleaning',
      'Pantry Support',
      'Floor Cleaning',
      'Washroom Maintenance',
      'Waste Collection',
      'Common Area Upkeep',
    ],
    notIncluded: ['Pest Control', 'Plumbing Repairs', 'Electrical Repairs', 'Deep Restoration Cleaning'],
  },
  'Commercial Buildings': {
    included: [
      'Lobby Cleaning',
      'Lift Area Cleaning',
      'Staircase Cleaning',
      'Common Area Cleaning',
      'Washroom Maintenance',
      'Waste Collection',
      'Public Area Upkeep',
    ],
    notIncluded: ['Facade Cleaning', 'Rope Access Cleaning', 'Technical Maintenance', 'Pest Control'],
  },
  'Residential Buildings': {
    included: [
      'Lift Area Cleaning',
      'Parking Area Cleaning',
      'Clubhouse Cleaning',
      'Staircase Maintenance',
      'Common Area Upkeep',
      'Waste Collection',
    ],
    notIncluded: ['Apartment Interior Cleaning', 'Deep Home Cleaning', 'Pest Control'],
  },
  'Hospital / Healthcare': {
    included: [
      'Reception Areas',
      'Waiting Areas',
      'General Housekeeping',
      'Public Area Cleaning',
      'Washroom Maintenance',
      'Waste Collection',
    ],
    notIncluded: ['Biomedical Waste Handling', 'Clinical Sanitization', 'Operation Theatre Cleaning'],
  },
  'Cafes / Restaurants': {
    included: [
      'Dining Area Cleaning',
      'Table Cleaning',
      'Floor Maintenance',
      'Washroom Cleaning',
      'Waste Collection',
      'Common Area Upkeep',
    ],
    notIncluded: ['Kitchen Deep Cleaning', 'Grease Removal', 'Pest Control'],
  },
  'Pre Schools': {
    included: [
      'Classroom Cleaning',
      'Play Area Cleaning',
      'Washroom Maintenance',
      'Common Area Upkeep',
      'Waste Collection',
      'Floor Cleaning',
    ],
    notIncluded: ['Child Supervision', 'Teaching Assistance', 'Medical Care', 'Pest Control'],
  },
};

function DetailColumn({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'included' | 'excluded';
}) {
  const isExcluded = tone === 'excluded';
  const Icon = isExcluded ? XCircle : CheckCircle2;

  return (
    <section className="p-1">
      <div className="mb-4 flex items-center gap-2 text-[clamp(0.875rem,1.5vw+0.5rem,1rem)] font-bold text-neutral-950 w-full break-words">
        <span
          className={cn(
            'inline-flex h-7 w-7 items-center justify-center rounded-full',
            isExcluded ? 'bg-red-50 text-red-500' : 'bg-success-50 text-success-600',
          )}
        >
          <Icon size={16} />
        </span>
        {title}
      </div>

      <ul className="space-y-1.5 text-[clamp(0.875rem,1.2vw+0.5rem,0.9375rem)] leading-6 text-neutral-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            {isExcluded ? (
              <XCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
            ) : (
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-600" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CategoryCard({
  option,
  isSelected,
  onSelect,
}: {
  option: ServiceSubcategory;
  isSelected: boolean;
  onSelect: (option: ServiceSubcategory) => void;
}) {
  const { title, icon: CategoryIcon } = subcategoryMeta[option];
  const displayTitle = title ?? option;
  const details = categoryDetails[option];
  const panelId = `site-category-${option.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <article
      className={cn(
        'overflow-hidden rounded-[20px] border border-[#DDE8DD] bg-[#F8FCF7] transition-all duration-300 ease-in-out',
        isSelected && 'shadow-[0_16px_44px_rgba(10,42,34,0.05)]',
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(option)}
        aria-expanded={isSelected}
        aria-controls={panelId}
        className="group flex h-16 lg:h-[72px] w-full items-center gap-5 bg-[#F8FCF7] px-5 py-0 text-left text-neutral-700 transition duration-300 ease-in-out hover:bg-[#F3FAF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20 sm:px-6"
      >
        <span className="inline-flex h-9 w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-[0_8px_20px_rgba(10,42,34,0.06)]">
          <CategoryIcon size={20} strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1 text-[clamp(1.125rem,2vw+0.5rem,1.375rem)] w-full break-words text-wrap-balance font-semibold leading-7 text-neutral-950">
          {displayTitle}
        </span>
        <span className="inline-flex shrink-0 items-center">
          <ChevronDown
            size={20}
            className={cn('text-neutral-900 transition-transform duration-300 ease-in-out', isSelected && 'rotate-180')}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
          isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-[#DDE8DD] bg-white p-5 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-[#E6EEE6]">
              <DetailColumn title="What's Included" items={details.included} tone="included" />
              <div className="lg:pl-7">
                <DetailColumn title="What's Not Included" items={details.notIncluded} tone="excluded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ServiceConfigurator() {
  const { services, isLoading, error } = usePublicServiceCatalog();
  const [selectedSubcategory, setSelectedSubcategory] = useState<ServiceSubcategory | null>('Offices / Corporate');

  const housekeepingService = useMemo(
    () => services.find((service) => /house|keeping/i.test(`${service.id} ${service.name}`)) ?? services[0] ?? null,
    [services],
  );
  const ServiceIcon = housekeepingService?.icon ?? Sparkles;

  if (isLoading) {
    return (
      <div className="mx-auto w-full rounded-[24px] border border-[#E7ECE8] bg-white p-6 shadow-card">
        <div className="h-5 w-36 rounded bg-neutral-100" />
        <div className="mt-4 h-8 max-w-xl rounded bg-neutral-100" />
        <div className="mt-8 grid gap-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-20 rounded-[20px] bg-neutral-100" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !housekeepingService) {
    return (
      <div className="mx-auto w-full rounded-[24px] border border-[#E7ECE8] bg-white p-6 text-center shadow-card">
        <h3 className="text-lg font-semibold text-neutral-950">Services are temporarily unavailable</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-neutral-600">
          Please try again after the catalog is available.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full rounded-[24px] border border-[#E7ECE8] bg-white p-5 shadow-[0_18px_70px_rgba(10,42,34,0.06)] sm:p-6">
      <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="flex items-start gap-5">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white shadow-[0_14px_34px_rgba(18,63,53,0.20)]">
            <ServiceIcon size={25} />
          </span>
          <div className="min-w-0">
            <div className="text-[clamp(0.75rem,1.5vw+0.3rem,0.8125rem)] font-bold uppercase tracking-[0.28em] text-primary-800">Role Details</div>
            <h3 className="mt-3 w-full break-words text-wrap-balance text-[clamp(2.125rem,4vw+1rem,3rem)] font-bold leading-tight text-neutral-950">
              Housekeeping
            </h3>
            <p className="mt-3 w-full max-w-2xl break-words text-[clamp(0.875rem,1.5vw+0.5rem,1rem)] leading-7 text-neutral-600">{roleDescription}</p>
          </div>
        </div>

        <div className="text-sm lg:min-w-[455px] lg:pt-[86px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end">
            <span className="font-semibold text-neutral-950">Slot options :</span>
            <span className="font-bold uppercase tracking-[0.18em] text-success-600">{slotOptions[0].label}</span>
            <span className="font-bold text-primary-800">&amp;</span>
            <span className="font-bold uppercase tracking-[0.18em] text-success-600">{slotOptions[1].label}</span>
          </div>
        </div>
      </section>

      <div className="my-8 h-px bg-[#EAEAEA]" />

      <section>
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[clamp(0.75rem,1.5vw+0.3rem,0.8125rem)] font-bold uppercase tracking-[0.28em] text-primary-800">Site Categories</div>
            <h3 className="mt-3 w-full break-words text-wrap-balance text-[clamp(1.75rem,3vw+1rem,2.25rem)] font-bold leading-tight text-neutral-950">
              Select site category
            </h3>
          </div>
          <p className="w-full max-w-xl text-sm leading-6 text-neutral-600 sm:text-right">
            Open a category to compare what is included and what is not included.
          </p>
        </div>

        <div className="space-y-3">
          {serviceSubcategoryOptions.map((option) => (
            <CategoryCard
              key={option}
              option={option}
              isSelected={option === selectedSubcategory}
              onSelect={(nextOption) =>
                setSelectedSubcategory((currentOption) => (currentOption === nextOption ? null : nextOption))
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
