import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, PhoneCall, RotateCcw, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { StaffingPricingPlan } from './staffingPricingData';

const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

interface PricingCardProps {
  plan: StaffingPricingPlan;
}

export const PricingCard = memo(function PricingCard({ plan }: PricingCardProps) {
  return (
    <article
      className={cn(
        'pricing-card group flex h-full w-full max-w-full min-w-0 snap-start flex-col overflow-hidden rounded-4xl border border-[#E6ECE8] bg-white p-5 shadow-[0_18px_52px_rgba(13,31,26,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(13,31,26,0.12)] md:min-w-85 lg:min-w-0',
        plan.highlighted && 'border-[#0F5C4D]/35 shadow-[0_22px_64px_rgba(15,92,77,0.16)]'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center rounded-full border border-[#D8E5DE] bg-[#F7FAF8] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0F5C4D]">
          {plan.categoryBadge}
        </span>
        {plan.highlighted ? (
          <span className="rounded-full bg-[#0F5C4D] px-3 py-1 text-xs font-bold text-white shadow-[0_10px_24px_rgba(15,92,77,0.24)]">
            Popular
          </span>
        ) : null}
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-extrabold leading-tight text-[#0D1F1A]">{plan.roleName}</h3>
        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#64706C]">
          <Clock3 className="h-4 w-4 text-[#1E7A65]" aria-hidden="true" />
          <span>{plan.shiftTiming}</span>
        </div>
      </div>

      <div className="mt-7 flex items-end gap-2">
        <span className="text-[38px] font-extrabold leading-none tracking-normal text-[#0D1F1A]">
          {rupeeFormatter.format(plan.monthlyPrice)}
        </span>
        <span className="pb-1.5 text-sm font-semibold text-[#64706C]">/month</span>
      </div>

      <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-[22px] border border-[#E6ECE8] bg-[#F7FAF8]">
        <div className="border-r border-[#E6ECE8] p-3">
          <Clock3 className="mb-2 h-4 w-4 text-[#0F5C4D]" aria-hidden="true" />
          <p className="text-[11px] font-bold leading-snug text-[#0D1F1A]">{plan.workingHours}</p>
        </div>
        <div className="border-r border-[#E6ECE8] p-3">
          <ShieldCheck className="mb-2 h-4 w-4 text-[#0F5C4D]" aria-hidden="true" />
          <p className="text-[11px] font-bold leading-snug text-[#0D1F1A]">{plan.availability}</p>
        </div>
        <div className="p-3">
          <RotateCcw className="mb-2 h-4 w-4 text-[#0F5C4D]" aria-hidden="true" />
          <p className="text-[11px] font-bold leading-snug text-[#0D1F1A]">{plan.replacement}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm font-medium leading-relaxed text-[#394843]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E7A65]" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-[22px] border border-[#E6ECE8] bg-[#F7FAF8] p-4 text-sm font-medium leading-relaxed text-[#64706C]">
        {plan.useCase}
      </p>

      <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
        <Link
          to="/contact"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F5C4D] px-5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(15,92,77,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0D4F42] hover:shadow-[0_18px_38px_rgba(15,92,77,0.28)]"
        >
          Request Proposal
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          to="/talk-to-us"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D8E5DE] bg-white px-5 text-sm font-bold text-[#0D1F1A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F5C4D]/40 hover:bg-[#F7FAF8]"
        >
          <PhoneCall className="h-4 w-4 text-[#0F5C4D]" aria-hidden="true" />
          Talk to Expert
        </Link>
      </div>
    </article>
  );
});
