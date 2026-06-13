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
    <div className="w-full h-full flex items-center justify-center">
      <video
        className="block w-full h-full object-contain object-center"
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
      className="bg-[#F3F6F5] py-10 lg:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="desktop-container">
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-8 xl:gap-10"
        >
          <div className="flex min-w-0 max-w-full flex-col justify-center items-center text-center lg:items-start lg:text-left lg:pl-0 xl:pl-4 mb-2 lg:mb-0">
            <Badge
              variant="primary"
              size="lg"
              className="mb-6 rounded-full px-5 py-2"
            >
              Cities
            </Badge>

            <motion.h2
              variants={scaleIn}
              className="w-full text-[clamp(2rem,3.5vw+0.5rem,3rem)] font-black leading-[1.1] tracking-[-0.04em] text-neutral-950"
              style={{ willChange: 'transform' }}
            >
              Pune is just the{' '}
              <span className="relative inline-block overflow-visible align-baseline">
                <span className="bg-linear-to-r from-teal-700 via-cyan-500 to-sky-400 bg-clip-text text-transparent">
                  beginning...
                </span>
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 rounded-full bg-[linear-gradient(90deg,rgba(20,143,137,0),rgba(20,143,137,0.7),rgba(77,163,102,0))]"
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
              </span>{' '}
              city expansion coming soon.
            </motion.h2>
          </div>

          <div className="flex min-w-0 items-center justify-center">
            <div className="w-full overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] sm:rounded-[32px]">
              <div className="grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] lg:grid-cols-[0.42fr_0.58fr]">
                <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left border-b border-neutral-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-neutral-100 lg:p-8 xl:p-8">
                  <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                    <MapPin size={22} />
                  </div>

                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                    Live city
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-semibold leading-tight text-neutral-950">
                    {activeCity?.name ?? 'Pune'}
                  </h3>

                  <div className="mt-5 w-full text-sm sm:text-[15px] leading-relaxed text-neutral-500 lg:text-left text-center">
                    <p className="mb-2 font-semibold text-neutral-800">
                      Local coverage for
                    </p>

                    <ul className="inline-block text-left list-inside list-disc space-y-0.5">
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

                <div className="relative flex min-w-0 items-center justify-center bg-neutral-50 lg:items-stretch">
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
