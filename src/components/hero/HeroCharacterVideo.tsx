import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface HeroCharacterVideoProps {
  isReducedMotion: boolean;
}

interface FloatingPanelProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
}

interface PulseRingProps {
  color?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const POSTER_PATH = '/hero/staff/admin-manager.png';

const VIDEO_SOURCES = [
  { src: '/hero/video/ps-project-hero.webm', type: 'video/webm' },
  { src: '/hero/video/ps-project-hero.mp4', type: 'video/mp4' },
] as const;

const BAR_HEIGHTS = [45, 60, 50, 75, 65, 90, 82] as const;

const AVATAR_STYLES = [
  'bg-primary-200 text-primary-800',
  'bg-teal-200 text-teal-800',
  'bg-amber-200 text-amber-800',
  'bg-sky-200 text-sky-800',
] as const;

const AVATAR_INITIALS = ['AK', 'SR', 'PM', '..'] as const;

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useAnimatedNumber(target: number, duration: number = 1500, delayMs: number = 0): number {
  const [val, setVal] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number): void => {
        const progress = Math.min((now - start) / duration, 1);
        setVal(Math.round(progress * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [target, duration, delayMs]);

  return val;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FloatingPanel({ children, delay, className = '' }: FloatingPanelProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-20 ${className}`}
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PulseRing({ color = 'bg-teal-400' }: PulseRingProps) {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-60`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 10 10"
      className="h-2.5 w-2.5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="1.5,5.5 4,8 8.5,2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Floating panels ─────────────────────────────────────────────────────────

function SlaScorePanel({ value }: { value: number }) {
  return (
    <FloatingPanel delay={0.9} className="left-0 top-[12%] lg:-left-2 xl:left-2">
      <div className="w-[148px] rounded-xl border border-white/60 bg-white/80 px-3.5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">SLA Score</span>
          <PulseRing color="bg-teal-400" />
        </div>

        <div className="flex items-baseline gap-0.5">
          <span className="text-[26px] font-bold leading-none text-primary-800">{value}</span>
          <span className="text-sm font-semibold text-primary-600">%</span>
        </div>

        <svg viewBox="0 0 100 22" className="mt-2 w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#14b8a600" />
            </linearGradient>
          </defs>
          <polyline
            points="0,18 16,14 32,16 48,8 64,11 80,5 100,3"
            fill="none"
            stroke="#0f766e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="0,18 16,14 32,16 48,8 64,11 80,5 100,3 100,22 0,22"
            fill="url(#sparkGrad)"
            opacity="0.25"
          />
        </svg>

        <p className="mt-1 text-[10px] text-teal-600">↑ 4.2% this month</p>
      </div>
    </FloatingPanel>
  );
}

function SitesLivePanel({ value }: { value: number }) {
  return (
    <FloatingPanel delay={1.1} className="right-[-4%] top-[28%] lg:-right-4 xl:right-0">
      <div className="w-[140px] rounded-xl border border-white/60 bg-white/80 px-3.5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75">
        <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">Sites Live</span>

        <div className="mt-1.5 flex items-baseline gap-0.5">
          <span className="text-[26px] font-bold leading-none text-primary-800">{value}</span>
          <span className="text-xs font-semibold text-primary-500">+</span>
        </div>

        <div className="mt-2 flex h-8 items-end gap-1">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col justify-end rounded-sm bg-primary-200"
              style={{ height: `${h}%` }}
            >
              <div
                className="w-full rounded-sm bg-primary-600"
                style={{ height: i === BAR_HEIGHTS.length - 1 ? '100%' : '60%' }}
              />
            </div>
          ))}
        </div>

        <p className="mt-1.5 text-[10px] text-neutral-400">Across 12 states</p>
      </div>
    </FloatingPanel>
  );
}

function TicketResolvedPanel() {
  return (
    <FloatingPanel delay={1.5} className="bottom-[22%] left-0 lg:-left-2 xl:left-2">
      <div className="flex max-w-[168px] items-center gap-2.5 rounded-xl border border-emerald-200/60 bg-emerald-50/90 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-emerald-900/40 dark:bg-emerald-950/70">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-emerald-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="2,9 6,13 14,4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold leading-tight text-emerald-800 dark:text-emerald-300">
            Ticket #2847 resolved
          </p>
          <p className="mt-0.5 text-[10px] text-emerald-600/80">Electrical · 12 min SLA</p>
        </div>
      </div>
    </FloatingPanel>
  );
}

function OnSitePanel() {
  return (
    <FloatingPanel delay={1.3} className="right-[-2%] top-[10%] lg:-right-2 xl:right-2">
      <div className="rounded-xl border border-white/60 bg-white/80 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75">
        <div className="mb-2 flex items-center gap-1.5">
          <PulseRing color="bg-sky-400" />
          <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">On-site Now</span>
        </div>

        <div className="flex items-center">
          {AVATAR_STYLES.map((cls, i) => (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold dark:border-neutral-900 ${cls}`}
              style={{ marginLeft: i === 0 ? 0 : -8 }}
            >
              {AVATAR_INITIALS[i]}
            </div>
          ))}
        </div>

        <p className="mt-1.5 text-[11px] font-semibold text-neutral-700 dark:text-neutral-200">
          3,241{' '}
          <span className="font-normal text-neutral-400">staff verified</span>
        </p>
      </div>
    </FloatingPanel>
  );
}

function ComplianceChip() {
  return (
    <FloatingPanel delay={1.7} className="bottom-[30%] right-[-3%] lg:-right-4 xl:right-0">
      <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75">
        <span className="text-[11px]" aria-hidden="true">📋</span>
        <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-200">ISO 9001 Active</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-500">
          <CheckIcon />
        </span>
      </div>
    </FloatingPanel>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function HeroCharacterVideoComponent({ isReducedMotion }: HeroCharacterVideoProps) {
  const slaVal = useAnimatedNumber(98, 1200, 900);
  const sitesVal = useAnimatedNumber(500, 1400, 1100);

  return (
    <motion.div
      className="relative z-10 flex min-h-[430px] items-end justify-center overflow-visible md:min-h-[560px] lg:min-h-[650px] lg:justify-end"
      initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      aria-hidden="true"
    >
      {/* ── Atmosphere ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-[5%] right-[5%] h-[75%] w-[75%] rounded-full bg-[radial-gradient(ellipse_at_60%_70%,rgba(20,184,166,0.13)_0%,rgba(16,185,129,0.07)_38%,transparent_70%)]" />
        <div className="absolute right-[10%] top-[5%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_65%)]" />
      </div>

      {/* Floor shadow */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 h-10 w-[58%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,42,34,0.22)_0%,rgba(10,42,34,0.11)_42%,rgba(10,42,34,0)_72%)] lg:bottom-7 lg:left-[56%] lg:w-[64%]" />

      {/* Vertical rule accent */}
      <div className="pointer-events-none absolute right-[7%] top-[10%] hidden h-[54%] w-px bg-gradient-to-b from-transparent via-primary-200/70 to-transparent lg:block" />

      {/* Perspective grid floor */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[22%] overflow-hidden">
        <svg
          viewBox="0 0 600 120"
          preserveAspectRatio="none"
          className="h-full w-full opacity-[0.07]"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`v-${i}`}
              x1={60 + i * 120}
              y1="0"
              x2={60 + i * 120}
              y2="120"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-primary-800"
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={30 * i}
              x2="600"
              y2={30 * i}
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-primary-800"
            />
          ))}
        </svg>
      </div>

      {/* ── Video / character ──────────────────────── */}
      <div className="relative flex h-[430px] w-[min(82vw,330px)] items-end justify-center sm:h-[500px] sm:w-[360px] md:h-[570px] md:w-[410px] lg:h-[min(72svh,690px)] lg:w-[min(42vw,520px)] xl:h-[710px] xl:w-[560px]">
        {isReducedMotion ? (
          <img
            src={POSTER_PATH}
            alt=""
            className="h-full w-full object-contain object-bottom"
            fetchPriority="high"
          />
        ) : (
          <video
            className="h-full w-full object-contain object-bottom [backface-visibility:hidden] [transform:translateZ(0)]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER_PATH}
          >
            {VIDEO_SOURCES.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}

        {/* Feet blend — merges character into page background */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[14%] bg-gradient-to-t from-white/60 via-white/20 to-transparent dark:from-neutral-950/60 dark:via-neutral-950/20" />
      </div>

      {/* ── Floating UI panels ─────────────────────── */}
      <SlaScorePanel value={slaVal} />
      <SitesLivePanel value={sitesVal} />
      <TicketResolvedPanel />
      <OnSitePanel />
      <ComplianceChip />
    </motion.div>
  );
}

export const HeroCharacterVideo = memo(HeroCharacterVideoComponent);