import { Clone, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import type { HeroRole, HeroRoleAnimation } from './heroConfig';

interface DigitalHumanProps {
  role: HeroRole;
  active: boolean;
  index: number;
  activeRoleIndex: number;
  isReducedMotion: boolean;
}

interface TextureState {
  texture: THREE.Texture;
  aspect: number;
}

const rolePose: Record<HeroRoleAnimation, { rotateY: number; rotateZ: number; y: number }> = {
  supervise: { rotateY: -0.06, rotateZ: 0.004, y: 0.02 },
  clean: { rotateY: 0.04, rotateZ: -0.004, y: 0.01 },
  serve: { rotateY: -0.05, rotateZ: 0.005, y: 0.015 },
  welcome: { rotateY: 0.045, rotateZ: -0.003, y: 0.025 },
};

function useOptionalModel(modelPath: string) {
  const [available, setAvailable] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const isModelPath = /\.(glb|gltf)(?:[?#].*)?$/i.test(modelPath);

    if (!isModelPath) {
      setAvailable(false);
      setChecked(true);
      return () => {
        mounted = false;
      };
    }

    fetch(modelPath, {
      headers: { Range: 'bytes=0-31' },
      signal: controller.signal,
    })
      .then(async (response) => {
        const contentType = response.headers.get('content-type') ?? '';
        const isHtml = contentType.includes('text/html') || contentType.includes('application/xhtml+xml');
        const prefix = new Uint8Array(await response.arrayBuffer()).slice(0, 16);
        const signature = String.fromCharCode(...prefix.slice(0, 4));
        const textPrefix = new TextDecoder().decode(prefix).trimStart();
        const isGlb = signature === 'glTF';
        const isGltf = textPrefix.startsWith('{');

        if (mounted) setAvailable(response.ok && !isHtml && (isGlb || isGltf));
      })
      .catch((error: unknown) => {
        if (mounted && !(error instanceof DOMException && error.name === 'AbortError')) {
          setAvailable(false);
        }
      })
      .finally(() => {
        if (mounted) setChecked(true);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [modelPath]);

  return checked && available;
}

function useStaffTexture(imagePath: string) {
  const [state, setState] = useState<TextureState | null>(null);

  useEffect(() => {
    let mounted = true;
    let loadedTexture: THREE.Texture | null = null;

    new THREE.TextureLoader().load(imagePath, (texture) => {
      if (!mounted) {
        texture.dispose();
        return;
      }

      loadedTexture = texture;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;

      const image = texture.image as HTMLImageElement | undefined;
      const aspect = image?.naturalWidth && image?.naturalHeight
        ? image.naturalWidth / image.naturalHeight
        : 0.62;

      setState({ texture, aspect });
    });

    return () => {
      mounted = false;
      loadedTexture?.dispose();
    };
  }, [imagePath]);

  return state;
}

function RiggedGlbHuman({ role }: { role: HeroRole }) {
  const gltf = useGLTF(role.modelPath, true);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if ('roughness' in material) material.roughness = Math.max(material.roughness ?? 0.48, 0.42);
        if ('metalness' in material) material.metalness = Math.min(material.metalness ?? 0.04, 0.12);
      });
    });
  }, [gltf.scene]);

  return (
    <Clone
      object={gltf.scene}
      castShadow
      receiveShadow
      scale={1.72}
      position={[0, -1.58, 0]}
    />
  );
}

function StaffTextureStandIn({ role, active }: { role: HeroRole; active: boolean }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const textureState = useStaffTexture(role.imagePath);

  const curvedGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(2.42, 4.3, 28, 8);
    const position = geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const curve = -Math.pow(Math.abs(x) / 1.21, 2) * 0.12;
      position.setZ(i, curve);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;
    gsap.to(materialRef.current, {
      opacity: active ? 1 : 0,
      duration: active ? 0.5 : 0.32,
      ease: 'power2.out',
    });
  }, [active]);

  if (!textureState) return null;

  const width = 2.58;
  const height = width / textureState.aspect;

  return (
    <group>
      <mesh geometry={curvedGeometry} scale={[1, height / 4.3, 1]} castShadow>
        <meshStandardMaterial
          ref={materialRef}
          map={textureState.texture}
          transparent
          opacity={active ? 1 : 0}
          roughness={0.68}
          metalness={0.02}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.045]} scale={[0.98, height / 4.3, 1]}>
        <planeGeometry args={[width, 4.3]} />
        <meshBasicMaterial
          map={textureState.texture}
          transparent
          opacity={active ? 0.16 : 0}
          color="#1b2a24"
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function StudioShadow({ active, accent }: { active: boolean; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current.scale, {
      x: active ? 1 : 0.55,
      y: active ? 1 : 0.55,
      duration: 0.72,
      ease: 'power3.out',
    });
    gsap.to(ref.current.material as THREE.MeshBasicMaterial, {
      opacity: active ? 0.24 : 0,
      duration: 0.58,
      ease: 'power2.out',
    });
  }, [active]);

  return (
    <mesh ref={ref} position={[0, -1.64, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.34, 1]}>
      <circleGeometry args={[1.22, 72]} />
      <meshBasicMaterial color={accent} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function StudioBackplate({ active, accent }: { active: boolean; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(256, 246, 24, 256, 256, 248);
    gradient.addColorStop(0, `${accent}26`);
    gradient.addColorStop(0.52, `${accent}10`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [accent]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current.material as THREE.MeshBasicMaterial, {
      opacity: active ? 0.7 : 0,
      duration: 0.75,
      ease: 'power2.out',
    });
  }, [active]);

  if (!texture) return null;

  return (
    <mesh ref={ref} position={[0, -0.12, -0.42]}>
      <planeGeometry args={[4.8, 4.8]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

export function DigitalHuman({
  role,
  active,
  index,
  activeRoleIndex,
  isReducedMotion,
}: DigitalHumanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const hasModel = useOptionalModel(role.modelPath);
  const pose = rolePose[role.animation];

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const relativeIndex = index - activeRoleIndex;
    const roleCount = 4;
    const wrappedIndex =
      Math.abs(relativeIndex) > roleCount / 2
        ? relativeIndex - Math.sign(relativeIndex) * roleCount
        : relativeIndex;
    const isNeighbor = Math.abs(wrappedIndex) === 1;

    const targetX = active ? 0 : wrappedIndex * 0.72;
    const targetZ = active ? 0 : -0.78 - Math.abs(wrappedIndex) * 0.18;
    const targetScale = active ? 1 : isNeighbor ? 0.52 : 0.32;
    const targetRotationY = active ? pose.rotateY : wrappedIndex * 0.18;

    if (isReducedMotion) {
      group.position.set(targetX, active ? pose.y : -0.14, targetZ);
      group.rotation.set(0, targetRotationY, active ? pose.rotateZ : 0);
      group.scale.setScalar(targetScale);
      group.visible = active || isNeighbor;
      return;
    }

    group.visible = true;
    gsap.to(group.position, {
      x: targetX,
      y: active ? pose.y : -0.14,
      z: targetZ,
      duration: active ? 0.96 : 0.68,
      ease: active ? 'power4.out' : 'power3.inOut',
    });
    gsap.to(group.rotation, {
      x: 0,
      y: targetRotationY,
      z: active ? pose.rotateZ : 0,
      duration: 0.8,
      ease: 'power3.inOut',
    });
    gsap.to(group.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: active ? 0.96 : 0.66,
      ease: 'power4.out',
      onComplete: () => {
        group.visible = active || isNeighbor;
      },
    });
  }, [active, activeRoleIndex, index, isReducedMotion, pose]);

  useFrame((state, delta) => {
    if (!floatRef.current || !groupRef.current || !active || isReducedMotion) return;
    const elapsed = state.clock.elapsedTime;
    const pointerX = state.pointer.x * 0.055;
    const pointerY = state.pointer.y * 0.02;

    floatRef.current.position.y = Math.sin(elapsed * 1.15 + index * 0.65) * 0.024;
    floatRef.current.scale.y = 1 + Math.sin(elapsed * 2.1) * 0.0035;
    floatRef.current.rotation.z = Math.sin(elapsed * 0.7 + index) * 0.004;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      pose.rotateY + pointerX,
      4,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      pointerY,
      4,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={[0, active ? pose.y : -0.14, 0]} scale={active ? 1 : 0.32}>
      <StudioBackplate active={active} accent={role.accent} />
      <StudioShadow active={active} accent={role.accent} />
      <group ref={floatRef}>
        {hasModel ? <RiggedGlbHuman role={role} /> : <StaffTextureStandIn role={role} active={active} />}
      </group>
    </group>
  );
}
