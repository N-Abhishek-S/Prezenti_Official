import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PricingCard } from './PricingCard';
import type { StaffingCategory, StaffingCategoryKey } from './staffingPricingData';

interface MobilePricingAccordionProps {
  categories: StaffingCategory[];
}

export function MobilePricingAccordion({ categories }: MobilePricingAccordionProps) {
  const [openId, setOpenId] = useState<StaffingCategoryKey | null>(categories[0]?.id ?? null);

  const toggle = (id: StaffingCategoryKey) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isOpen = openId === category.id;

        return (
          <div
            key={category.id}
            className="overflow-hidden rounded-[24px] border border-[#E6ECE8] bg-white shadow-[0_12px_36px_rgba(13,31,26,0.06)]"
          >
            {/* Accordion trigger */}
            <button
              type="button"
              onClick={() => toggle(category.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <h3 className="text-base font-extrabold text-[#0D1F1A]">{category.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-[#64706C]">
                  {category.plans.length} plan{category.plans.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[#64706C] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Accordion panel */}
            {isOpen && (
              <div className="border-t border-[#E6ECE8] px-4 pb-5 pt-4">
                <p className="mb-4 text-sm font-medium leading-relaxed text-[#64706C]">
                  {category.description}
                </p>
                <div className="grid gap-4">
                  {category.plans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
