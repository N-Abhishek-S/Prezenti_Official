import gsap from 'gsap';

export const HERO_ROLE_HOLD_SECONDS = 4.1;

interface RoleTransitionLoopOptions {
  roleCount: number;
  initialIndex?: number;
  holdSeconds?: number;
  onRoleChange: (index: number) => void;
}

export function createRoleTransitionLoop({
  roleCount,
  initialIndex = 0,
  holdSeconds = HERO_ROLE_HOLD_SECONDS,
  onRoleChange,
}: RoleTransitionLoopOptions): gsap.core.Timeline | null {
  if (roleCount <= 1) return null;

  let nextIndex = initialIndex;
  const timeline = gsap.timeline({ repeat: -1 });

  for (let step = 0; step < roleCount; step += 1) {
    timeline.to(
      {},
      {
        duration: holdSeconds,
        onComplete: () => {
          nextIndex = (nextIndex + 1) % roleCount;
          onRoleChange(nextIndex);
        },
      },
    );
  }

  return timeline;
}
