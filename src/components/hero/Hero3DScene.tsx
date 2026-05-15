import { Suspense, Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { CameraRig } from './CameraRig';
import { FloatingStatsCards } from './FloatingStatsCards';
import { LightingSetup } from './LightingSetup';
import { RoleSwitcher } from './RoleSwitcher';
import { WorkerModel } from './WorkerModel';
import type { HeroRole } from './heroConfig';

interface Hero3DSceneProps {
  roles: readonly HeroRole[];
  activeRole: HeroRole;
  activeRoleIndex: number;
  isReducedMotion: boolean;
  onRoleSelect: (index: number) => void;
}

function SceneStage({
  roles,
  activeRole,
  activeRoleIndex,
  isReducedMotion,
}: Omit<Hero3DSceneProps, 'onRoleSelect'>) {
  return (
    <>
      <LightingSetup accent={activeRole.accent} />
      <CameraRig activeRoleIndex={activeRoleIndex} isReducedMotion={isReducedMotion} />

      <group position={[0, 0.1, 0]}>
        {roles.map((role, index) => (
          <WorkerModel
            key={role.id}
            role={role}
            active={index === activeRoleIndex}
            index={index}
            activeRoleIndex={activeRoleIndex}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </group>

      <mesh position={[0, -1.69, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.75, 96]} />
        <MeshReflectorMaterial
          color="#f7faf8"
          roughness={0.56}
          blur={[360, 120]}
          mixBlur={0.85}
          mixStrength={0.18}
          depthScale={0.08}
          minDepthThreshold={0.2}
          maxDepthThreshold={1.2}
          mirror={0.12}
          transparent
          opacity={0.82}
        />
      </mesh>

      <mesh position={[0, -1.685, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 8, 160]} />
        <meshBasicMaterial color={new THREE.Color(activeRole.accent)} transparent opacity={0.16} />
      </mesh>
    </>
  );
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class CanvasErrorBoundary extends Component<{ children: ReactNode }, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Preserve the normal app experience while isolating 3D loading failures.
    console.error('3D scene error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <group>
          <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.6, 64]} />
            <meshStandardMaterial color="#111" opacity={0.08} transparent />
          </mesh>
        </group>
      );
    }

    return this.props.children;
  }
}

export function Hero3DScene({
  roles,
  activeRole,
  activeRoleIndex,
  isReducedMotion,
  onRoleSelect,
}: Hero3DSceneProps) {
  return (
    <motion.div
      className="relative h-[430px] min-h-[430px] overflow-visible md:h-[560px] lg:h-[640px]"
      initial={{ opacity: 0, x: 36, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[12%] rounded-[32px] bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-x-[8%] bottom-8 h-px bg-linear-to-r from-transparent via-primary-200/70 to-transparent" />

      <Canvas
        className="relative z-10"
        camera={{ position: [0, 0.2, 5.35], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows={!isReducedMotion}
      >
        <Suspense fallback={null}>
          <CanvasErrorBoundary>
            <SceneStage
              roles={roles}
              activeRole={activeRole}
              activeRoleIndex={activeRoleIndex}
              isReducedMotion={isReducedMotion}
            />
          </CanvasErrorBoundary>
        </Suspense>
      </Canvas>

      <FloatingStatsCards isReducedMotion={isReducedMotion} />

      <div className="pointer-events-none absolute left-3 top-3 z-30 rounded-lg border border-white/60 bg-white/78 px-3 py-2 shadow-[0_10px_30px_rgba(10,42,34,0.08)] backdrop-blur-xl md:left-4 md:top-4">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Active Deployment
        </div>
        <motion.div
          key={activeRole.id}
          className="mt-0.5 text-xs font-semibold text-neutral-950"
          initial={isReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {activeRole.headline}
        </motion.div>
      </div>

      <RoleSwitcher
        roles={roles}
        activeRoleIndex={activeRoleIndex}
        onRoleSelect={onRoleSelect}
        className="absolute bottom-4 left-4 right-4 z-30 md:bottom-5 md:left-6 md:right-6"
      />
    </motion.div>
  );
}
