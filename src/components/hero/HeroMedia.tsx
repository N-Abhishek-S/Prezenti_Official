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
  priority = false,
}: {
  asset: HeroVideoAsset;
  className: string;
  isReducedMotion: boolean;
  priority?: boolean;
}) {
  if (isReducedMotion && asset.poster) {
    return (
      <img
        src={asset.poster}
        alt={asset.label}
        title={asset.label}
        className={className}
        loading="eager"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        width={960}
        height={1280}
      />
    );
  }

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      poster={asset.poster}
      aria-label={asset.label}
      title={asset.label}
      width={960}
      height={1280}
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
      className="relative z-10 w-full min-h-128 sm:min-h-96 lg:min-h-120"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
    >
      <div className="absolute inset-x-[8%] bottom-8 h-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.16)_0%,rgba(15,23,42,0.07)_42%,rgba(15,23,42,0)_72%)]" />

      <div className="absolute inset-y-5 inset-x-0 mx-auto w-[92%] overflow-hidden rounded-4xl bg-neutral-950 shadow-[0_34px_100px_rgba(15,23,42,0.2)] ring-1 ring-white/70 sm:inset-x-auto sm:inset-y-8 sm:right-0 sm:w-[80%] sm:rounded-[36px] lg:w-[86%]">
        <HeroVideo
          asset={heroMedia.primary}
          className="h-full w-full object-cover object-[center_15%] backface-hidden transform-[translateZ(0)] sm:object-[50%_center]"
          isReducedMotion={isReducedMotion}
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.34)_0%,rgba(15,23,42,0.07)_38%,rgba(255,255,255,0)_74%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(15,23,42,0)_46%,rgba(15,23,42,0.14)_100%)]" />
      </div>

      <div className="absolute -bottom-2 -left-1 z-20 w-[34%] min-w-28 max-w-36 overflow-hidden rounded-[26px] bg-neutral-950 shadow-[0_28px_70px_rgba(15,23,42,0.24)] ring-1 ring-white/70 sm:bottom-10 sm:left-0 sm:w-[28%] sm:min-w-32 sm:max-w-44 sm:rounded-[30px] lg:left-4">
        <div className="aspect-9/16">
          <HeroVideo
            asset={heroMedia.supporting}
            className="h-full w-full object-cover object-center backface-hidden transform-[translateZ(0)]"
            isReducedMotion={isReducedMotion}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(15,23,42,0)_52%,rgba(15,23,42,0.16)_100%)]" />
      </div>
    </motion.div>
  );
}
