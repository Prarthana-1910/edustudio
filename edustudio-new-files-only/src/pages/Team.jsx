import React from 'react';
import { SEO } from '@/lib/seo';
import { Reveal } from '@/components/ui/_stubs/Reveal';
import { PageHero } from '@/components/pages/PageHero';
import { ImagePlaceholder } from '@/components/pages/ImagePlaceholder';
import data from '@/data/pages.json';
import team from '@/data/team.json';
import '@/styles/pages-1-4.css';

const Person = ({ p }) => (
  <article tabIndex={0} className="tcard group border border-navy/15 rounded-[4px] overflow-hidden bg-paper">
    <div className="overflow-hidden aspect-[4/5]">
      <ImagePlaceholder src={p.photo} alt={p.name} label="Photo" className="tphoto w-full h-full" />
    </div>
    <div className="tname px-4 py-4 bg-paper">
      <p className="font-display text-2xl font-bold uppercase tracking-tight leading-none">{p.name}</p>
      <p className="font-mono text-[11px] uppercase tracking-widest mt-2 opacity-70">{p.role}</p>
    </div>
  </article>
);

const Group = ({ title, people, cols }) => (
  <section className="mb-20 sm:mb-28">
    <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-10">{title}</h2>
    <div className={`grid grid-cols-2 gap-5 sm:gap-6 ${cols}`}>
      {people.map((p, i) => (
        <Reveal key={i} delay={(i % 4) * 0.06}>
          <Person p={p} />
        </Reveal>
      ))}
    </div>
  </section>
);

export const Team = () => (
  <div className="bg-paper text-navy">
    <SEO title="Team | EduStudio" description="The people behind EduStudio." />
    <PageHero title="Team" image="/images/hero/team-hero.jpg" tagline={data.team.tagline} support={data.team.support} />
    <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-24 sm:py-32">
      <Group title="Top" people={team.top} cols="lg:grid-cols-4" />
      <Group title="Heads" people={team.heads} cols="lg:grid-cols-4" />
      <Group title="Team" people={team.members} cols="lg:grid-cols-4" />
    </div>
  </div>
);

export default Team;
