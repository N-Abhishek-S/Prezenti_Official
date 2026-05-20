import { motion, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { useCatalogData } from '../../../hooks/useCatalogData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 18,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
    },
  },
};

export function LocationSection() {
  const { cities } = useCatalogData();
  const activeCity = cities.find((city) => city.isActive) ?? cities[0];

  return (
    <motion.section
      id="location"
      className="bg-canvas py-14 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        {/* Two-col on lg+: heading left, card right. Stacked on mobile. */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-10 lg:ml-44 lg:flex-row lg:items-start lg:gap-12"
        >
          {/* ── Left: heading block ─────────────────────────── */}
          <div className="flex-shrink-0 lg:w-[42%] xl:w-[40%]">
            <Badge variant="primary" size="lg" className="mb-3">
              Cities
            </Badge>

            <motion.h1
              variants={scaleIn}
              className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight text-neutral-950 sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl 2xl:text-6xl"
              style={{ willChange: 'transform' }}
            >
              <span className="mr-2 inline-block">Pune is just the</span>

              {/* highlighted 'beginning' with subtle shimmer */}
              <span className="relative mr-2 inline-block overflow-hidden">
                <span className="bg-linear-to-r from-teal-700 via-cyan-500 to-sky-400 bg-clip-text font-extrabold text-transparent">
                  beginning ...
                </span>
                <motion.span
                  aria-hidden
                  initial={{ x: '-110%' }}
                  animate={{ x: ['-110%', '110%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', repeatDelay: 3.5 }}
                  className="pointer-events-none absolute left-0 top-0 h-full w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)',
                    mixBlendMode: 'screen',
                    transformOrigin: 'center',
                  }}
                />
              </span>

              <br />

              <span className="mr-2 inline-block">city</span>

              {/* highlighted 'expansion' with slower shimmer */}
              <span className="relative mr-2 inline-block overflow-hidden">
                <span className="bg-linear-to-r from-cyan-600 via-sky-500 to-indigo-400 bg-clip-text font-extrabold text-transparent">
                  expansion
                </span>
                <motion.span
                  aria-hidden
                  initial={{ x: '-90%' }}
                  animate={{ x: ['-90%', '90%'] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'linear', repeatDelay: 5.5 }}
                  className="pointer-events-none absolute left-0 top-0 h-full w-full"
                  style={{
                    background:
                      'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,0) 100%)',
                    mixBlendMode: 'screen',
                    transformOrigin: 'center',
                  }}
                />
              </span>

              <span className="inline-block">coming soon.</span>

              {/* animated bolt */}
              <motion.span
                aria-hidden
                initial={{ scale: 0.96, opacity: 0.95 }}
                animate={{ scale: [1, 1.04, 1], opacity: [0.95, 1, 0.98] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(255,230,120,0.12), rgba(255,200,40,0.02) 40%, transparent 60%)',
                  boxShadow: '0 6px 22px rgba(14,165,165,0.05)',
                }}
              >
                <span className="text-xl leading-none">⚡</span>
              </motion.span>
            </motion.h1>
          </div>

          {/* ── Right: card ─────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(10,42,34,0.08)] sm:rounded-[28px]">
              {/* Card inner: sidebar + zones. Stack on mobile, side-by-side on md+ */}
              <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[200px_1fr] xl:grid-cols-[230px_1fr]">

                {/* City sidebar */}
                <div className="w-full border-b  border-neutral-100 p-5 sm:p-6 md:border-b-0 md:border-r md:p-6 lg:w-80 lg:p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                    <MapPin size={20} />
                  </div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Live city
                  </p>
                  <h3 className="text-xl font-semibold text-neutral-950 sm:text-2xl">
                    {activeCity?.name ?? 'Pune'}
                  </h3>

                  <div className="mt-5 w-full text-sm leading-relaxed text-neutral-500">
                    <p className="mb-2 font-semibold text-neutral-700">Local coverage for</p>
                    <ul className="ml-4 list-inside list-disc space-y-1">
                      <li>All size Offices</li>
                      <li>Clinics / Consultants / Startups</li>
                      <li>Schools / Colleges</li>
                      <li>Educational Institutions</li>
                      <li>Commercial buildings</li>
                      <li>Residential Properties</li>
                      <li>Managed properties</li>
                      <li>All size hospitals</li>
                    </ul>
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
