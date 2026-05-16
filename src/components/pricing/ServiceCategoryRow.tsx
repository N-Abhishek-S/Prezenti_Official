import { PricingCard } from './PricingCard';
import type { StaffingCategory } from './staffingPricingData';

interface ServiceCategoryRowProps {
  category: StaffingCategory;
}

export function ServiceCategoryRow({ category }: ServiceCategoryRowProps) {
  return (
    <div>
      {/* Category header */}
      <div className="pricing-reveal mb-6">
        <h3 className="text-2xl font-extrabold text-[#0D1F1A]">{category.name}</h3>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-[#64706C]">
          {category.description}
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {category.plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
