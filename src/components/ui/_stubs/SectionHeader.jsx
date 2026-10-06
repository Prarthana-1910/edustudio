import React from 'react';

/**
 * Temporary stub for SectionHeader component.
 * Features civil stationing label (e.g., STA 04+120), heavy condensed title,
 * and technical subtitle.
 */
export const SectionHeader = ({
  station = 'STA 00+000',
  sectionCode = 'SEC 01',
  title,
  subtitle,
  theme = 'paper', // 'paper' or 'navy'
  align = 'left',
  className = '',
  action,
}) => {
  const isNavy = theme === 'navy';

  return (
    <div className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {/* Technical Station & Section metadata */}
      <div className={`inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase mb-3 ${
        isNavy ? 'text-concrete/80' : 'text-navy/70'
      }`}>
        <span className="inline-block px-1.5 py-0.5 bg-orange text-paper font-semibold text-[10px]">
          {station}
        </span>
        <span className="text-concrete select-none">/</span>
        <span className="font-mono tracking-wider">{sectionCode}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] ${
            isNavy ? 'text-paper' : 'text-navy'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-3 font-body text-base sm:text-lg max-w-2xl leading-relaxed ${
              isNavy ? 'text-concrete' : 'text-navy/80'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="mt-4 md:mt-0 shrink-0">{action}</div>}
      </div>

      {/* Structural bottom drafting line */}
      <div className={`mt-6 w-full h-[1px] flex items-center justify-between ${
        isNavy ? 'bg-concrete/20' : 'bg-navy/15'
      }`}>
        <div className="w-8 h-[3px] bg-orange" />
        <div className="w-2 h-2 rounded-full border border-concrete" />
      </div>
    </div>
  );
};

export default SectionHeader;
