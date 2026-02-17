'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '@/lib/gsap';

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "1",
      title: "Snap Your Photos",
      description: "Allow camera access and take single shots or multi-photo strips. Set a timer for group shots.",
    },
    {
      number: "2",
      title: "Customize & Decorate",
      description: "Choose a template, add stickers and text, change backgrounds, and make it your own.",
    },
    {
      number: "3",
      title: "Save or Share",
      description: "Download your creation as a high-quality image or share directly to Instagram, Twitter, or anywhere.",
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current) return;

    // Header animation
    const h2 = headerRef.current.querySelector('h2');
    const p = headerRef.current.querySelector('p');

    if (h2) {
      const h2Split = new SplitText(h2, { type: 'words', wordsClass: 'inline-block' });
      gsap.from(h2Split.words, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        }
      });
    }

    if (p) {
      gsap.from(p, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        }
      });
    }

    // Steps batch animation
    ScrollTrigger.batch('.step-card', {
      onEnter: batch => {
        batch.forEach((step, index) => {
          const circle = step.querySelector('.step-circle');
          const title = step.querySelector('.step-title');
          const desc = step.querySelector('.step-desc');
          const connector = step.querySelector('.step-connector');

          const tl = gsap.timeline({ delay: index * 0.2 });

          if (circle) {
            tl.from(circle, {
              scale: 0,
              rotation: 180,
              duration: 0.6,
              ease: 'back.out(2)',
            });
          }

          if (title) {
            tl.from(title, {
              opacity: 0,
              y: 20,
              duration: 0.4,
            }, '-=0.3');
          }

          if (desc) {
            tl.from(desc, {
              opacity: 0,
              y: 20,
              duration: 0.4,
            }, '-=0.2');
          }

          if (connector) {
            tl.from(connector, {
              scaleX: 0,
              duration: 0.5,
            }, '-=0.5');
          }
        });
      },
      start: 'top 80%',
      once: true
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Create amazing photo strips in three simple steps
          </p>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="step-card relative text-center">
              <div className="step-circle mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-2xl font-bold text-white shadow-lg">
                {step.number}
              </div>
              <h3 className="step-title mt-6 font-display text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="step-desc mt-3 text-base text-gray-600">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="step-connector absolute right-0 top-8 hidden h-0.5 w-full origin-left bg-gradient-to-r from-purple-300 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
