'use client';

import { useRef } from 'react';
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // H2 highlight sweep
    if (h2Ref.current && highlightRef.current) {
      gsap.fromTo(highlightRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: h2Ref.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Magnetic button effect (desktop only)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;
      const magnetArea = 150;
      let quickX: any, quickY: any;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
        );

        if (distance < magnetArea) {
          const x = (e.clientX - buttonCenterX) * 0.3;
          const y = (e.clientY - buttonCenterY) * 0.3;

          if (!quickX) {
            quickX = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'power2.out' });
            quickY = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'power2.out' });
          }

          quickX(x);
          quickY(y);
        } else if (quickX) {
          quickX(0);
          quickY(0);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative inline-block">
          <h2 ref={h2Ref} className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Create Something Fun?
          </h2>
          <div
            ref={highlightRef}
            className="absolute bottom-2 left-0 h-3 w-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-30"
            style={{ zIndex: -1 }}
          />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          No downloads, no sign-ups, no hassle. Just click and start creating memorable photo strips.
        </p>
        <div className="mt-10">
          <Link
            ref={buttonRef}
            href="/booth"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-10 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Get Started Now
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Free forever • No watermarks • Works on all devices
        </p>
      </div>
    </section>
  );
}
