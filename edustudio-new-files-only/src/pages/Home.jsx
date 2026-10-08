import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/lib/seo';
import { Reveal } from '@/components/ui/_stubs/Reveal';
import { PageHero } from '@/components/pages/PageHero';
import { ImagePlaceholder } from '@/components/pages/ImagePlaceholder';
import data from '@/data/pages.json';
import '@/styles/pages-1-4.css';

export const Home = () => {
  const { heading, strip, rows } = data.home;
  return (
    <div className="bg-paper text-navy">
      <SEO title="EduStudio | A Civil Engineering Collective" description="EduStudio connects academic rigor with infrastructure industry practice." />

      <PageHero title="" image="/images/hero/home-hero.jpg">
        <h1 className="font-display font-black uppercase tracking-tight text-paper leading-[0.95]" style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>
          {heading[0]}
          <br />
          <span className="text-orange">{heading[1]}</span>
        </h1>
      </PageHero>

      <div className="h-3 w-full stripes-p14" aria-hidden="true" />

      {/* Four-item strip */}
      <section className="bg-navy text-paper">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4">
          {strip.map((s, i) => (
            <div key={s} className={`py-10 lg:py-14 px-4 lg:px-8 ${i > 0 ? 'lg:border-l border-paper/15' : ''}`}>
              <span className="font-mono text-xs text-orange">0{i + 1}</span>
              <p className="font-display text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-none mt-3">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alternating page rows */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-24 sm:py-32 flex flex-col gap-20 lg:gap-28">
        {rows.map((r, i) => (
          <Reveal key={r.title}>
            <Link to={r.to} className="group block">
              <article className={`flex flex-col gap-8 lg:gap-12 lg:items-center ${i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                <div className="w-full lg:w-[55%] shrink-0 aspect-video overflow-hidden">
                  <ImagePlaceholder label="Image related to heading" className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                </div>
                <div>
                  <h2 className="font-display text-5xl sm:text-6xl font-black uppercase tracking-tight leading-[0.95]">{r.title}</h2>
                  <div className="w-12 h-[3px] bg-orange my-5" />
                  <p className="font-body text-lg text-navy/75 max-w-md leading-relaxed">{r.blurb}</p>
                  <span className="inline-flex items-center mt-6 font-body font-semibold text-navy group-hover:text-orange transition-colors">
                    {r.cta} →
                  </span>
                </div>
              </article>
            </Link>
          </Reveal>
        ))}
      </section>

      <div className="h-3 w-full stripes-p14" aria-hidden="true" />
    </div>
  );
};

export default Home;
