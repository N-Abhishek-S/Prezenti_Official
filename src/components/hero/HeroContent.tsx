import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Clock3, Settings, ShieldCheck, Star, Zap } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/Button';
import { cn } from '../../lib/cn';
import type { HeroRole } from './heroConfig';
import { heroTrustSignals } from './heroConfig';

interface HeroContentProps {
  roles: readonly HeroRole[];
  activeRole: HeroRole;
  isReducedMotion: boolean;
}

const trustIconMap = {
  shield: ShieldCheck,
  clock: Clock3,
  badge: BadgeCheck,
  zap: Zap,
  settings: Settings,
  star: Star,
} as const;

const entrance = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function HeroContent({
  roles,
  activeRole,
  isReducedMotion,
}: HeroContentProps) {
  const longestRoleName = useMemo(
    () => roles.reduce(
      (longest, role) => (role.name.length > longest.length ? role.name : longest),
      '',
    ),
    [roles],
  );

  return (
    <motion.div
      className="relative z-10 max-w-[620px]"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: isReducedMotion ? 0 : 0.08,
          },
        },
      }}
    >
      <motion.div
        variants={entrance}
        transition={{ duration: isReducedMotion ? 0 : 0.55, ease: 'easeOut' }}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary-100 bg-white/86 px-3.5 py-2 text-sm font-semibold text-primary-800 shadow-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
        </span>
       3000+ Trained Professionals Already on Duty — Let’s Connect
      </motion.div>

      <motion.h1
        id="ps-project-hero-title"
        variants={entrance}
        transition={{ duration: isReducedMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-[42px] font-extrabold leading-[0.98] text-neutral-950 sm:text-[56px] lg:text-[66px]"
      >
Trained support staff - just a click away      </motion.h1>

      <motion.div
        variants={entrance}
        transition={{ duration: isReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        className="mt-5"
        aria-live="polite"
      >
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
          Now deploying
        </div>
        <div className="relative mt-2 inline-grid max-w-full overflow-hidden pb-2 pr-1 text-[30px] font-extrabold leading-none sm:text-[38px]">
          <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {longestRoleName}
          </span>
          <motion.span
            key={activeRole.id}
            className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r from-primary-700 via-teal-600 to-info-500 bg-clip-text text-transparent"
            initial={isReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeRole.name}
          </motion.span>
          <span
            className="absolute bottom-0 left-0 h-[3px] w-full rounded-full"
            style={{ backgroundColor: `${activeRole.accent}33` }}
          />
          <motion.span
            key={`${activeRole.id}-line`}
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full"
            style={{ backgroundColor: activeRole.accent }}
            initial={isReducedMotion ? false : { scaleX: 0.18, opacity: 0.4 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.58, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      <motion.p
        variants={entrance}
        transition={{ duration: isReducedMotion ? 0 : 0.62, ease: 'easeOut' }}
        className="mt-6 max-w-[560px] text-lg leading-relaxed text-neutral-700"
      >
We Manage Your Support Workforce, While You Focus on Core Operations     
 </motion.p>

      <motion.div
        variants={entrance}
        transition={{ duration: isReducedMotion ? 0 : 0.62, ease: 'easeOut' }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Link
          to="/contact"
          className={cn(
            buttonVariants({ variant: 'primary', size: 'xl' }),
            'group shadow-[0_16px_36px_rgba(18,63,53,0.22)]',
          )}
        >
          Let us understand your requirement 
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        <Link
          to="/services"
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'xl' }),
            'border-primary-200 bg-white/86',
          )}
        >
          Explore Services
        </Link>
      </motion.div>

      <motion.div
        variants={entrance}
        transition={{ duration: isReducedMotion ? 0 : 0.62, ease: 'easeOut' }}
        className="mt-8 flex flex-wrap gap-2.5"
      >
        {heroTrustSignals.map((signal) => {
          const Icon = trustIconMap[signal.icon as keyof typeof trustIconMap] ?? ShieldCheck;

          return (
            <div
              key={signal.label}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-200/80 bg-white/82 px-3 text-[13px] font-semibold text-neutral-700 shadow-sm transition-all duration-200 hover:border-primary-200 hover:bg-white hover:shadow-md"
            >
              <Icon size={14} className="text-primary-600" />
              {signal.label}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
