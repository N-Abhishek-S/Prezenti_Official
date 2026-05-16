import { motion } from 'framer-motion';
import { MapPin, Network, RadioTower } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { locationAvailability } from '../websiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function LocationSection() {
  return (
    <motion.section
      id="location"
      className="bg-canvas py-14 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div variants={fadeUp} className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <Badge variant="primary" size="lg" className="mb-3">
              Location
            </Badge>
            <h2 className="mb-4 text-2xl font-semibold sm:text-[30px]">{locationAvailability.label}</h2>
            <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
              Do you support multi-location enterprises?
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(10,42,34,0.08)] sm:rounded-[28px]">
            <div className="grid md:grid-cols-[1fr_1.08fr]">
              <div className="border-b border-neutral-100 p-5 sm:p-8 md:border-b-0 md:border-r">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                  <MapPin size={22} />
                </div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Live city</p>
                <h3 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{locationAvailability.city}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                  Multi-location operations with branch-level dashboards, performance benchmarking, centralized compliance management, and location-specific configurations.
                </p>
              </div>

              <div className="p-5 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <RadioTower size={19} className="text-primary-700" />
                  <h3 className="text-base font-semibold">Service zones</h3>
                </div>
                <div className="rounded-xl border border-primary-100 bg-primary-50 p-5">
                  <div className="text-sm font-semibold text-primary-800">{locationAvailability.zone}</div>
                  <div className="mt-2 text-xs text-neutral-500">Regional Offices</div>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-canvas p-5">
                  <Network size={18} className="mt-0.5 shrink-0 text-teal-700" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">Scalable future city architecture</div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                      Multi-location management with site-level configurations, service mapping, and performance benchmarking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
