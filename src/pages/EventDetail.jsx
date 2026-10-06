import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '@/lib/seo';
import eventsData from '@/data/events.json';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

function resolveImage(event) {
  const raw = event.image || event.coverImage;
  if (!raw) return null;
  if (raw.startsWith('/') || raw.startsWith('http')) return raw;
  return `/images/articles/${raw}`;
}

function formatLongDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const EventDetail = () => {
  const { slug } = useParams();
  const event = eventsData.find((ev) => ev.slug === slug);

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    if (!event) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading lines slide up from mask
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE,
          }
        );
      }

      // Meta info fades up
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: EASE,
            delay: 0.25,
          }
        );
      }

      // Each content section fades up 20px on scroll, replaying on re-entry
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.event-section');
        sections.forEach((sec) => {
          gsap.fromTo(
            sec,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: EASE,
              scrollTrigger: {
                trigger: sec,
                start: 'top 85%',
                toggleActions: 'play none none reset',
              },
            }
          );
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, [event]);

  // Unknown slug fallback
  if (!event) {
    return (
      <div className="bg-paper text-navy min-h-screen py-32 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        <SEO title="Event Not Found | EduStudio" />
        <div className="max-w-[760px] mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-navy mb-4">
            Event not found
          </h1>
          <p className="font-body text-base sm:text-lg text-navy/70 mb-8">
            The event you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center text-orange font-display uppercase font-bold text-sm tracking-wider underline hover:text-[#d9771e] transition-colors"
          >
            ← Back to events
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = resolveImage(event);

  return (
    <div ref={pageRef} className="bg-paper text-navy">
      <SEO
        title={`${event.title} | EduStudio`}
        description={event.summary}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-end bg-navy text-paper overflow-hidden pt-32 pb-16 sm:pb-20">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Navy overlay, slightly darker toward bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/75 to-navy/95 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}

        {/* Hero content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
          <div className="max-w-4xl">
            {/* Title in large condensed uppercase off-white text with mask reveal */}
            <h1 className="font-display font-black uppercase tracking-tight text-paper text-3xl sm:text-5xl lg:text-6xl leading-[1.02] mb-6">
              <span className="block overflow-hidden">
                <span ref={titleRef} className="block">
                  {event.title}
                </span>
              </span>
            </h1>

            {/* Date, time, and location on separate lines */}
            <div ref={metaRef} className="flex flex-col gap-1.5 font-body text-base sm:text-lg text-paper/85">
              <span>{formatLongDate(event.date)}</span>
              {event.time && <span>{event.time}</span>}
              {event.location && <span className="text-paper/70">{event.location}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BODY CONTENT ─── */}
      <div className="py-16 sm:py-24 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        <div ref={contentRef} className="max-w-[760px] mx-auto text-left">
          {/* Back link */}
          <Link
            to="/events"
            className="inline-flex items-center text-sm font-body font-medium text-orange hover:text-[#d9771e] transition-colors mb-12"
          >
            ← All events
          </Link>

          {/* About this event */}
          {event.details && event.details.length > 0 && (
            <div className="event-section mb-14">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-navy mb-4">
                About this event
              </h2>
              <div className="space-y-4 font-body text-base sm:text-lg leading-relaxed text-navy/85">
                {event.details.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="event-section mb-14">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-navy mb-4">
                Highlights
              </h2>
              <ul className="list-disc pl-5 space-y-2.5 font-body text-base sm:text-lg text-navy/85">
                {event.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Who it is for */}
          {event.audience && (
            <div className="event-section mb-14">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-navy mb-4">
                Who it is for
              </h2>
              <p className="font-body text-base sm:text-lg text-navy/85 leading-relaxed">
                {event.audience}
              </p>
            </div>
          )}

          {/* Key takeaways (for past events) */}
          {event.status === 'past' && event.takeaways && event.takeaways.length > 0 && (
            <div className="event-section mb-14">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-navy mb-4">
                Key takeaways
              </h2>
              <ol className="list-decimal pl-5 space-y-2.5 font-body text-base sm:text-lg text-navy/85">
                {event.takeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
