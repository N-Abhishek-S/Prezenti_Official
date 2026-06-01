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
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-neutral-100">
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

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_58%,rgba(10,42,34,0.08)_100%)]" />
    </div>
  );
}

export function LocationSection() {
  const { cities } = useCatalogData();
  const activeCity = cities.find((city) => city.isActive) ?? cities[0];

  return (
    <motion.section
      id="location"
      className="bg-[#F3F6F5] py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-375 px-6 sm:px-8">
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[0.95fr_1.1fr] xl:gap-14"
        >
<div className="flex min-w-0 max-w-155 flex-col items-start text-left pl-8 sm:pl-12 lg:pl-16 xl:pl-20 xl:max-w-160">  <Badge variant="primary" size="lg" className="mb-6 rounded-full px-5 py-2">
    Cities
  </Badge>

  <motion.h2
    variants={scaleIn}
    className="max-w-155 text-balance font-black leading-[0.92] tracking-[-0.04em] text-neutral-950 text-4xl sm:text-5xl lg:text-6xl xl:text-[72px]"
    style={{ willChange: 'transform' }}
  >
    <span className="block">Pune is just the</span>

    <span className="relative inline-block overflow-hidden align-baseline">
      <span className="bg-linear-to-r from-teal-700 via-cyan-500 to-sky-400 bg-clip-text text-transparent">
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
        className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 rounded-full bg-[linear-gradient(90deg,rgba(20,143,137,0),rgba(20,143,137,0.7),rgba(77,163,102,0))]"
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

    <span className="block">city expansion</span>
    <span className="block">coming soon.</span>
  </motion.h2>
</div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.55fr]">
                <div className="border-b border-neutral-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-neutral-100">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                    <MapPin size={21} />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                    Live city
                  </p>

                  <h3 className="text-2xl font-semibold leading-tight text-neutral-950">
                    {activeCity?.name ?? 'Pune'}
                  </h3>

                  <div className="mt-8 w-full text-sm leading-relaxed text-neutral-500">
                    <p className="mb-3 font-semibold text-neutral-800">
                      Local coverage for
                    </p>

                    <ul className="list-inside list-disc space-y-1.5">
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

           <div className="min-w-0 bg-neutral-50 p-4 lg:p-5">
  <div className="h-full min-h-105 w-full">
    <LocationVideo />
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
