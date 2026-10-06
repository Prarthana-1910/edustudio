import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { DURATION, GSAP_EASE } from '@/animation/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Temporary stub for Reveal component.
 * Uses GSAP + ScrollTrigger for scroll-driven entrance animation.
 * Respects prefers-reduced-motion and cleans up on unmount.
 */
export const Reveal = ({
  children,
  className = '',
  y = 28,
  delay = 0,
  duration = DURATION.deliberate,
  threshold = 'top 88%',
  as: Component = 'div',
  ...props
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !containerRef.current) {
        gsap.set(containerRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(containerRef.current, {
        opacity: 0,
        y: y,
      });

      // ScrollTrigger entrance
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: Math.min(duration, 0.95), // Cap under 1s
        delay: delay,
        ease: GSAP_EASE,
        scrollTrigger: {
          trigger: containerRef.current,
          start: threshold,
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [y, delay, duration, threshold] }
  );

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
};

export default Reveal;
