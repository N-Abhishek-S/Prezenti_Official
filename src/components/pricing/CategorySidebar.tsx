import { memo } from 'react';
import { cn } from '../../lib/cn';
import type { StaffingCategoryKey, StaffingPricingCategory } from './staffingPricingData';

interface CategorySidebarProps {
  categories: readonly StaffingPricingCategory[];
  activeCategoryId: StaffingCategoryKey;
  onCategoryChange: (id: StaffingCategoryKey) => void;
  className?: string;
  compact?: boolean;
}

export const CategorySidebar = memo(function CategorySidebar({
  categories,
  activeCategoryId,
  onCategoryChange,
  className,
  compact = false,
}: CategorySidebarProps) {
  return (
    <nav
      aria-label="Workforce categories"
      className={cn(
        'pricing-reveal rounded-4xl border border-[#E6ECE8] bg-white p-2 shadow-[0_18px_52px_rgba(13,31,26,0.07)]',
        compact && 'overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      <div className={cn('grid gap-2', compact && 'grid-flow-col auto-cols-[260px] lg:grid-flow-row lg:auto-cols-auto')}>
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'group flex w-full items-start gap-4 rounded-3xl border p-4 text-left transition-all duration-300',
                isActive
                  ? 'border-[#CFE1D8] bg-[#F7FAF8] shadow-[0_12px_28px_rgba(15,92,77,0.08)]'
                  : 'border-transparent bg-white hover:border-[#E6ECE8] hover:bg-[#F7FAF8]'
              )}
              aria-pressed={isActive}
            >
              <span
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300',
                  isActive ? 'bg-[#0F5C4D] text-white' : 'bg-[#F7FAF8] text-[#0F5C4D] group-hover:bg-[#EAF3EF]'
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-extrabold text-[#0D1F1A]">{category.label}</span>
                <span className="mt-1 block text-sm font-medium leading-relaxed text-[#64706C]">{category.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});
