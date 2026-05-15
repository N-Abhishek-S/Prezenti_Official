import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMemo, useRef } from 'react';
import { cn } from '../../lib/cn';

gsap.registerPlugin(useGSAP);

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
  const rootRef = useRef<HTMLSpanElement>(null);
  const words = useMemo(
    () => dynamicWords.map((word) => word.trim()).filter(Boolean),
    [dynamicWords],
  );
  const wordsKey = words.join('|');
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), ''),
    [words],
  );

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const wordElements = gsap.utils.toArray<HTMLSpanElement>(
        '[data-hero-tagline-word]',
        rootRef.current,
      );
      const accent = rootRef.current.querySelector<HTMLSpanElement>(
        '[data-hero-tagline-accent]',
      );

      if (wordElements.length === 0 || !accent) return;

      const motion = gsap.matchMedia();

      motion.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(wordElements, { autoAlpha: 0, yPercent: 0, rotateX: 0, scale: 1 });
        gsap.set(wordElements[0], { autoAlpha: 1 });
        gsap.set(accent, { autoAlpha: 1, scaleX: 1, xPercent: 0 });
      });

      motion.add('(prefers-reduced-motion: no-preference)', () => {
        const holdSeconds = Math.max(intervalMs / 1000 - 0.82, 1.35);

        gsap.set(wordElements, {
          autoAlpha: 0,
          yPercent: 92,
          rotateX: -9,
          scale: 0.985,
          backgroundPosition: '0% 50%',
          transformOrigin: '50% 70% -48px',
          force3D: true,
        });
        gsap.set(wordElements[0], {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          scale: 1,
          backgroundPosition: '100% 50%',
        });
        gsap.set(accent, {
          autoAlpha: 0.68,
          scaleX: 0.26,
          xPercent: 0,
          transformOrigin: '0% 50%',
          force3D: true,
        });

        const timeline = gsap.timeline({
          repeat: -1,
          defaults: { overwrite: 'auto' },
        });

        wordElements.forEach((word, index) => {
          const nextWord = wordElements[(index + 1) % wordElements.length];

          timeline
            .to(
              accent,
              {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.62,
                ease: 'expo.out',
              },
              `+=${holdSeconds}`,
            )
            .to(word, {
              autoAlpha: 0,
              yPercent: -86,
              rotateX: 8,
              scale: 0.985,
              duration: 0.48,
              ease: 'power3.inOut',
            }, '<0.24')
            .fromTo(
              nextWord,
              {
                autoAlpha: 0,
                yPercent: 88,
                rotateX: -9,
                scale: 0.985,
                backgroundPosition: '0% 50%',
              },
              {
                autoAlpha: 1,
                yPercent: 0,
                rotateX: 0,
                scale: 1,
                backgroundPosition: '100% 50%',
                duration: 0.72,
                ease: 'power4.out',
              },
              '<0.1',
            )
            .to(
              accent,
              {
                autoAlpha: 0,
                scaleX: 0.16,
                xPercent: 118,
                duration: 0.36,
                ease: 'power3.in',
              },
              '<0.18',
            )
            .set(accent, {
              autoAlpha: 0.68,
              scaleX: 0.26,
              xPercent: 0,
            });
        });

        return () => timeline.kill();
      });

      return () => motion.revert();
    },
    { scope: rootRef, dependencies: [wordsKey, intervalMs], revertOnUpdate: true },
  );

  if (words.length === 0) {
    return <span className={cn('block', className)}>{staticText}</span>;
  }

  const accessibleLabel = `${staticText} ${words[0]}`;

  return (
    <span
      ref={rootRef}
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
        {words.map((word) => (
          <span
            key={word}
            data-hero-tagline-word
            className={cn(
              'col-start-1 row-start-1 block whitespace-nowrap will-change-transform [backface-visibility:hidden]',
              'bg-linear-to-r from-primary-700 via-teal-600 to-info-500 bg-[length:180%_100%] bg-clip-text text-transparent',
              wordClassName,
            )}
          >
            {word}
          </span>
        ))}
        <span className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-primary-100/80" />
        <span
          data-hero-tagline-accent
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-linear-to-r from-primary-500 via-teal-400 to-info-500 shadow-[0_0_18px_rgba(32,178,170,0.28)]"
        />
      </span>
    </span>
  );
}
