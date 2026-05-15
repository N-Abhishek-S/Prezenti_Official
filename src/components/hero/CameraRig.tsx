/* eslint-disable react-hooks/immutability -- R3F camera updates are imperative inside useFrame */
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  activeRoleIndex: number;
  isReducedMotion: boolean;
}

/**
 * Premium cinematic camera rig.
 * - Subtle mouse parallax
 * - Slow orbital drift
 * - Smooth damping via MathUtils.damp
 * - Responsive FOV-like adjustments via position.z
 */
export function CameraRig({ activeRoleIndex, isReducedMotion }: CameraRigProps) {
  const { camera, pointer, size } = useThree();

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    // Role-based subtle horizontal drift
    const roleDrift = (activeRoleIndex - 1.5) * 0.03;

    // Slow orbital motion for life
    const orbit = isReducedMotion ? 0 : Math.sin(elapsed * 0.18) * 0.1;

    // Mouse parallax (subtle)
    const pointerX = isReducedMotion ? 0 : pointer.x * 0.15;
    const pointerY = isReducedMotion ? 0 : pointer.y * 0.08;

    // Responsive Z adjustment — pull camera back on narrow viewports
    const baseZ = size.width < 768 ? 6.2 : 5.35;
    const breathZ = isReducedMotion ? 0 : Math.cos(elapsed * 0.14) * 0.06;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      roleDrift + orbit + pointerX,
      3.5,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      0.2 + pointerY,
      3.5,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      baseZ + breathZ,
      3.5,
      delta,
    );

    camera.lookAt(0, 0.05, 0);
  });

  return null;
}
