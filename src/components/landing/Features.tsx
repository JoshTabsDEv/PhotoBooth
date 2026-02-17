'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '@/lib/gsap';

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "📸 Quick Capture",
      description: "Use your camera to take single photos or create multi-shot photo strips. Works on any device with a camera.",
    },
    {
      title: "🎨 Fun Templates",
      description: "Choose from photo strips, 4x6 prints, square posts, or story formats. Each template is designed for sharing.",
    },
    {
      title: "✨ Stickers & Text",
      description: "Add playful stickers, custom text, emojis, and change backgrounds to make your photos unique.",
    },
    {
      title: "💾 Save & Share",
      description: "Download your creation as a high-quality image or share directly to social media. No watermarks.",
    },
    {
      title: "🔒 100% Private",
      description: "Everything happens in your browser. No uploads, no accounts, no tracking. Your photos stay yours.",
    },
    {
      title: "📱 Mobile First",
      description: "Optimized for phones and tablets. Works offline once loaded. Perfect for parties and events.",
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current) return;

    // Header word reveal
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

    // Feature cards batch animation
    ScrollTrigger.batch('.feature-card', {
      onEnter: batch => gsap.from(batch, {
        y: 100,
        opacity: 0,
        rotationY: 15,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      }),
      start: 'top 85%',
      once: true
    });

    // 3D tilt effect on desktop
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const cards = sectionRef.current?.querySelectorAll('.feature-card');
      cards?.forEach(card => {
        const cardElement = card as HTMLElement;
        let quickX: any, quickY: any;

        cardElement.addEventListener('mouseenter', () => {
          quickX = gsap.quickTo(cardElement, 'rotateY', { duration: 0.3 });
          quickY = gsap.quickTo(cardElement, 'rotateX', { duration: 0.3 });
        });

        cardElement.addEventListener('mousemove', (e) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;

          if (quickX && quickY) {
            quickX(rotateY);
            quickY(rotateX);
          }
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for Fun Photos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A complete photo booth experience, right in your browser.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '800px' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-primary text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
