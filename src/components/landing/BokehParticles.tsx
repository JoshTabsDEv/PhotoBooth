'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BokehParticlesProps {
  count: number;
}

const BRAND_COLORS = [
  '#f472b6', // pink-400
  '#ec4899', // pink-500
  '#c084fc', // purple-400
  '#a855f7', // purple-500
  '#60a5fa', // blue-400
  '#3b82f6', // blue-500
];

export default function BokehParticles({ count }: BokehParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15
      ),
      color: new THREE.Color(BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)]),
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.3 + Math.random() * 0.5,
      phaseOffset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();

      particleData.forEach((data, i) => {
        const time = state.clock.elapsedTime * data.speed + data.phaseOffset;
        const y = data.position.y + Math.sin(time) * 2;
        const x = data.position.x + Math.cos(time * 0.5) * 1;

        dummy.position.set(x, y, data.position.z);
        dummy.scale.setScalar(data.scale);
        dummy.updateMatrix();

        meshRef.current!.setMatrixAt(i, dummy.matrix);
        meshRef.current!.setColorAt(i, data.color);
      });

      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
