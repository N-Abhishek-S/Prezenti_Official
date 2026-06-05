import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { scrollToSection } from '../../lib/sectionNavigation';

const entrance = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

type StoreBadgeKind = 'google-play' | 'app-store';

interface StoreBadgeProps {
  kind: StoreBadgeKind;
  onClick: () => void;
}

const storeBadgeCopy: Record<StoreBadgeKind, { eyebrow: string; label: string }> = {
  'google-play': {
    eyebrow: 'GET IT ON',
    label: 'Google Play',
  },
  'app-store': {
    eyebrow: 'Download on the',
    label: 'App Store',
  },
};

function StoreIcon({ kind }: { kind: StoreBadgeKind }) {
  if (kind === 'google-play') {
    return (
      <svg viewBox="0 0 42 46" aria-hidden="true" className="h-9 w-9 shrink-0">
        <path d="M3.35 2.2 24.1 23 3.35 43.8A5.1 5.1 0 0 1 2 40.3V5.7c0-1.34.52-2.57 1.35-3.5Z" fill="#34A853" />
        <path d="m24.1 23 6.62-6.63 7.75 4.43a3.1 3.1 0 0 1 0 5.4l-7.75 4.43L24.1 23Z" fill="#FBBC04" />
        <path d="m3.35 2.2 27.37 14.17L24.1 23 3.35 2.2Z" fill="#4285F4" />
        <path d="M3.35 43.8 24.1 23l6.62 7.63L3.35 43.8Z" fill="#EA4335" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 38 46" aria-hidden="true" className="h-9 w-9 shrink-0 fill-white">
      <path d="M28.36 24.38c-.04-4.16 3.4-6.17 3.56-6.27-1.95-2.84-4.97-3.23-6.02-3.27-2.54-.27-5.01 1.52-6.3 1.52-1.32 0-3.31-1.49-5.45-1.44-2.76.04-5.35 1.64-6.77 4.15-2.92 5.06-.74 12.5 2.06 16.59 1.4 2 3.03 4.23 5.16 4.15 2.09-.08 2.87-1.33 5.4-1.33 2.5 0 3.24 1.33 5.42 1.28 2.24-.04 3.65-2 5-4.02 1.61-2.3 2.26-4.56 2.29-4.68-.05-.02-4.3-1.64-4.35-6.68Z" />
      <path d="M24.25 12.14c1.12-1.4 1.88-3.3 1.67-5.24-1.62.07-3.65 1.12-4.82 2.49-1.04 1.2-1.97 3.18-1.72 5.04 1.82.14 3.7-.91 4.87-2.29Z" />
    </svg>
  );
}

function StoreBadge({ kind, onClick }: StoreBadgeProps) {
  const copy = storeBadgeCopy[kind];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${copy.label}`}
      className="group flex h-14.5 w-full max-w-57.5 items-center gap-3 rounded-[10px] border border-neutral-700 bg-black px-4 text-left text-white shadow-[0_14px_28px_rgba(15,23,42,0.16)] ring-1 ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-950 hover:shadow-[0_18px_34px_rgba(15,23,42,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/25 sm:w-57.5"
    >
      <StoreIcon kind={kind} />
      <span className="grid min-w-0 leading-none">
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90">
          {copy.eyebrow}
        </span>
        <span className="mt-1 whitespace-nowrap text-[24px] font-semibold tracking-normal text-white">
          {copy.label}
        </span>
      </span>
    </button>
  );
}

export function HeroContent() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const openApp = () => navigate('/app');

  return (
    <motion.div
      className="relative z-10 max-w-full py-6 lg:max-w-162.5 lg:py-12"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
 <motion.div
  variants={entrance}
  transition={{ duration: 0.55, ease: 'easeOut' }}
  className="relative mb-6 block w-full max-w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl p-[1.5px] sm:inline-block sm:w-auto sm:max-w-full"
>
  {/* Animated glowing border */}
  <div className="absolute inset-0 rounded-xl bg-[linear-gradient(90deg,#14b8a6,#22c55e,#06b6d4,#14b8a6)] bg-size-[300%_300%] animate-[gradientMove_4s_linear_infinite]" />

  {/* Glow */}
  <div className="absolute inset-0 rounded-xl blur-md opacity-60 bg-[linear-gradient(90deg,#14b8a6,#22c55e,#06b6d4,#14b8a6)] bg-size-[300%_300%] animate-[gradientMove_4s_linear_infinite]" />

  {/* Content */}
  <div className="relative flex w-full flex-row items-start gap-2.5 rounded-xl bg-white/90 px-4 py-2.5 font-semibold text-primary-800 backdrop-blur-md sm:w-auto sm:px-5">
    <span className="relative mt-[0.35rem] flex h-2 w-2 shrink-0 sm:mt-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
    </span>

    <div className="min-w-0 text-[clamp(10px,2.8vw,14px)] leading-[1.35] sm:text-sm sm:leading-snug">
      <span>
        3000+ Trained Professionals Already on Duty — Let's Connect...
      </span>
    </div>
  </div>
</motion.div>

 <motion.h1
  id="ps-project-hero-title"
  className="font-extrabold leading-[0.95] tracking-normal"
>
  {/* First Line */}
  <motion.span
    initial={{
      opacity: 0,
      y: 30,
      filter: 'blur(8px)',
    }}
    animate={{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }}
    transition={{
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="
      block
      whitespace-nowrap
      text-[1.55rem]
      min-[375px]:text-[1.8rem]
      sm:text-[2.6rem]
      md:text-[3.2rem]
      lg:text-[3.8rem]
      text-neutral-950
    "
  >
    Trained support staff -
  </motion.span>

  <motion.span
    initial={{
      opacity: 0,
      y: 30,
      filter: 'blur(8px)',
    }}
    animate={{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }}
    transition={{
      duration: 0.9,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="
      block
      whitespace-nowrap
      text-[1.75rem]
      min-[375px]:text-[1.9rem]
      sm:text-[2.7rem]
      md:text-[3.3rem]
      lg:text-[3.9rem]
      font-extrabold
      text-[#16a34a]
    "
  >
    just a click away
  </motion.span>
</motion.h1>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-5"
      >
        <span
          className="block"
          role="text"
          aria-label="Now deploying Housekeeping"
        >
          <span className="block text-sm font-bold uppercase tracking-[0.18em] text-neutral-500" aria-hidden="true">
            NOW DEPLOYING
          </span>
          <span
            className="relative mt-2 inline-flex max-w-full items-center gap-3 overflow-hidden pb-3 pr-1 align-top text-[28px] font-extrabold leading-[1.04] min-[375px]:text-[30px] sm:text-[38px]"
            aria-hidden="true"
          >
            <span className="relative flex h-3 w-3 shrink-0 items-center justify-center sm:h-3.5 sm:w-3.5">
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#16A34A]/25 shadow-[0_0_18px_rgba(22,163,74,0.34)]"
                  animate={{ scale: [1, 1.85, 1], opacity: [0.42, 0, 0.42] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <motion.span
                className="relative block h-2.5 w-2.5 rounded-full bg-[#16A34A] shadow-[0_0_12px_rgba(22,163,74,0.38)] sm:h-3 sm:w-3"
                animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.12, 1] }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.5, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
              />
            </span>
            <motion.span
              className="relative z-10 block whitespace-normal bg-clip-text text-transparent sm:whitespace-nowrap"
              style={{
                backgroundImage: 'linear-gradient(100deg, #16A34A 0%, #22C55E 30%, #0F172A 52%, #22C55E 72%, #16A34A 100%)',
                backgroundSize: '240% 100%',
                WebkitTextFillColor: 'transparent',
              }}
              initial={shouldReduceMotion ? false : { backgroundPosition: '0% 50%' }}
              animate={shouldReduceMotion ? { backgroundPosition: '0% 50%' } : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: shouldReduceMotion ? 0 : 4, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
            >
              Housekeeping
            </motion.span>
            <span className="pointer-events-none absolute bottom-0 left-0 h-0.75 w-full rounded-full bg-emerald-100" />
            <motion.span
              className="pointer-events-none absolute bottom-0 left-0 h-0.75 w-full rounded-full bg-linear-to-r from-[#16A34A] via-teal-400 to-emerald-500 shadow-[0_0_18px_rgba(22,163,74,0.24)]"
              initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0.78 }}
              animate={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: [0, 1, 1, 0], opacity: [0.78, 1, 1, 0.78] }}
              transition={{ duration: shouldReduceMotion ? 0 : 3, repeat: shouldReduceMotion ? 0 : Infinity, repeatDelay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center' }}
            />
          </span>
        </span>
      </motion.div>

      <motion.p
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mt-6 max-w-140 text-lg leading-relaxed text-neutral-700"
      >
        We Manage Your Support Workforce, While You Focus on Core Operations
      </motion.p>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Button
          type="button"
          variant="primary"
          size="xl"
          className="group w-full max-w-[min(22rem,calc(100vw-2rem))] min-w-0 px-3 text-sm shadow-[0_16px_36px_rgba(18,63,53,0.22)] min-[420px]:px-4 min-[420px]:text-base sm:w-auto sm:max-w-none sm:px-10"
          onClick={() => navigate('/talk-to-us')}
        >
          <span className="min-w-0 text-center leading-snug">Let us understand your requirement</span>
          <ArrowRight size={18} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="xl"
          className="w-full max-w-[min(22rem,calc(100vw-2rem))] border-primary-200 bg-white/86 px-5 sm:w-auto sm:max-w-none sm:px-10"
          onClick={() => scrollToSection('services')}
        >
          Explore Services
        </Button>
      </motion.div>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      >
        <StoreBadge kind="google-play" onClick={openApp} />
        <StoreBadge kind="app-store" onClick={openApp} />
      </motion.div>
    </motion.div>
  );
}
