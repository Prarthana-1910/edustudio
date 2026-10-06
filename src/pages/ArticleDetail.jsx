import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SEO } from '@/lib/seo';
import { getArticleBySlug } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { RisingSun } from '@/components/ui/CivilMotifs';

gsap.registerPlugin(ScrollTrigger);

function resolveArticleImage(article) {
  const raw = article?.image || article?.coverImage;
  if (!raw) return null;
  if (raw.startsWith('/') || raw.startsWith('http')) return raw;
  return `/images/articles/${raw}`;
}

function getInitials(name) {
  if (!name) return 'ES';
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const ArticleDetail = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  const [copied, setCopied] = useState(false);
  const pageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Title lines slide up from mask
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: 'power3.out',
          }
        );
      }

      // 2. Sections fade up 20px on entering viewport, replay on re-entry
      const sections = pageRef.current?.querySelectorAll('.article-section');
      sections?.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reset',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [article?.slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!article) {
    return (
      <div className="bg-paper text-navy min-h-screen pt-32 pb-24">
        <SEO title="Article Not Found | EduStudio" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
          <h1 className="font-display text-3xl font-black uppercase text-navy mb-3">
            Article Not Found
          </h1>
          <p className="font-body text-navy/70 mb-6">
            The requested article could not be found.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center text-sm font-body font-semibold text-navy hover:text-orange transition-colors"
          >
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = resolveArticleImage(article);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article ref={pageRef} className="bg-paper text-navy min-h-screen pt-28 md:pt-36 pb-24 sm:pb-32">
      <SEO
        title={`${article.title} | EduStudio`}
        description={article.summary || article.subtitle || article.title}
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        {/* 1. Title and Subtitle */}
        <header className="mb-8">
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-navy leading-[1.08]"
            >
              {article.title}
            </h1>
          </div>

          {article.subtitle && (
            <p className="font-body text-xl sm:text-2xl text-navy/75 mt-4 leading-snug">
              {article.subtitle}
            </p>
          )}

          {/* 2. Author, Date, and Tags chips */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 text-sm font-body text-navy/70 border-b border-concrete/40 pb-6">
            <span className="font-semibold text-navy">{article.author}</span>
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.tags && article.tags.length > 0 && (
              <>
                <span className="hidden sm:inline">·</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-navy/8 text-navy/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* 3. Featured Image, full container width, with small caption underneath */}
        <div className="article-section my-10 sm:my-14">
          <div className="w-full aspect-[21/9] bg-navy/5 rounded-[4px] overflow-hidden flex items-center justify-center border border-concrete/30">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={article.imageCaption || article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full img-placeholder flex items-center justify-center">
                <RisingSun size={120} />
              </div>
            )}
          </div>
          {article.imageCaption && (
            <p className="text-center font-body text-xs sm:text-sm text-navy/60 mt-3 italic">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* 4. Article body from markdown: comfortable reading width (about 720px), 1.125rem text, 1.75 line height, 24px between paragraphs */}
        <div
          className="article-section max-w-[720px] mx-auto my-12 font-body text-navy text-[1.125rem] leading-[1.75]
            [&>p]:mb-6
            [&_strong]:font-bold [&_strong]:text-navy
            [&_a]:text-orange [&_a]:underline hover:[&_a]:text-[#d9771e] [&_a]:transition-colors
            [&>h2]:font-display [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:text-navy [&>h2]:mt-12 [&>h2]:mb-4
            [&>h3]:font-display [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:uppercase [&>h3]:tracking-tight [&>h3]:text-navy [&>h3]:mt-8 [&>h3]:mb-3
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
            [&>blockquote]:border-l-4 [&>blockquote]:border-orange [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-navy/80
            [&>pre]:bg-navy/8 [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto [&>pre]:text-sm [&>pre]:my-6
            [&_code]:bg-navy/8 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.body}
          </ReactMarkdown>
        </div>

        {/* 5. Tags at the bottom */}
        {article.tags && article.tags.length > 0 && (
          <div className="article-section max-w-[720px] mx-auto pt-6 pb-6 border-t border-concrete/40 flex flex-wrap items-center gap-2">
            <span className="font-body text-xs uppercase tracking-wider text-navy/60 font-semibold mr-1">
              Tags:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-navy/8 text-navy/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 6. Share row: LinkedIn, WhatsApp, Email, and Copy link (plain text buttons) */}
        <div className="article-section max-w-[720px] mx-auto py-6 border-y border-concrete/40 flex flex-wrap items-center justify-between gap-4 font-body text-sm">
          <span className="font-semibold text-navy uppercase text-xs tracking-wider">
            Share this article:
          </span>
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy hover:text-orange underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy hover:text-orange underline transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
              className="text-navy hover:text-orange underline transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="text-navy hover:text-orange underline transition-colors cursor-pointer"
            >
              {copied ? 'Link Copied!' : 'Copy link'}
            </button>
          </div>
        </div>

        {/* 7. Author box: round photo or initials, name, role, bio, and social links */}
        <div className="article-section max-w-[720px] mx-auto my-12 p-6 sm:p-8 bg-navy/4 border border-concrete/40 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {article.authorPhoto ? (
            <img
              src={article.authorPhoto}
              alt={article.author}
              className="w-16 h-16 rounded-full object-cover shrink-0 border border-concrete/40"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-navy text-paper flex items-center justify-center font-display font-bold text-xl shrink-0">
              {getInitials(article.author)}
            </div>
          )}
          <div className="flex flex-col grow">
            <h3 className="font-display font-bold text-lg sm:text-xl text-navy">
              {article.author}
            </h3>
            {article.authorRole && (
              <p className="font-body text-xs sm:text-sm text-navy/70 mt-0.5">
                {article.authorRole}
              </p>
            )}
            {article.authorBio && (
              <p className="font-body text-sm text-navy/80 mt-2 leading-relaxed">
                {article.authorBio}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-body font-semibold">
              {article.authorEmail && (
                <a
                  href={`mailto:${article.authorEmail}`}
                  className="text-navy hover:text-orange underline transition-colors"
                >
                  Email
                </a>
              )}
              {article.authorGithub && (
                <a
                  href={article.authorGithub.startsWith('http') ? article.authorGithub : `https://github.com/${article.authorGithub}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-orange underline transition-colors"
                >
                  GitHub
                </a>
              )}
              {article.authorLinkedin && (
                <a
                  href={article.authorLinkedin.startsWith('http') ? article.authorLinkedin : `https://linkedin.com/in/${article.authorLinkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-orange underline transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 8. Back link */}
        <div className="article-section max-w-[720px] mx-auto pt-2 pb-12">
          <Link
            to="/blogs"
            className="inline-flex items-center text-sm font-body font-semibold text-navy hover:text-orange transition-colors"
          >
            ← All blogs
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
