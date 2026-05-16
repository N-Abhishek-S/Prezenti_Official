import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '../../lib/cn';

interface HeroAnimatedTaglineProps {
  staticText: string;
  dynamicWords: readonly string[];
  intervalMs?: number;
  className?: string;
  staticClassName?: string;
  dynamicClassName?: string;
  wordClassName?: string;
}

export function HeroAnimatedTagline({
  staticText,
  dynamicWords,
  intervalMs = 2400,
  className,
  staticClassName,
  dynamicClassName,
  wordClassName,
}: HeroAnimatedTaglineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const words = useMemo(
    () => dynamicWords.map((word) => word.trim()).filter(Boolean),
    [dynamicWords],
  );
  const wordsKey = words.join('|');
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), ''),
    [words],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setIsReducedMotion(query.matches);

    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [wordsKey]);

  useEffect(() => {
    if (isReducedMotion || words.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % words.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, isReducedMotion, words.length]);

  if (words.length === 0) {
    return <span className={cn('block', className)}>{staticText}</span>;
  }

  const activeWord = words[activeIndex] ?? words[0];
  const accessibleLabel = `${staticText} ${activeWord}`;
  const wordMotion = isReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0, rotateX: 0 }, exit: { opacity: 1, y: 0, rotateX: 0 } }
    : {
        initial: { opacity: 0, y: 22, rotateX: -8 },
        animate: { opacity: 1, y: 0, rotateX: 0 },
        exit: { opacity: 0, y: -18, rotateX: 6 },
      };

  return (
    <span
      className={cn('block', className)}
      role="text"
      aria-label={accessibleLabel}
    >
      <span className={cn('block text-neutral-900', staticClassName)} aria-hidden="true">
        {staticText}
      </span>
      <span
        className={cn(
          'relative mt-2 inline-grid max-w-full overflow-hidden pb-3 pr-1 align-top leading-[1.04] [perspective:900px]',
          dynamicClassName,
        )}
        aria-hidden="true"
      >
        <span className="invisible col-start-1 row-start-1 block whitespace-nowrap">
          {longestWord}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeWord}
            data-hero-tagline-word
            className={cn(
              'col-start-1 row-start-1 block whitespace-nowrap will-change-transform [backface-visibility:hidden]',
              'text-primary-800',
              wordClassName,
            )}
            {...wordMotion}
            transition={{ duration: isReducedMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeWord}
          </motion.span>
        </AnimatePresence>
        <span className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-primary-100/80" />
        <motion.span
          key={`${activeWord}-accent`}
          data-hero-tagline-accent
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-linear-to-r from-primary-500 via-teal-400 to-info-500 shadow-[0_0_18px_rgba(32,178,170,0.28)]"
          initial={isReducedMotion ? false : { opacity: 0.72, scaleX: 0.22 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: isReducedMotion ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left center' }}
        />
      </span>
    </span>
  );
}
