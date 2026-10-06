import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="bg-navy text-paper w-full pt-[48px] pb-[24px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        {/* Top Part: Get In Touch */}
        <div>
          <h2 className="font-display uppercase font-bold text-[2.5rem] tracking-tight text-paper mb-[12px] leading-none">
            Get in touch
          </h2>
          <p className="font-body text-base sm:text-lg text-paper/80 max-w-2xl mb-[12px] leading-relaxed">
            For students looking to join our chapter and professionals interested in collaborating with us.
          </p>
          <div className="flex flex-col gap-[12px] font-body text-base sm:text-lg">
            <div>
              <span className="font-semibold text-paper">Email: </span>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="text-paper underline hover:text-orange transition-colors"
              >
                {siteConfig.social.email}
              </a>
            </div>
            <div>
              <span className="font-semibold text-paper">Instagram: </span>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline hover:text-orange transition-colors"
              >
                @edu.studio_
              </a>
            </div>
            <div>
              <span className="font-semibold text-paper">LinkedIn: </span>
              {siteConfig.social.linkedin ? (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper underline hover:text-orange transition-colors"
                >
                  {siteConfig.social.linkedin}
                </a>
              ) : (
                <span className="text-paper/70">coming soon</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Part: Copyright */}
        <div className="border-t border-paper/15 mt-[16px] pt-[16px] text-sm font-body text-paper/70">
          © {new Date().getFullYear()} EduStudio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
