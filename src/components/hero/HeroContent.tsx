import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroAnimatedTagline } from '../../features/website/HeroAnimatedTagline';
import { scrollToSection } from '../../lib/sectionNavigation';
import type { HeroRole } from './heroConfig';

interface HeroContentProps {
  roles: readonly HeroRole[];
}

const entrance = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function HeroContent({ roles }: HeroContentProps) {
  return (
    <motion.div
      className="relative z-10 max-w-[650px] py-6 lg:py-12"
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
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary-100 bg-white/86 px-3.5 py-2 text-sm font-semibold text-primary-800 shadow-sm"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
        </span>
        3000+ Trained Professionals Already on Duty - Let's Connect
      </motion.div>

      <motion.h1
        id="ps-project-hero-title"
        variants={entrance}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-[42px] font-extrabold leading-[0.98] text-neutral-950 sm:text-[56px] lg:text-[68px]"
      >
        Trained support staff - just a click away
      </motion.h1>

      <motion.div
        variants={entrance}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-5"
      >
        <HeroAnimatedTagline
          staticText="Now deploying"
          dynamicWords={roles.map((role) => role.name)}
          intervalMs={2600}
          staticClassName="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500"
          dynamicClassName="text-[30px] font-extrabold sm:text-[38px]"
        />
      </motion.div>

      <motion.p
        variants={entrance}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        className="mt-6 max-w-[560px] text-lg leading-relaxed text-neutral-700"
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
          className="group shadow-[0_16px_36px_rgba(18,63,53,0.22)]"
          onClick={() => scrollToSection('contact')}
        >
          Let us understand your requirement
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="xl"
          className="border-primary-200 bg-white/86"
          onClick={() => scrollToSection('services')}
        >
          Explore Services
        </Button>
      </motion.div>
    </motion.div>
  );
}
