import type { StaffingCategory, StaffingCategoryKey } from './staffingPricingData';

interface CategorySidebarProps {
  categories: StaffingCategory[];
  activeCategoryId: StaffingCategoryKey;
  onCategoryChange: (id: StaffingCategoryKey) => void;
  compact?: boolean;
  className?: string;
}

export function CategorySidebar({
  categories,
  activeCategoryId,
  onCategoryChange,
  compact = false,
  className = '',
}: CategorySidebarProps) {
  return (
    <nav className={`${className}`} aria-label="Service categories">
      <div
        className={`grid gap-2 ${
          compact
            ? 'grid-cols-3 sm:grid-cols-3'
            : 'rounded-[24px] border border-[#E6ECE8] bg-[#F7FAF8] p-3 shadow-[0_12px_36px_rgba(13,31,26,0.06)]'
        }`}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              aria-pressed={isActive}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-[#0F5C4D] text-white shadow-[0_10px_28px_rgba(15,92,77,0.22)]'
                  : 'bg-white text-[#0D1F1A] hover:bg-[#EEF5F1]'
              } ${compact ? 'text-center' : ''}`}
            >
              <span className="block truncate">{category.name}</span>
              {!compact && (
                <span
                  className={`mt-1 block truncate text-xs font-medium ${
                    isActive ? 'text-white/70' : 'text-[#64706C]'
                  }`}
                >
                  {category.plans.length} plan{category.plans.length !== 1 ? 's' : ''}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
