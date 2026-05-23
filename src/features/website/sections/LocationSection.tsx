import { motion, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { useCatalogData } from '../../../hooks/useCatalogData';
import { publicAsset } from '../../../lib/publicAsset';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
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

const locationVideoSrc = publicAsset('/location/AA.webm');

function LocationVideo() {
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-[22px] bg-neutral-100 shadow-[0_18px_50px_rgba(10,42,34,0.14)] ring-1 ring-white/80">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Prezenti city coverage video"
      >
        <source src={locationVideoSrc} type="video/webm" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_46%,rgba(10,42,34,0.14)_100%)]" />
    </div>
  );
}

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center xl:gap-14"
        >
          {/* LEFT CONTENT */}
          <div className="flex min-w-0 max-w-2xl flex-col items-start px-4 text-left sm:px-6 lg:px-8">
            <Badge variant="primary" size="lg" className="mb-4">
              Cities
            </Badge>

            <motion.h1
              variants={scaleIn}
              className="max-w-xl text-balance text-4xl font-extrabold leading-tight text-neutral-950 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.08]"
              style={{ willChange: 'transform' }}
            >
              <span>Pune is just the </span>
              <span className="relative inline-block overflow-hidden align-baseline">
                <span className="bg-linear-to-r from-teal-700 via-cyan-500 to-sky-400 bg-clip-text font-extrabold text-transparent">
                  beginning ...
                </span>

                <motion.span
                  aria-hidden
                  initial={{ x: '-110%' }}
                  animate={{ x: ['-110%', '110%'] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 3.5,
                  }}
                  className="pointer-events-none absolute left-0 top-0 h-full w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)',
                    mixBlendMode: 'screen',
                  }}
                />

                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-[linear-gradient(90deg,rgba(20,143,137,0),rgba(20,143,137,0.7),rgba(77,163,102,0))]"
                  animate={{
                    scaleX: [0.55, 1, 0.55],
                    opacity: [0.45, 0.9, 0.45],
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
              <span> city expansion coming soon.</span>
            </motion.h1>
          </div>

          {/* RIGHT CARD */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(10,42,34,0.08)]">
              <div className="grid md:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
                {/* LEFT INFO PANEL */}
                <div className="border-b border-neutral-100 p-5 sm:p-6 md:border-b-0 md:border-r">
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
                    <p className="mb-2 font-semibold text-neutral-700">
                      Local coverage for
                    </p>

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

                {/* VIDEO */}
                <div className="min-h-[420px] bg-white p-4 sm:p-5">
                  <LocationVideo />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
