import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoleTransitionLoop } from './RoleTransitionController';
import type { HeroRole } from './heroConfig';

function getInitialReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useHeroAnimation(roles: readonly HeroRole[]) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(getInitialReducedMotion);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reduced motion preference listener
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setIsReducedMotion(query.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // Auto-rotation loop
  useEffect(() => {
    if (isReducedMotion) return undefined;

    const loop = createRoleTransitionLoop({
      roleCount: roles.length,
      onRoleChange: setActiveRoleIndex,
    });

    timelineRef.current = loop;

    return () => {
      loop?.kill();
      timelineRef.current = null;
    };
  }, [isReducedMotion, roles.length]);

  // Manual role selection — pauses auto-rotation for 8s then resumes
  const selectRole = useCallback(
    (index: number) => {
      if (index >= 0 && index < roles.length) {
        setActiveRoleIndex(index);

        // Pause the auto-rotation timeline
        if (timelineRef.current) {
          timelineRef.current.pause();
        }

        // Clear any existing resume timeout
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }

        // Resume auto-rotation after 8 seconds of inactivity
        pauseTimeoutRef.current = setTimeout(() => {
          if (timelineRef.current) {
            timelineRef.current.resume();
          }
        }, 8000);
      }
    },
    [roles.length],
  );

  // Cleanup pause timeout
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const activeRole = useMemo(
    () => roles[activeRoleIndex] ?? roles[0],
    [activeRoleIndex, roles],
  );

  return {
    activeRole,
    activeRoleIndex,
    isReducedMotion,
    selectRole,
  };
}
