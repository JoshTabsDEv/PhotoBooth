'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import StarfieldParticles from './StarfieldParticles';
import BokehParticles from './BokehParticles';

export default function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const starCount = isMobile ? 300 : 800;
  const bokehCount = isMobile ? 15 : 40;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
      style={{ background: '#0B0D1A' }}
    >
      <StarfieldParticles count={starCount} />
      <BokehParticles count={bokehCount} />
    </Canvas>
  );
}
