import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { scrollToSection } from '../../lib/sectionNavigation';
import { DeploymentCategoryRotator } from './DeploymentCategoryRotator';

const entrance = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const deploymentCategories = [
  'Offices ',
  'Corporate',
  'Educational Institute',
  'Commercial Buildings',
  'Residential Buildings',
  'Hospital ',
  'Healthcare',
  'Cafes ',
  'Restaurants',
  'Pre Schools',
];

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
      className="group flex h-[3.25rem] sm:h-14.5 w-full flex-1 max-w-[160px] items-center justify-center gap-2 rounded-[10px] border border-neutral-700 bg-black px-2 text-left text-white shadow-[0_14px_28px_rgba(15,23,42,0.16)] ring-1 ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/25 sm:w-57.5 sm:max-w-57.5 sm:justify-start sm:gap-3 sm:px-4"
    >
      <StoreIcon kind={kind} />
      <span className="grid min-w-0 leading-none">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/90 sm:text-[10px]">
          {copy.eyebrow}
        </span>
        <span className="mt-[2px] w-full break-words text-[13px] font-semibold tracking-normal text-white sm:mt-1 sm:text-[clamp(1.25rem,2vw,1.5rem)]">
          {copy.label}
        </span>
      </span>
    </button>
  );
}

export function HeroContent() {
  const navigate = useNavigate();
  const openApp = () => navigate('/app');


  return (
    <motion.div
      className="relative z-10 w-full min-w-0 max-w-full py-4 lg:py-8"
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
      <div className="mx-auto w-full max-w-[420px] sm:mx-0 sm:max-w-none">
 <motion.div
  variants={entrance}
  transition={{ duration: 0.55, ease: 'easeOut' }}
  className="relative mb-6 mx-auto flex w-fit max-w-full overflow-hidden rounded-xl p-[1.5px] sm:mx-0 sm:inline-block sm:w-auto"
>
  {/* Animated glowing border */}
  <div className="absolute inset-0 animate-[gradientMove_4s_linear_infinite] rounded-xl bg-[linear-gradient(90deg,#14b8a6,#22c55e,#06b6d4,#14b8a6)] bg-size-[300%_300%]" />

  {/* Glow */}
  <div className="absolute inset-0 animate-[gradientMove_4s_linear_infinite] rounded-xl bg-[linear-gradient(90deg,#14b8a6,#22c55e,#06b6d4,#14b8a6)] bg-size-[300%_300%] opacity-60 blur-md" />

  {/* Content */}
  <div className="relative flex w-full flex-row items-center gap-2 rounded-xl bg-white/90 px-3 py-2 font-medium text-primary-800 backdrop-blur-md sm:w-auto sm:gap-2.5 sm:px-5 sm:py-2.5">
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
    </span>

    <div className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[10.5px] leading-tight sm:text-[13px] sm:leading-[1.4]">
      <span>
        3000+ Trained Professionals Already on Duty — Let's Connect
      </span>
    </div>
  </div>
</motion.div>

<p className="mb-6 w-fit border-b border-dotted border-primary-600/50 pb-[5px] text-left text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-neutral-950 opacity-90 sm:text-[15px]">
  <motion.span
    initial={{ backgroundPosition: '112% 0%' }}
    animate={{ backgroundPosition: ['112% 0%', '-12% 0%'] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{
      backgroundImage: 'linear-gradient(90deg, #0F172A 0%, #0F172A 44%, #16A34A 48%, #22C55E 50%, #16A34A 52%, #0F172A 56%, #0F172A 100%)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      display: 'inline-block',
    }}
  >
    A Platform for offices, Admins and Management Committees
  </motion.span>
</p>

 <motion.h1
  id="ps-project-hero-title"
  className="text-left font-extrabold leading-[1.1] tracking-[-0.025em] sm:leading-[0.95]"
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
      w-full
      max-w-full
      whitespace-nowrap
      text-[26px]
      text-neutral-950
      min-[375px]:text-[32px]
      sm:whitespace-normal
      sm:break-words
      sm:text-[clamp(2.5rem,4vw,4.75rem)]
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
      w-full
      max-w-full
      whitespace-nowrap
      text-[26px]
      font-extrabold
      text-[#16a34a]
      min-[375px]:text-[32px]
      sm:whitespace-normal
      sm:break-words
      sm:text-[clamp(2.5rem,4vw,4.75rem)]
    "
  >
    just a click away
  </motion.span>
</motion.h1>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-6 text-left sm:mt-4"
      >
        <span
          className="block"
          role="text"
          aria-label={`Now deploying Housekeeping across ${deploymentCategories.join(', ')}`}
        >
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B] sm:mb-3 sm:text-[13px]" aria-hidden="true">
            NOW DEPLOYING
          </span>
          <span className="mt-3 block w-full max-w-full min-w-0 align-top">
            <DeploymentCategoryRotator categories={deploymentCategories} />
          </span>
        </span>
      </motion.div>

      <motion.p
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mb-8 mt-6 max-w-[280px] text-left text-[15px] font-normal leading-[1.6] tracking-[-0.006em] text-neutral-600 sm:max-w-140 sm:text-[17px]"
      >
        We Manage Your Support Workforce, While You Focus on Core Operations
      </motion.p>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-start sm:gap-3"
      >
        <Button
          type="button"
          variant="primary"
          size="xl"
          className="group min-h-[56px] w-[95%] min-w-0 max-w-[min(22rem,calc(100vw-2rem))] px-3 text-[15px] font-semibold tracking-[-0.006em] shadow-[0_16px_36px_rgba(18,63,53,0.22)] sm:w-auto sm:max-w-none sm:px-10 min-[420px]:px-4 min-[420px]:text-[15px]"
          onClick={() => navigate('/talk-to-us')}
        >
          <span className="min-w-0 text-balance break-words text-center leading-[1.3]">Let us understand your requirement</span>
          <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="xl"
          className="min-h-[56px] w-[95%] max-w-[min(22rem,calc(100vw-2rem))] border-primary-200 bg-white/86 px-5 text-[15px] font-medium tracking-[-0.006em] sm:w-auto sm:max-w-none sm:px-10"
          onClick={() => scrollToSection('services')}
        >
          Explore Services
        </Button>
      </motion.div>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mt-8 flex flex-row justify-center gap-4 px-2 sm:mt-6 sm:justify-start sm:px-0"
      >
        <StoreBadge kind="google-play" onClick={openApp} />
        <StoreBadge kind="app-store" onClick={openApp} />
      </motion.div>
      </div>
    </motion.div>
  );
}
