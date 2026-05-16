import { BadgeCheck, CheckCircle2, Clock, Timer } from 'lucide-react';
import type { StaffingPlan } from './staffingPricingData';

interface PricingCardProps {
  plan: StaffingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN').format(plan.monthlyPrice);

  return (
    <div
      className={`pricing-card relative flex flex-col overflow-hidden rounded-[28px] border bg-white shadow-[0_14px_40px_rgba(13,31,26,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(13,31,26,0.10)] ${
        plan.isPopular
          ? 'border-[#0F5C4D]/30 ring-1 ring-[#0F5C4D]/10'
          : 'border-[#E6ECE8]'
      }`}
    >
      {/* Popular badge */}
      {plan.isPopular && (
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#0F5C4D] px-3 py-1 text-xs font-bold text-white shadow-[0_8px_20px_rgba(15,92,77,0.24)]">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Popular
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[#E6ECE8] px-6 pb-6 pt-6">
        <h4 className="text-lg font-extrabold text-[#0D1F1A]">{plan.name}</h4>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-sm font-bold text-[#64706C]">₹</span>
          <span className="text-[2rem] font-extrabold leading-none tracking-tight text-[#0D1F1A]">
            {formattedPrice}
          </span>
          <span className="text-sm font-medium text-[#64706C]">/month</span>
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7FAF8] px-3 py-1.5 text-xs font-bold text-[#0D1F1A]">
            <Clock className="h-3.5 w-3.5 text-[#1E7A65]" aria-hidden="true" />
            {plan.shiftTiming}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7FAF8] px-3 py-1.5 text-xs font-bold text-[#0D1F1A]">
            <Timer className="h-3.5 w-3.5 text-[#1E7A65]" aria-hidden="true" />
            {plan.workingHours}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-1 flex-col gap-3 px-6 py-5">
        {plan.features.map((feature) => (
          <li
            key={feature.id}
            className={`flex items-start gap-2.5 text-sm leading-relaxed ${
              feature.isHighlighted ? 'font-bold text-[#0D1F1A]' : 'font-medium text-[#64706C]'
            }`}
          >
            <CheckCircle2
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                feature.isHighlighted ? 'text-[#1E7A65]' : 'text-[#B6C4BD]'
              }`}
              aria-hidden="true"
            />
            {feature.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
