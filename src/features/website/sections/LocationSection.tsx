import { motion } from 'framer-motion';
import { MapPin, Network, RadioTower } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { useCatalogData } from '../../../hooks/useCatalogData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function LocationSection() {
  const { cities, areas } = useCatalogData();
  const activeCity = cities.find((city) => city.isActive) ?? cities[0];
  const activeAreas = areas.filter((area) => area.isActive && area.cityId === activeCity?.id);

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
              Cities
            </Badge>
            <h2 className="mb-4 text-2xl font-semibold sm:text-[30px]">{activeCity?.name ?? 'Pune'} availability</h2>
            <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
              We currently serve the Pune ecosystem with local staffing teams and site-aware deployment.
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(10,42,34,0.08)] sm:rounded-[28px]">
            <div className="grid md:grid-cols-[1fr_1.08fr]">
              <div className="border-b border-neutral-100 p-5 sm:p-8 md:border-b-0 md:border-r">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                  <MapPin size={22} />
                </div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Live city</p>
                <h3 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{activeCity?.name ?? 'Pune'}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                  Local coverage for offices, societies, clinics, schools, commercial buildings, and managed properties across key Pune zones.
                </p>
              </div>

              <div className="p-5 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <RadioTower size={19} className="text-primary-700" />
                  <h3 className="text-base font-semibold">Service zones</h3>
                </div>
                <div className="grid max-h-72 gap-2 overflow-y-auto rounded-xl border border-primary-100 bg-primary-50 p-4 sm:grid-cols-2">
                  {activeAreas.map((area) => (
                    <div key={area.id} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-primary-800 shadow-card">
                      {area.name}
                    </div>
                  ))}
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
