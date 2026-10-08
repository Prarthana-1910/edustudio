import React from 'react';
import { SEO } from '@/lib/seo';
import { Reveal } from '@/components/ui/_stubs/Reveal';
import { PageHero } from '@/components/pages/PageHero';
import data from '@/data/pages.json';
import '@/styles/pages-1-4.css';

export const About = () => {
  const { tagline, support, cards } = data.about;
  return (
    <div className="bg-paper text-navy">
      <SEO title="About | EduStudio" description="About EduStudio, a civil engineering collective." />
      <PageHero title="About" image="/images/hero/about-hero.jpg" tagline={tagline} support={support} />

      <section className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-24 sm:py-32">
        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.1}>
              <article tabIndex={0} className="lift relative h-full bg-paper border border-navy/15 rounded-[4px] p-8 sm:p-12 min-h-[260px]">
                <span className="font-mono text-xs text-orange">0{i + 1}</span>
                <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight leading-[0.95] mt-3">{c.title}</h2>
                <div className="w-12 h-[3px] bg-orange my-5" />
                <p className="font-body text-lg text-navy/75 leading-relaxed">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
