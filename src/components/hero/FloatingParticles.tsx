import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  accent: string;
  isReducedMotion: boolean;
}

export function FloatingParticles({ accent, isReducedMotion }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const phi = Math.acos(1 - Math.random() * 1.6);
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 2.2;

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.cos(phi) * radius * 0.8 - 0.5;
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius - 0.8;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const originalPositions = useMemo(() => {
    const position = geometry.getAttribute('position') as THREE.BufferAttribute;
    return new Float32Array(position.array);
  }, [geometry]);

  useFrame((state, delta) => {
    if (!pointsRef.current || isReducedMotion) return;

    pointsRef.current.rotation.y += delta * 0.025;

    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i += 1) {
      const originalY = originalPositions[i * 3 + 1];
      const elapsed = state.clock.elapsedTime;
      const drift = Math.sin(elapsed * 0.3 + i * 0.8) * 0.08;
      const rise = ((elapsed * 0.02 + i * 0.1) % 1) * 0.15;
      positions.setY(i, originalY + drift + rise);
    }
    positions.needsUpdate = true;
  });

  const particleColor = useMemo(() => {
    const accentColor = new THREE.Color(accent);
    const warm = new THREE.Color('#E8D5A8');
    return accentColor.lerp(warm, 0.45).getHexString();
  }, [accent]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={`#${particleColor}`}
        size={0.016}
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
