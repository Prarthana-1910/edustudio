import React from 'react';
import { SEO } from '@/lib/seo';
import { Reveal } from '@/components/ui/_stubs/Reveal';
import { PageHero } from '@/components/pages/PageHero';
import { ImagePlaceholder } from '@/components/pages/ImagePlaceholder';
import data from '@/data/pages.json';
import community from '@/data/community.json';
import '@/styles/pages-1-4.css';

export const WhatWeDo = () => {
  const { tagline, support, activities } = data.whatWeDo;
  return (
    <div className="bg-paper text-navy">
      <SEO title="What We Do | EduStudio" description="Site visits, workshops, technical talks, projects and our community." />
      <PageHero title="What We Do" image="/images/hero/whatwedo-hero.jpg" tagline={tagline} support={support} titleSize="clamp(3.5rem, 11vw, 9rem)" />

      {/* Activities */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-24 sm:py-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <article tabIndex={0} className="lift lift-navy h-full border border-navy/15 rounded-[4px] p-8 min-h-[260px] flex flex-col justify-between bg-paper">
                <span className="font-mono text-xs text-orange">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-4xl font-black uppercase tracking-tight leading-[0.95]">{a.title}</h2>
                  <div className="w-10 h-[3px] bg-orange my-4" />
                  <p className="lift-sub font-body text-navy/70">{a.sub}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community & Networking */}
      <section className="bg-navy text-paper py-24 sm:py-32">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight">Community &amp; Networking</h2>
          <div className="w-12 h-[3px] bg-orange my-6" />

          <h3 className="font-display text-3xl font-bold uppercase tracking-tight mt-12 mb-8">Companies</h3>
          <div className="flex flex-col gap-6">
            {community.companies.map((c, i) => (
              <Reveal key={i}>
                <article tabIndex={0} className="lift grid md:grid-cols-[320px_1fr] gap-6 md:gap-10 p-6 border border-paper/15 rounded-[4px] bg-navy">
                  <ImagePlaceholder src={c.image} label="Photo: President with CEO / owner or company logo" className="aspect-video md:aspect-[4/3] w-full !bg-paper/10 !text-paper" />
                  <div className="flex flex-col justify-center gap-4">
                    <h4 className="font-display text-3xl font-bold uppercase tracking-tight">{c.name}</h4>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-orange">Since when</p>
                      <p className="font-body text-paper/85">{c.since}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-orange">How they will collaborate</p>
                      <p className="font-body text-paper/85">{c.collab}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <h3 className="font-display text-3xl font-bold uppercase tracking-tight mt-16 mb-8">Universities</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {community.universities.map((u, i) => (
              <Reveal key={i}>
                <article tabIndex={0} className="lift flex gap-6 p-6 border border-paper/15 rounded-[4px] bg-navy items-center">
                  <ImagePlaceholder src={u.image} label="Logo / image" className="w-32 h-32 shrink-0 !bg-paper/10 !text-paper" />
                  <div>
                    <h4 className="font-display text-2xl font-bold uppercase tracking-tight">{u.name}</h4>
                    <p className="font-body text-paper/80 mt-2">{u.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="h-3 w-full stripes-p14" aria-hidden="true" />
    </div>
  );
};

export default WhatWeDo;
