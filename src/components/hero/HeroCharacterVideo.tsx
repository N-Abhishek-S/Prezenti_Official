import { motion, useReducedMotion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

interface HeroCharacterVideoProps {
  isReducedMotion: boolean;
}

const posterPath = '/hero/staff/admin-manager.png';
const videoSources = [
  { src: '/hero/video/ps-project-hero.webm', type: 'video/webm' },
  { src: '/hero/video/ps-project-hero.mp4', type: 'video/mp4' },
] as const;

/* ── Floating UI panel that orbits the character ── */
function FloatingPanel({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-20 ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Ambient particle dot ── */
function Particle({ x, y, delay, size = 2 }: { x: string; y: string; delay: number; size?: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full bg-teal-400/30"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ opacity: [0, 0.7, 0], y: [0, -18, 0], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── Animated counter hook ── */
function useAnimatedNumber(target: number, duration = 1500, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return val;
}

/* ── Pulse ring (live indicator) ── */
function PulseRing({ color = 'bg-teal-400' }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-60`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

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

      {/* ── Scene atmosphere ── */}
      {/* Large ambient glow behind character */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-[5%] right-[5%] h-[75%] w-[75%] rounded-full bg-[radial-gradient(ellipse_at_60%_70%,rgba(20,184,166,0.13)_0%,rgba(16,185,129,0.07)_38%,transparent_70%)]" />
        <div className="absolute right-[10%] top-[5%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_65%)]" />
      </div>

      {/* Floor shadow */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 h-10 w-[58%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,42,34,0.22)_0%,rgba(10,42,34,0.11)_42%,rgba(10,42,34,0)_72%)] lg:bottom-7 lg:left-[56%] lg:w-[64%]" />

      {/* Subtle vertical rule */}
      <div className="pointer-events-none absolute right-[7%] top-[10%] hidden h-[54%] w-px bg-gradient-to-b from-transparent via-primary-200/70 to-transparent lg:block" />

      {/* Grid floor lines — makes it feel like a 3D scene plane */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[22%] overflow-hidden">
        <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="h-full w-full opacity-[0.07]">
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1={60 + i * 120} y1="0" x2={60 + i * 120} y2="120" stroke="currentColor" strokeWidth="0.8" className="text-primary-800" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1="0" y1={30 * i} x2="600" y2={30 * i} stroke="currentColor" strokeWidth="0.8" className="text-primary-800" />
          ))}
        </svg>
      </div>

      {/* Ambient particles */}
      {!isReducedMotion && (
        <>
          <Particle x="12%" y="30%" delay={0} size={3} />
          <Particle x="6%" y="55%" delay={1.2} />
          <Particle x="18%" y="70%" delay={2.4} size={2} />
          <Particle x="85%" y="25%" delay={0.7} size={3} />
          <Particle x="90%" y="48%" delay={1.8} />
          <Particle x="80%" y="68%" delay={3.1} size={2} />
        </>
      )}

      {/* ── Video / character ── */}
      <div className="relative flex h-[430px] w-[min(82vw,330px)] items-end justify-center sm:h-[500px] sm:w-[360px] md:h-[570px] md:w-[410px] lg:h-[min(72svh,690px)] lg:w-[min(42vw,520px)] xl:h-[710px] xl:w-[560px]">

        {/* Scan-line overlay — very subtle, creates screen/digital feel */}
        {!isReducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)',
            }}
          />
        )}

        {isReducedMotion ? (
          <img
            src={posterPath}
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
            poster={posterPath}
          >
            {videoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}

        {/* Bottom-of-character gradient fade — blends feet into the floor */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[14%] bg-gradient-to-t from-white/60 via-white/20 to-transparent dark:from-neutral-950/60 dark:via-neutral-950/20" />
      </div>

      {/* ────────────────────────────────────────────
          FLOATING UI PANELS — contextual data cards
          that make it look like a real 3D app scene
      ──────────────────────────────────────────── */}

      {/* SLA Compliance card — top-left of scene */}
      <FloatingPanel delay={0.9} className="left-0 top-[12%] lg:-left-2 xl:left-2">
        <div className="rounded-xl border border-white/60 bg-white/80 px-3.5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75 w-[148px]">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">SLA Score</span>
            <PulseRing color="bg-teal-400" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[26px] font-bold leading-none text-primary-800">{slaVal}</span>
            <span className="text-sm font-semibold text-primary-600">%</span>
          </div>
          {/* Mini sparkline */}
          <svg viewBox="0 0 100 22" className="mt-2 w-full" preserveAspectRatio="none">
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
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#14b8a600" />
              </linearGradient>
            </defs>
          </svg>
          <p className="mt-1 text-[10px] text-teal-600">↑ 4.2% this month</p>
        </div>
      </FloatingPanel>

      {/* Sites Live counter — right side */}
      <FloatingPanel delay={1.1} className="right-[-4%] top-[28%] lg:-right-4 xl:right-0">
        <div className="rounded-xl border border-white/60 bg-white/80 px-3.5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75 w-[140px]">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">Sites Live</span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[26px] font-bold leading-none text-primary-800">{sitesVal}</span>
            <span className="text-xs font-semibold text-primary-500">+</span>
          </div>
          {/* Tiny bar chart */}
          <div className="mt-2 flex items-end gap-1 h-8">
            {[45, 60, 50, 75, 65, 90, 82].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-primary-200"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.3 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
              >
                <div
                  className="w-full rounded-sm bg-primary-600"
                  style={{ height: i === 6 ? '100%' : '60%' }}
                />
              </motion.div>
            ))}
          </div>
          <p className="mt-1.5 text-[10px] text-neutral-400">Across 12 states</p>
        </div>
      </FloatingPanel>

      {/* Incident resolved toast — appears lower-left */}
      <FloatingPanel delay={1.5} className="bottom-[22%] left-0 lg:-left-2 xl:left-2">
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200/60 bg-emerald-50/90 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-emerald-900/40 dark:bg-emerald-950/70 max-w-[168px]">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="2,9 6,13 14,4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 leading-tight">Ticket #2847 resolved</p>
            <p className="text-[10px] text-emerald-600/80 mt-0.5">Electrical · 12 min SLA</p>
          </div>
        </div>
      </FloatingPanel>

      {/* Attendance badge — floating top-right */}
      <FloatingPanel delay={1.3} className="right-[-2%] top-[10%] lg:-right-2 xl:right-2">
        <div className="rounded-xl border border-white/60 bg-white/80 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75">
          <div className="mb-2 flex items-center gap-1.5">
            <PulseRing color="bg-sky-400" />
            <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">On-site Now</span>
          </div>
          {/* Avatar stack */}
          <div className="flex items-center">
            {['bg-primary-200 text-primary-800', 'bg-teal-200 text-teal-800', 'bg-amber-200 text-amber-800', 'bg-sky-200 text-sky-800'].map((cls, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold ${cls} dark:border-neutral-900`}
                style={{ marginLeft: i === 0 ? 0 : -8 }}
              >
                {['AK', 'SR', 'PM', '..'][i]}
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] font-semibold text-neutral-700 dark:text-neutral-200">
            3,241 <span className="font-normal text-neutral-400">staff verified</span>
          </p>
        </div>
      </FloatingPanel>

      {/* Compliance chip — lower right corner */}
      <FloatingPanel delay={1.7} className="bottom-[30%] right-[-3%] lg:-right-4 xl:right-0">
        <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/75">
          <span className="text-[11px]">📋</span>
          <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-200">ISO 9001 Active</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-500">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1.5,5.5 4,8 8.5,2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </FloatingPanel>

    </motion.div>
  );
}

export const HeroCharacterVideo = memo(HeroCharacterVideoComponent);