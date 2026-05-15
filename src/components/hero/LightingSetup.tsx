import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface LightingSetupProps {
  accent: string;
}

/**
 * Premium cinematic lighting rig.
 * Key light + rim light + environment + contact shadows.
 * Subtle light movement tracks mouse for immersive feel.
 */
export function LightingSetup({ accent }: LightingSetupProps) {
  const spotRef = useRef<THREE.SpotLight>(null);
  const { pointer } = useThree();

  // Subtle light movement following mouse
  useFrame((_, delta) => {
    if (!spotRef.current) return;
    const targetX = -3.5 + pointer.x * 0.8;
    const targetY = 4 + pointer.y * 0.4;
    spotRef.current.position.x = THREE.MathUtils.damp(spotRef.current.position.x, targetX, 2, delta);
    spotRef.current.position.y = THREE.MathUtils.damp(spotRef.current.position.y, targetY, 2, delta);
  });

  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={0.55} />

      {/* Hemisphere for natural sky/ground fill */}
      <hemisphereLight color="#ffffff" groundColor="#d7eee8" intensity={0.75} />

      {/* Key directional light — top right */}
      <directionalLight
        castShadow
        position={[4.5, 6, 4.5]}
        intensity={1.4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-bias={-0.0001}
      />

      {/* Rim / accent light — back left for edge definition */}
      <spotLight
        ref={spotRef}
        color={accent}
        position={[-3.5, 4, 3.5]}
        angle={0.5}
        penumbra={0.85}
        intensity={0.9}
        distance={12}
      />

      {/* Subtle fill from below-right */}
      <pointLight
        color="#E0F2E5"
        position={[3, -1, 2]}
        intensity={0.3}
        distance={8}
      />

      {/* Environment map with lightformers for premium reflections */}
      <Environment resolution={64}>
        {/* Large overhead softbox */}
        <Lightformer intensity={2.2} position={[0, 5, 4]} scale={[6, 3, 1]} />
        {/* Accent-colored side fill */}
        <Lightformer intensity={0.8} color={accent} position={[-5, 2, 2]} scale={[2, 4, 1]} />
        {/* Warm back fill */}
        <Lightformer intensity={0.7} color="#FFF8EE" position={[4, -1, 3]} scale={[3, 2, 1]} />
        {/* Subtle top cool wash */}
        <Lightformer intensity={0.5} color="#E8F4FD" position={[0, 6, -2]} scale={[8, 1, 1]} />
      </Environment>

      {/* Premium contact shadows */}
      <ContactShadows
        position={[0, -1.68, 0]}
        opacity={0.3}
        scale={6}
        blur={2.5}
        far={4}
        resolution={256}
      />
    </>
  );
}
