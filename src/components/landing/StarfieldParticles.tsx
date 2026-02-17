'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarfieldParticlesProps {
  count: number;
}

export default function StarfieldParticles({ count }: StarfieldParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const opacityRef = useRef(1);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;

      opacityRef.current = 0.7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      if (pointsRef.current.material && 'opacity' in pointsRef.current.material) {
        (pointsRef.current.material as THREE.PointsMaterial).opacity = opacityRef.current;
      }
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
