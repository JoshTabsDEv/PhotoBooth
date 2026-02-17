'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap';

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Enable ScrollSmoother only on desktop/tablet
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => {
        smoother.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
