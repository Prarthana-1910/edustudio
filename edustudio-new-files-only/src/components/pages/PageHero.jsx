import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EASE = 'power3.out';

/**
 * Full-screen photo hero, same structure and timings as the Blogs / Events heroes.
 * Props: title, image, tagline, support. `children` replaces tagline/support (used by Home).
 */
export const PageHero = ({ title, image, tagline, support, children, titleSize = 'clamp(4.5rem, 13vw, 11rem)' }) => {
  const bg = useRef(null);
  const head = useRef(null);
  const line = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.fromTo(bg.current, { scale: 1.1 }, { scale: 1, duration: 1.4 }, 0);
      if (head.current) tl.fromTo(head.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.1);
      tl.fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.7);
      if (text.current?.children.length) {
        tl.fromTo(text.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 }, 0.95);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img ref={bg} src={image} alt="" className="w-full h-full object-cover object-center will-change-transform" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/65 to-navy/85 pointer-events-none" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full pt-20">
        <div className="max-w-4xl">
          {title && (
            <h1
              className="font-display font-black uppercase tracking-tight text-paper mb-4 sm:mb-6"
              style={{ fontSize: titleSize, lineHeight: 0.92 }}
            >
              <span className="block overflow-hidden">
                <span ref={head} className="block">{title}</span>
              </span>
            </h1>
          )}
          <div ref={line} className="w-12 h-[3px] bg-orange my-6 sm:my-8 origin-left" />
          <div ref={text} className="space-y-4 sm:space-y-6">
            {children ?? (
              <>
                <p className="font-body font-medium text-paper leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)' }}>
                  {tagline}
                </p>
                <p className="font-body text-paper/80 max-w-2xl leading-relaxed" style={{ fontSize: 'clamp(1.125rem, 1.7vw, 1.5rem)' }}>
                  {support}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
