import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { CategorySidebar } from './CategorySidebar';
import { MobilePricingAccordion } from './MobilePricingAccordion';
import { ServiceCategoryRow } from './ServiceCategoryRow';
import { staffingPricingCategories, type StaffingCategoryKey } from './staffingPricingData';

const TRUST_POINTS = ['Police verified staff', 'Supervisor monitoring', 'Backup replacement support'];
export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const categories = useMemo(() => staffingPricingCategories, []);
  const [activeCategoryId, setActiveCategoryId] = useState<StaffingCategoryKey>('officeSupport');
  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-reveal',
        { opacity: 0.92, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.05, clearProps: 'opacity,transform' }
      );
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0.94, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.04, delay: 0.08, clearProps: 'opacity,transform' }
      );
    }, root);

    return () => ctx.revert();
  }, [activeCategoryId]);

  return (
    <section ref={sectionRef} className="overflow-x-hidden bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="pricing-reveal mx-auto max-w-88 text-center sm:max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E5DE] bg-white px-4 py-2 text-sm font-bold text-[#0F5C4D] shadow-[0_10px_28px_rgba(13,31,26,0.06)]">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Managed Workforce Solutions
          </div>
          <h2 className="mt-6 max-w-full text-[2rem] font-extrabold leading-[1.08] tracking-normal text-[#0D1F1A] sm:text-5xl sm:leading-[1.05] lg:text-6xl">
            Transparent Pricing for Professional Support Staff
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#64706C]">
            Reliable, trained, and verified manpower solutions for offices, residential buildings, hospitals, educational institutions, and commercial facilities.
          </p>
        </div>

        <div className="pricing-reveal mx-auto mt-10 grid w-full max-w-88 gap-3 rounded-[28px] border border-[#E6ECE8] bg-[#F7FAF8] p-3 shadow-[0_16px_42px_rgba(13,31,26,0.06)] sm:max-w-4xl sm:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#0D1F1A]">
              <BadgeCheck className="h-4 w-4 text-[#1E7A65]" aria-hidden="true" />
              {point}
            </div>
          ))}
        </div>

        <div className="mt-14 hidden md:block">
          <div className="mb-6 lg:hidden">
            <CategorySidebar
              compact
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={setActiveCategoryId}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <CategorySidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={setActiveCategoryId}
              className="hidden lg:sticky lg:top-24 lg:block"
            />
            <ServiceCategoryRow category={activeCategory} />
          </div>
        </div>

        <div className="mt-12 md:hidden">
          <MobilePricingAccordion categories={categories} />
        </div>

        <div className="pricing-reveal mt-14 overflow-hidden rounded-4xl border border-[#E6ECE8] bg-white p-6 shadow-[0_18px_52px_rgba(13,31,26,0.08)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7FAF8] text-[#0F5C4D]">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-2xl font-extrabold text-[#0D1F1A]">Need staffing across multiple sites?</h3>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-[#64706C]">
                Build a custom proposal for mixed roles, rotational shifts, supervisor layers, and replacement SLAs across offices, societies, schools, hospitals, and commercial buildings.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:min-w-90">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F5C4D] px-5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(15,92,77,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0D4F42]"
            >
              Request Proposal
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/talk-to-us"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D8E5DE] bg-white px-5 text-sm font-bold text-[#0D1F1A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F5C4D]/40 hover:bg-[#F7FAF8]"
            >
              <MessageCircle className="h-4 w-4 text-[#0F5C4D]" aria-hidden="true" />
              Talk to Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
