import { motion } from 'framer-motion';
import { BarChart3, Building2, ShieldCheck, UsersRound } from 'lucide-react';
import { heroStats } from './heroConfig';

interface KpiCardsProps {
  isReducedMotion: boolean;
}

const iconMap = {
  building: Building2,
  shield: ShieldCheck,
  chart: BarChart3,
  users: UsersRound,
} as const;

const cardEntrance = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const positions = [
  'right-5 top-6',
  'left-4 top-[42%]',
  'right-6 top-[61%]',
  'left-10 bottom-22',
];

export function KpiCards({ isReducedMotion }: KpiCardsProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30 hidden lg:block"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: isReducedMotion ? 0 : 0.14, delayChildren: 1.05 },
        },
      }}
    >
      {heroStats.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? ShieldCheck;

        return (
          <motion.div
            key={stat.label}
            variants={cardEntrance}
            transition={{ duration: isReducedMotion ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${positions[index]} min-w-[176px] rounded-lg border border-white/60 bg-white/78 px-4 py-3 shadow-[0_16px_40px_rgba(10,42,34,0.1)] backdrop-blur-xl`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary-50 text-primary-800">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <div>
                <div className="text-lg font-extrabold leading-tight tracking-tight text-neutral-950">
                  {stat.value}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
