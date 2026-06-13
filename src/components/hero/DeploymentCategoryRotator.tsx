import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion, AnimatePresence, motion } from 'framer-motion';

interface DeploymentCategoryRotatorProps {
  categories: string[];
  intervalMs?: number;
}

export function DeploymentCategoryRotator({
  categories,
  intervalMs = 3150,
}: DeploymentCategoryRotatorProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const validCategories = useMemo(
    () => categories.map((category) => category.trim()).filter(Boolean),
    [categories],
  );

  const activeCategory = validCategories[activeIndex] ?? validCategories[0] ?? '';

  useEffect(() => {
    if (shouldReduceMotion || validCategories.length <= 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % validCategories.length);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, shouldReduceMotion, validCategories.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [validCategories.length]);

  if (!activeCategory) {
    return null;
  }

  const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <span
      className="relative flex flex-wrap items-baseline gap-x-[8px] pb-1"
      style={{ fontSize: 'clamp(24px, 2.6vw, 34px)' }}
    >
      {/* Green bullet */}
      <span
        className="block h-[0.3em] w-[0.3em] shrink-0 rounded-full bg-success-400 translate-y-[-0.15em]"
        aria-hidden="true"
      />

      {/* "Housekeeping for" — static */}
      <span className="shrink-0 font-bold tracking-[-0.03em] leading-[1.1] text-[#0B1020]">
        Housekeeping
        <span
          className="inline font-medium tracking-normal ml-[0.25em]"
          style={{ fontSize: '0.62em', color: 'rgba(11,16,32,.55)' }}
        >
          for
        </span>
      </span>

      {/* Animated category */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Deployment category: ${activeCategory}`}
        className="relative inline-flex flex-wrap items-baseline font-semibold leading-[1.1] tracking-[-0.01em] min-h-[1.25em]"
        style={{ fontSize: '0.72em' }}
      >
        {shouldReduceMotion || validCategories.length === 1 ? (
          <span className="text-success-500">{activeCategory}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.65, ease: customEase }}
              className="text-success-500 inline-block will-change-[transform,opacity]"
            >
              {activeCategory}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  );
}
