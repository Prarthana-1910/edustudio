import React from 'react';
import { Link } from 'react-router-dom';
import { RisingSun } from '@/components/ui/CivilMotifs';

function resolveImage(event) {
  const raw = event.image || event.coverImage;
  if (!raw) return null;
  if (raw.startsWith('/') || raw.startsWith('http')) return raw;
  return `/images/articles/${raw}`;
}

function shortMonth(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
}

function dayOfMonth(dateStr) {
  return new Date(dateStr).getDate();
}

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Upcoming event — full-width block with ~60% 16:9 image and beside it
 * huge orange day number, month in navy, title, location in navy/70,
 * two-line description. Alternating sides. Clickable link to /events/:slug.
 */
export const UpcomingEventBlock = ({
  event,
  reversed = false,
  dimmed = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!event) return null;
  const imageSrc = resolveImage(event);
  const shortDesc = event.summary || event.description;

  return (
    <Link
      to={`/events/${event.slug}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group block upcoming-block ${
        reversed ? 'wipe-right' : 'wipe-left'
      }`}
      style={{
        opacity: dimmed ? 0.6 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <article
        className={`flex flex-col gap-8 lg:gap-12 ${
          reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* 16:9 Image — about 60% width on desktop */}
        <div className="relative w-full lg:w-[60%] shrink-0 aspect-video overflow-hidden img-placeholder row-img-wrap">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={event.title}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const placeholder = e.currentTarget.nextElementSibling;
                if (placeholder) placeholder.style.display = 'flex';
              }}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center ${
              imageSrc ? 'hidden' : ''
            }`}
          >
            <RisingSun size={100} />
          </div>
        </div>

        {/* Content beside image */}
        <div className="flex flex-col justify-center w-full lg:w-[40%] row-text">
          {/* Huge orange day number and navy month */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="date-num font-display text-7xl sm:text-8xl lg:text-9xl font-black text-orange leading-none tabular-nums">
              {dayOfMonth(event.date)}
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-navy">
              {shortMonth(event.date)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-navy leading-tight transition-colors duration-200 group-hover:text-orange">
            {event.title}
          </h3>

          {/* Orange line growing beneath title on hover */}
          <div className="h-[2px] bg-orange mt-2 mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-2/3" />

          {/* Location in secondary navy text */}
          {event.location && (
            <p className="font-body text-sm sm:text-base text-navy/70 mb-2">
              {event.location}
            </p>
          )}

          {/* Two-line description */}
          {shortDesc && (
            <p className="font-body text-sm sm:text-base text-navy/70 leading-relaxed line-clamp-2">
              {shortDesc}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

/**
 * Past event — 3-column grid card.
 * 16:9 image first, small date badge on corner,
 * title, location, two-line description. Clickable link to /events/:slug.
 */
export const PastEventCard = ({
  event,
  dimmed = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!event) return null;
  const imageSrc = resolveImage(event);
  const shortDesc = event.summary || event.description;

  return (
    <Link
      to={`/events/${event.slug}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group block h-full past-card"
      style={{
        opacity: dimmed ? 0.6 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <article className="flex flex-col h-full">
        {/* 16:9 image with date badge on the corner */}
        <div className="relative aspect-video w-full overflow-hidden img-placeholder mb-4">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={event.title}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const placeholder = e.currentTarget.nextElementSibling;
                if (placeholder) placeholder.style.display = 'flex';
              }}
              className="card-img w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center ${
              imageSrc ? 'hidden' : ''
            }`}
          >
            <RisingSun size={75} />
          </div>

          {/* Date badge on image corner: navy background, paper text */}
          <div className="absolute top-3 left-3 bg-navy text-paper px-2.5 py-1 font-body text-xs font-semibold tracking-wide">
            {formatShortDate(event.date)}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col grow">
          <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-navy leading-snug transition-colors duration-200 group-hover:text-orange">
            {event.title}
          </h3>

          {/* Orange line growing beneath title on hover */}
          <div className="h-[2px] bg-orange mt-1.5 mb-2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-2/3" />

          {/* Location in secondary navy text */}
          {event.location && (
            <p className="font-body text-xs sm:text-sm text-navy/70 mb-1.5">
              {event.location}
            </p>
          )}

          {/* Two-line description */}
          {shortDesc && (
            <p className="font-body text-sm text-navy/70 leading-relaxed line-clamp-2">
              {shortDesc}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export const UpcomingEventCard = UpcomingEventBlock;
export const EventCard = PastEventCard;
export default EventCard;
