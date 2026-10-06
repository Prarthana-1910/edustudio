import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { DURATION, GSAP_EASE } from '@/animation/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Temporary stub for SplitHeading component.
 * Animates heading lines upward with transform and opacity.
 */
export const SplitHeading = ({
  text,
  className = '',
  as: Component = 'h1',
  delay = 0,
}) => {
  const headingRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced || !headingRef.current) return;

      const words = headingRef.current.querySelectorAll('.split-word');
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.deliberate,
            delay,
            stagger: 0.08,
            ease: GSAP_EASE,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    },
    { scope: headingRef, dependencies: [text, delay] }
  );

  const words = text ? text.split(' ') : [];

  return (
    <Component ref={headingRef} className={`overflow-hidden ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <span className="split-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default SplitHeading;
