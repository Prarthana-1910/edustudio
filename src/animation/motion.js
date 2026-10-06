/**
 * EduStudio Standardized Motion Design System
 * 
 * Rules:
 * - Exactly ONE easing curve: cubic-bezier(0.22, 1, 0.36, 1) [power3.out style civil engineering ease]
 * - Exactly ONE duration scale: fast (0.2s), base (0.4s), deliberate (0.75s)
 * - Animate only transform and opacity. Never width, height, top, left, margin.
 * - GSAP owns scroll-driven animation.
 * - Motion (framer-motion) owns hover, tabs, and small UI transitions.
 */

// One easing curve
export const EASING_BEZIER = [0.22, 1, 0.36, 1];
export const EASING_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const GSAP_EASE = 'power3.out'; // GSAP equivalent mapping to crisp deceleration

// One duration scale (seconds)
export const DURATION = {
  fast: 0.2,
  base: 0.4,
  deliberate: 0.75,
};

// Motion (framer-motion) transition definitions
export const motionTransitions = {
  fast: {
    duration: DURATION.fast,
    ease: EASING_BEZIER,
  },
  base: {
    duration: DURATION.base,
    ease: EASING_BEZIER,
  },
  deliberate: {
    duration: 0.75,
    ease: EASING_BEZIER,
  },
};

// Motion variants for tabs and small UI state switches
export const tabContentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: DURATION.base, ease: EASING_BEZIER } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    transition: { duration: DURATION.fast, ease: EASING_BEZIER } 
  },
};

// Motion hover state variants (transform only)
export const cardHoverVariants = {
  rest: { y: 0 },
  hover: { 
    y: -4, 
    transition: { duration: DURATION.fast, ease: EASING_BEZIER } 
  },
};

export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02, 
    transition: { duration: DURATION.fast, ease: EASING_BEZIER } 
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: 0.1, ease: EASING_BEZIER } 
  },
};
