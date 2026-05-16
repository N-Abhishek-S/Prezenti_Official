import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { PricingCard } from './PricingCard';
import type { StaffingCategoryKey, StaffingPricingCategory } from './staffingPricingData';

interface MobilePricingAccordionProps {
  categories: readonly StaffingPricingCategory[];
}

export const MobilePricingAccordion = memo(function MobilePricingAccordion({ categories }: MobilePricingAccordionProps) {
  const [openCategoryId, setOpenCategoryId] = useState<StaffingCategoryKey>(categories[0]?.id ?? 'officeSupport');

  return (
    <div className="mx-auto w-full max-w-88 space-y-4 overflow-hidden">
      {categories.map((category) => {
        const Icon = category.icon;
        const isOpen = category.id === openCategoryId;
        const panelId = `pricing-category-${category.id}`;

        return (
          <section key={category.id} className="pricing-reveal w-full max-w-full overflow-hidden rounded-[28px] border border-[#E6ECE8] bg-white shadow-[0_14px_36px_rgba(13,31,26,0.07)]">
            <button
              type="button"
              className="flex w-full items-center gap-4 p-4 text-left"
              onClick={() => setOpenCategoryId(category.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', isOpen ? 'bg-[#0F5C4D] text-white' : 'bg-[#F7FAF8] text-[#0F5C4D]')}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-extrabold text-[#0D1F1A]">{category.label}</span>
                <span className="mt-1 block text-sm font-medium leading-snug text-[#64706C]">{category.description}</span>
              </span>
              <ChevronDown className={cn('h-5 w-5 shrink-0 text-[#64706C] transition-transform duration-300', isOpen && 'rotate-180 text-[#0F5C4D]')} aria-hidden="true" />
            </button>

            {isOpen ? (
              <div id={panelId} className="space-y-4 border-t border-[#E6ECE8] p-4">
                {category.plans.map((plan) => (
                  <PricingCard key={plan.id} plan={plan} />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
});
