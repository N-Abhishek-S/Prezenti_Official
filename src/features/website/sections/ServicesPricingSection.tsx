import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, ConciergeBell, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { scrollToSection } from '../../../lib/sectionNavigation';
import {
  serviceConfiguratorItems,
  serviceSummaryItems,
  type ServiceType,
  type StaffingMode,
} from '../websiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const serviceIcons = {
  Housekeeping: Sparkles,
  Pantry: ConciergeBell,
  Receptionist: UserRoundCheck,
  Security: ShieldCheck,
  'Office Boy': BriefcaseBusiness,
  'Facility Manager': BadgeCheck,
} satisfies Record<ServiceType, ComponentType<{ size?: number; className?: string }>>;

const staffingModes: StaffingMode[] = ['Full Time', 'Half Time'];

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{title}</h4>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary-600" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesPricingSection() {
  const [activeServiceType, setActiveServiceType] = useState<ServiceType>('Housekeeping');
  const [staffingMode, setStaffingMode] = useState<StaffingMode>('Full Time');

  const activeService = useMemo(
    () => serviceConfiguratorItems.find((service) => service.type === activeServiceType) ?? serviceConfiguratorItems[0],
    [activeServiceType],
  );
  const ActiveIcon = serviceIcons[activeService.type];
  const coverage = activeService.coverage[staffingMode] ?? [];

  return (
    <>
      <motion.section
        id="services"
        className="bg-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-[760px] text-center">
            <Badge variant="primary" size="lg" className="mb-3">
              Services
            </Badge>
            <h2 className="mb-4 text-[30px] font-semibold">Enterprise-Grade Facility Services</h2>
            <p className="text-lg leading-relaxed text-neutral-500">
              Comprehensive managed services backed by technology, SLA guarantees, and compliance frameworks.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-px overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSummaryItems.map((service) => {
              const Icon = serviceIcons[service.title as ServiceType];

              return (
                <button
                  key={service.title}
                  type="button"
                  className="group bg-white p-6 text-left transition-colors duration-200 hover:bg-primary-50/60"
                  onClick={() => {
                    setActiveServiceType(service.title as ServiceType);
                    scrollToSection('pricing');
                  }}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-800 transition-colors duration-200 group-hover:bg-primary-800 group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-neutral-950">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{service.description}</p>
                </button>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="pricing"
        className="bg-canvas py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp} className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <Badge variant="teal" size="lg" className="mb-3">
                Pricing
              </Badge>
              <h2 className="text-[30px] font-semibold">Service Packages Built Around Your Site</h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-500 lg:justify-self-end">
              Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Step 1 - Choose service type</h3>
                <div className="grid gap-2">
                  {serviceConfiguratorItems.map((service) => {
                    const Icon = serviceIcons[service.type];
                    const isActive = activeServiceType === service.type;

                    return (
                      <button
                        key={service.type}
                        type="button"
                        onClick={() => setActiveServiceType(service.type)}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'border-primary-800 bg-primary-800 text-white shadow-[0_16px_34px_rgba(18,63,53,0.18)]'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50'
                        }`}
                        aria-pressed={isActive}
                      >
                        <Icon size={18} className={isActive ? 'text-white' : 'text-primary-700'} />
                        {service.type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Step 2 - Choose staffing mode</h3>
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-white p-1 shadow-card">
                  {staffingModes.map((mode) => {
                    const isActive = staffingMode === mode;

                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setStaffingMode(mode)}
                        className={`rounded-md px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                          isActive ? 'bg-primary-800 text-white shadow-sm' : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-800'
                        }`}
                        aria-pressed={isActive}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(10,42,34,0.08)]">
              <div className="border-b border-neutral-100 bg-[linear-gradient(135deg,rgba(224,242,229,0.7),rgba(237,250,249,0.55))] p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-800 text-white">
                  <ActiveIcon size={24} />
                </div>
                <Badge variant="primary" className="mb-4">
                  {staffingMode}
                </Badge>
                <h3 className="mb-3 text-3xl font-semibold tracking-tight text-neutral-950">{activeService.title}</h3>
                <p className="max-w-2xl text-base leading-relaxed text-neutral-600">{activeService.description}</p>
              </div>

              <div className="grid gap-8 p-8 md:grid-cols-2">
                <DetailList title="Included Responsibilities" items={activeService.responsibilities} />
                <DetailList title="Deliverables" items={activeService.deliverables} />
                <DetailList title="Scope" items={activeService.scope} />
                <DetailList title="Service Coverage" items={coverage} />
              </div>

              <div className="border-t border-neutral-100 px-8 py-6">
                <Button type="button" variant="primary" size="lg" onClick={() => scrollToSection('contact')}>
                  Request Proposal
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
