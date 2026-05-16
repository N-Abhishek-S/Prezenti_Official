import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { heroMedia, type HeroVideoAsset } from './heroConfig';

function getInitialReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function HeroVideo({
  asset,
  className,
  isReducedMotion,
}: {
  asset: HeroVideoAsset;
  className: string;
  isReducedMotion: boolean;
}) {
  if (isReducedMotion && asset.poster) {
    return <img src={asset.poster} alt="" className={className} loading="eager" />;
  }

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={asset.poster}
      aria-label={asset.label}
    >
      {asset.sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}

export function HeroMedia() {
  const [isReducedMotion, setIsReducedMotion] = useState(getInitialReducedMotion);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setIsReducedMotion(query.matches);

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <motion.div
      className="relative z-10 min-h-[500px] lg:min-h-[660px]"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
    >
      <div className="absolute inset-x-[8%] bottom-8 h-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,42,34,0.2)_0%,rgba(10,42,34,0.08)_42%,rgba(10,42,34,0)_72%)]" />

      <div className="absolute inset-y-8 right-0 w-[84%] overflow-hidden rounded-l-[44px] bg-primary-900 shadow-[0_34px_100px_rgba(10,42,34,0.22)] sm:w-[78%] lg:w-[86%]">
        <HeroVideo
          asset={heroMedia.primary}
          className="h-full w-full object-cover object-center [backface-visibility:hidden] [transform:translateZ(0)]"
          isReducedMotion={isReducedMotion}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,42,34,0.46)_0%,rgba(10,42,34,0.08)_38%,rgba(255,255,255,0)_74%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(10,42,34,0)_46%,rgba(10,42,34,0.2)_100%)]" />
      </div>

      <div className="absolute bottom-2 left-0 w-[42%] min-w-[176px] max-w-[245px] overflow-hidden rounded-[30px] bg-primary-900 shadow-[0_28px_70px_rgba(10,42,34,0.28)] ring-1 ring-white/60 sm:bottom-10 sm:w-[34%] lg:left-4">
        <div className="aspect-[9/16]">
          <HeroVideo
            asset={heroMedia.supporting}
            className="h-full w-full object-cover object-center [backface-visibility:hidden] [transform:translateZ(0)]"
            isReducedMotion={isReducedMotion}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(10,42,34,0)_52%,rgba(10,42,34,0.22)_100%)]" />
      </div>

      <div className="pointer-events-none absolute left-[18%] top-4 h-[72%] w-px bg-gradient-to-b from-transparent via-primary-200/80 to-transparent" />
      <div className="pointer-events-none absolute right-8 top-0 h-24 w-24 rounded-full border border-primary-100/80" />
    </motion.div>
  );
}
