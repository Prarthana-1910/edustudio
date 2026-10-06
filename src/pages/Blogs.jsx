import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '@/lib/seo';
import { getArticles } from '@/lib/content';
import { siteConfig } from '@/data/site';
import { FeaturedArticleCard, PostRow } from '@/components/cards/ArticleCard';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

export const Blogs = () => {
  const allArticles = getArticles();
  const featured = allArticles[0] || null;
  const restArticles = allArticles.slice(1);

  const [hoveredIdx, setHoveredIdx] = useState(null);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroLineRef = useRef(null);
  const heroTextRef = useRef(null);
  const featuredRef = useRef(null);
  const rowsRef = useRef(null);

  // ─── GSAP Animations ───
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

      // 2. Featured: clip-path wipe from left + settle from scale 1.15
      if (featuredRef.current) {
        const img = featuredRef.current.querySelector('.featured-img');
        gsap.fromTo(
          featuredRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: EASE,
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.4,
              ease: EASE,
              scrollTrigger: {
                trigger: featuredRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reset',
              },
            }
          );
          // Parallax: image moves 8% slower than scroll
          gsap.to(img, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }

      // 3. Post rows: image slides in from its side, text fades up
      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll('.post-row');
        rows.forEach((row, i) => {
          const imgWrap = row.querySelector('.row-img-wrap');
          const textEl = row.querySelector('.row-text');
          const isReversed = i % 2 === 1;

          if (imgWrap) {
            gsap.fromTo(
              imgWrap,
              { x: isReversed ? 60 : -60, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: EASE,
                scrollTrigger: {
                  trigger: row,
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
                  trigger: row,
                  start: 'top 80%',
                  toggleActions: 'play none none reset',
                },
              }
            );
          }
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const isAnyHovered = hoveredIdx !== null;
  const hasManyPosts = restArticles.length > 0;

  return (
    <div ref={pageRef} className="bg-paper text-navy">
      <SEO
        title="Blogs | EduStudio"
        description="Civil engineering research and technical articles by EduStudio members."
      />

      {/* ─── 1. HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroBgRef}
            src="/images/hero/blogs-hero.png"
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
                  Blogs
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
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)' }}
              >
                Ideas that go beyond the classroom.
              </p>
              <p
                className="font-body text-paper/80 max-w-2xl leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 1.7vw, 1.5rem)' }}
              >
                Perspectives from the people shaping tomorrow’s environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURED ─── */}
      {featured && (
        <section className="pt-12 md:pt-[72px] lg:pt-24 mb-24 sm:mb-32">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
            <FeaturedArticleCard ref={featuredRef} article={featured} />
          </div>
        </section>
      )}

      {/* ─── 3. ALL POSTS / single-post fallback ─── */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        {allArticles.length <= 1 ? (
          <p className="font-body text-lg text-navy/70 py-24">
            More research blogs coming soon.
          </p>
        ) : (
          <section className="pb-24 sm:pb-32">
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-navy mb-16">
              Latest
            </h2>

            <div ref={rowsRef} className="flex flex-col gap-20 lg:gap-28">
              {restArticles.map((article, i) => (
                <div
                  key={article.id}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <PostRow
                    article={article}
                    reversed={i % 2 === 1}
                    dimmed={isAnyHovered && hoveredIdx !== i}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export const Insights = Blogs;
export default Blogs;
