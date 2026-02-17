'use client';

import { useRef } from 'react';
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
      }
    });

    if (logoRef.current) {
      tl.from(logoRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
      });
    }

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a');
      tl.from(links, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      }, '-=0.3');
    }

    if (copyrightRef.current) {
      tl.from(copyrightRef.current, {
        opacity: 0,
        duration: 0.5,
      }, '-=0.2');
    }

  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="border-t border-gray-200 bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div ref={logoRef} className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-gray-900">
              Photo Booth
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Free online photo booth for everyone
            </p>
          </div>
          <div ref={linksRef} className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/booth"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Create Photos
            </Link>
            <Link
              href="#features"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              How It Works
            </Link>
          </div>
        </div>
        <div ref={copyrightRef} className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Photo Booth. Made with care for capturing moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
