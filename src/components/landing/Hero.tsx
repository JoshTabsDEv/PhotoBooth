'use client';

import { useRef, useEffect } from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap, useGSAP, SplitText } from '@/lib/gsap';

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0B0D1A]" />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const gradientSpanRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!h1Ref.current || !gradientSpanRef.current || !paragraphRef.current || !buttonsRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Split main h1 text into characters
    const mainTextNode = h1Ref.current.childNodes[0];
    if (mainTextNode && mainTextNode.nodeType === Node.TEXT_NODE) {
      const tempSpan = document.createElement('span');
      tempSpan.textContent = mainTextNode.textContent;
      mainTextNode.parentNode?.replaceChild(tempSpan, mainTextNode);

      const mainSplit = new SplitText(tempSpan, {
        type: 'chars',
        charsClass: 'inline-block'
      });

      tl.from(mainSplit.chars, {
        y: '100%',
        rotateX: -90,
        opacity: 0,
        stagger: { each: 0.03, from: 'start' },
        duration: 0.8,
        ease: 'back.out(2)',
      });
    }

    // Gradient span text scramble effect
    const gradientSplit = new SplitText(gradientSpanRef.current, {
      type: 'chars',
      charsClass: 'inline-block'
    });
    const originalChars = gradientSplit.chars.map(char => char.textContent);
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    tl.from(gradientSplit.chars, {
      opacity: 0,
      duration: 0.01,
      stagger: 0.02,
      onStart: function() {
        gradientSplit.chars.forEach((char, i) => {
          const scrambleCount = 8;
          for (let j = 0; j < scrambleCount; j++) {
            gsap.delayedCall(j * 0.05, () => {
              if (j < scrambleCount - 1) {
                char.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
              } else {
                char.textContent = originalChars[i];
              }
            });
          }
        });
      }
    }, '-=0.3');

    // Paragraph line reveal
    const paragraphSplit = new SplitText(paragraphRef.current, {
      type: 'lines',
      linesClass: 'overflow-hidden'
    });

    const innerLines = new SplitText(paragraphRef.current, {
      type: 'lines',
      linesClass: 'inline-block'
    });

    tl.from(innerLines.lines, {
      y: '100%',
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');

    // CTA buttons
    const buttons = buttonsRef.current.children;
    tl.from(buttons, {
      scale: 0,
      opacity: 0,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)',
      duration: 1,
    }, '-=0.3');

    return () => {
      if (mainTextNode) mainSplit?.revert();
      gradientSplit?.revert();
      paragraphSplit?.revert();
      innerLines?.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#0B0D1A] px-4 py-20">
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 ref={h1Ref} className="font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Create Fun Photo Strips{" "}
          <span ref={gradientSpanRef} className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>
        <p ref={paragraphRef} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
          Take photos, add stickers and text, choose from fun templates, and download your creations.
          Free, no signup required. Works on any phone or computer.
        </p>
        <div ref={buttonsRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booth"
            className="flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-[#0B0D1A] sm:px-10 sm:text-lg"
          >
            Start Taking Photos
          </Link>
          <Link
            href="#how-it-works"
            className="flex h-14 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-[#0B0D1A] sm:px-10 sm:text-lg"
          >
            How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
