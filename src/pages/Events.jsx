import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '@/lib/seo';
import eventsData from '@/data/events.json';
import { UpcomingEventBlock, PastEventCard } from '@/components/cards/EventCard';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

export const Events = () => {
  const allEvents = eventsData;
  const now = new Date().getTime();
  const upcomingEvents = allEvents
    .filter((ev) => new Date(ev.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = allEvents
    .filter((ev) => new Date(ev.date).getTime() < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [hoveredId, setHoveredId] = useState(null);
  const location = useLocation();

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroLineRef = useRef(null);
  const heroTextRef = useRef(null);
  const upcomingRef = useRef(null);
  const pastGridRef = useRef(null);

  // Smooth scroll to #contact on hash navigation
  useEffect(() => {
    if (location.hash === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  // GSAP Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Animations timeline
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      // Background photo starts at scale 1.1 and settles to 1 over 1.4s
      if (heroBgRef.current) {
        tl.fromTo(
          heroBgRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 1.4 },
          0
        );
      }

      // Heading mask-reveal
      if (heroHeadingRef.current) {
        tl.fromTo(
          heroHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9 },
          0.1
        );
      }

      // Orange line grows from left (scaleX 0 to 1, 0.5s)
      if (heroLineRef.current) {
        tl.fromTo(
          heroLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5 },
          0.7
        );
      }

      // Punchline and description fade up 20px with 0.15s stagger
      if (heroTextRef.current && heroTextRef.current.children.length > 0) {
        tl.fromTo(
          heroTextRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          0.95
        );
      }

      // 2. Upcoming blocks: image clip-path wipe in from its side, text fades up 30px, day count-up over 0.8s
      if (upcomingRef.current) {
        const blocks = upcomingRef.current.querySelectorAll('.upcoming-block');
        blocks.forEach((block) => {
          const isReversed = block.classList.contains('wipe-right');
          const imgWrap = block.querySelector('.row-img-wrap');
          const textEl = block.querySelector('.row-text');
          const dateNum = block.querySelector('.date-num');

          if (imgWrap) {
            gsap.fromTo(
              imgWrap,
              { clipPath: isReversed ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
              {
                clipPath: isReversed ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)',
                duration: 1.0,
                ease: EASE,
                scrollTrigger: {
                  trigger: block,
                  start: 'top 80%',
                  toggleActions: 'play none none reset',
                },
              }
            );
          }

          if (textEl) {
            gsap.fromTo(
              textEl,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: EASE,
                delay: 0.1,
                scrollTrigger: {
                  trigger: block,
                  start: 'top 80%',
                  toggleActions: 'play none none reset',
                },
              }
            );
          }

          if (dateNum) {
            const rawTarget = dateNum.getAttribute('data-target') || dateNum.textContent;
            const target = parseInt(rawTarget, 10);
            if (!isNaN(target)) {
              dateNum.setAttribute('data-target', target);
              dateNum.textContent = '0';
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 0.8,
                ease: EASE,
                scrollTrigger: {
                  trigger: block,
                  start: 'top 80%',
                  toggleActions: 'play none none reset',
                  onLeaveBack: () => {
                    obj.val = 0;
                    dateNum.textContent = '0';
                  },
                },
                onUpdate: () => {
                  dateNum.textContent = Math.round(obj.val);
                },
              });
            }
          }
        });
      }

      // 3. Past cards: fade up 40px with 0.1s stagger per row, images settle from 1.1 to 1
      if (pastGridRef.current && pastGridRef.current.children.length > 0) {
        gsap.fromTo(
          pastGridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: EASE,
            scrollTrigger: {
              trigger: pastGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            },
          }
        );

        const cardImgs = pastGridRef.current.querySelectorAll('.card-img');
        if (cardImgs.length > 0) {
          gsap.fromTo(
            cardImgs,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 0.9,
              ease: EASE,
              stagger: 0.1,
              scrollTrigger: {
                trigger: pastGridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reset',
              },
            }
          );
        }
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const isAnyHovered = hoveredId !== null;

  return (
    <div ref={pageRef} className="bg-paper text-navy">
      <SEO
        title="Events | EduStudio"
        description="Workshops, technical seminars, and student engineering sessions."
      />

      {/* ─── 1. HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden mb-24 sm:mb-32"
      >
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroBgRef}
            src="/images/hero/events-hero.png"
            alt=""
            className="w-full h-full object-cover object-center will-change-transform"
          />
        </div>

        {/* Navy overlay — about 55% opacity, slightly darker toward bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/65 to-navy/85 pointer-events-none" />

        {/* Content container — aligned with nav logo */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full pt-20">
          <div className="max-w-4xl">
            {/* Heading — clamp(4.5rem, 13vw, 11rem), line-height 0.92 */}
            <h1
              className="font-display font-black uppercase tracking-tight text-paper mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)', lineHeight: 0.92 }}
            >
              <span className="block overflow-hidden">
                <span
                  ref={heroHeadingRef}
                  className="block"
                >
                  Events
                </span>
              </span>
            </h1>

            {/* Orange line — 48px wide, 3px tall */}
            <div
              ref={heroLineRef}
              className="w-12 h-[3px] bg-orange my-6 sm:my-8 origin-left"
            />

            {/* Punchline and Description */}
            <div ref={heroTextRef} className="space-y-4 sm:space-y-6">
              <p
                className="font-body font-medium text-paper leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)', fontWeight: 500 }}
              >
                From classroom to construction site.
              </p>
              <p
                className="font-body text-paper/80 max-w-2xl leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 1.7vw, 1.5rem)' }}
              >
                Where ideas meet people and possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
          {/* ─── 2. UPCOMING ─── */}
          <section className="mb-24 sm:mb-32">
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-navy mb-16">
              Upcoming
            </h2>

            <div ref={upcomingRef} className="flex flex-col gap-20 lg:gap-28">
              {upcomingEvents.length === 0 ? (
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-navy/70 py-8">
                  Next event coming soon.
                </p>
              ) : (
                upcomingEvents.map((event, i) => (
                  <UpcomingEventBlock
                    key={event.id}
                    event={event}
                    reversed={i % 2 === 1}
                    dimmed={isAnyHovered && hoveredId !== event.id}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  />
                ))
              )}
            </div>
          </section>

          {/* ─── 3. PAST ─── */}
          {pastEvents.length > 0 && (
            <section className="mb-24 sm:mb-32">
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-navy mb-16">
                Past
              </h2>

              <div
                ref={pastGridRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              >
                {pastEvents.map((event) => (
                  <PastEventCard
                    key={event.id}
                    event={event}
                    dimmed={isAnyHovered && hoveredId !== event.id}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  />
                ))}
              </div>
            </section>
          )}
      </div>
    </div>
  );
};

export default Events;
