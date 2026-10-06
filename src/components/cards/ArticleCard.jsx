import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { RisingSun } from '@/components/ui/CivilMotifs';

function resolveImage(article) {
  const raw = article?.image || article?.coverImage;
  if (!raw || raw.endsWith('.svg') || raw.includes('cable-stayed-bridge')) return null;
  if (raw.startsWith('/') || raw.startsWith('http')) return raw;
  return `/images/articles/${raw}`;
}

/**
 * Featured block — 21:9 image with overlay text at bottom-left.
 */
export const FeaturedArticleCard = forwardRef(({ article }, ref) => {
  if (!article) return null;
  const imageSrc = resolveImage(article);

  return (
    <Link to={`/blogs/${article.slug}`} className="block group" ref={ref}>
      <article className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio: '21/9' }}>
        {/* Image with parallax target class */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={article.title}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="featured-img absolute inset-0 w-full h-full object-cover will-change-transform rounded-[4px]"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full img-placeholder flex items-center justify-center rounded-[4px]">
            <RisingSun size={140} />
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

        {/* Text over the image */}
        <div className="absolute bottom-0 left-0 p-6 sm:p-10 lg:p-14 max-w-4xl z-10">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-paper leading-tight mb-3 transition-colors duration-200 group-hover:text-orange">
            {article.title}
          </h2>
          <div className="flex items-center gap-3 text-sm font-body text-paper/80">
            {article.author && (
              <>
                <span className="font-semibold text-paper">{article.author}</span>
                <span>·</span>
              </>
            )}
            <span>{formatDate(article.date)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
});
FeaturedArticleCard.displayName = 'FeaturedArticleCard';

/**
 * Post row — alternating image-left / image-right layout.
 * `reversed` puts the image on the right.
 * `dimmed` lowers opacity to 50%.
 */
export const PostRow = ({ article, reversed = false, dimmed = false }) => {
  if (!article) return null;
  const imageSrc = resolveImage(article);

  return (
    <Link
      to={`/blogs/${article.slug}`}
      className="block group post-row"
      style={{
        opacity: dimmed ? 0.5 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <article
        className={`flex flex-col gap-6 lg:gap-12 ${
          reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Image — 55% width on desktop */}
        <div className="relative lg:w-[55%] shrink-0 aspect-video overflow-hidden img-placeholder row-img-wrap">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={article.title}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="row-img w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <RisingSun size={90} />
            </div>
          )}
        </div>

        {/* Text — fills remaining width */}
        <div className="flex flex-col justify-center lg:w-[45%] row-text">
          <span className="font-body text-xs uppercase tracking-widest text-navy/70 mb-3">
            {formatDate(article.date)}
          </span>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-navy leading-tight transition-colors duration-200 group-hover:text-orange">
            {article.title}
          </h3>
          {/* Orange underline — grows on hover */}
          <div className="h-[2px] bg-orange mt-2 mb-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-2/3" />

          {article.summary && (
            <p className="font-body text-base text-navy/70 leading-relaxed line-clamp-2 mb-5">
              {article.summary}
            </p>
          )}

          <span className="inline-flex items-center gap-2 font-display text-sm uppercase font-bold tracking-wider text-orange">
            Read
            <svg
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
};

// Legacy exports for compatibility
export const ArticleCard = PostRow;
export default ArticleCard;
