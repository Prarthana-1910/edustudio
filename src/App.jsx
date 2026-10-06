import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Blogs } from '@/pages/Blogs';
import { ArticleDetail } from '@/pages/ArticleDetail';
import { Events } from '@/pages/Events';
import { EventDetail } from '@/pages/EventDetail';

gsap.registerPlugin(ScrollTrigger);

// Set manual scroll restoration once on app start
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let lenisInstance = null;

// Scroll to top helper on route change
function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Skip if URL has a hash (such as #contact) so anchor scrolling works
    if (location.hash) return;

    window.scrollTo(0, 0);
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
    ScrollTrigger.refresh();

    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname]);

  return null;
}

export function App() {
  // Initialize Lenis smooth scrolling and tie to GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-paper text-navy selection:bg-orange selection:text-paper">
      <ScrollToTop />
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<ArticleDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
