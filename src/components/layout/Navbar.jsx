import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll position for solid bg after 40px
  useEffect(() => {
    const onScroll = () => {
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 40);
    };
    onScroll(); // check on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Blogs', to: '/blogs' },
    { label: 'Events', to: '/events' },
  ];

  const handleContactClick = (e) => {
    e?.preventDefault();
    setMobileMenuOpen(false);

    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-md border-b border-concrete text-navy shadow-xs'
          : 'bg-transparent border-b border-transparent text-paper'
      }`}
    >
      {/* Main Navigation Row */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 h-[72px] md:h-[96px] w-full flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/events"
          className="flex items-center gap-3 md:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
          {/* Logo image directly: no rounded square, no background box, no padding/margin */}
          <img
            src="/images/logo.png"
            alt="EduStudio"
            className="h-[40px] md:h-[48px] w-auto shrink-0"
          />

          {/* Name as text: EduStudio (mixed-case, 34px desktop / 26px mobile), A Civil Engineering Collective (13px, 80% opacity) */}
          <div className="flex flex-col select-none">
            <div className="font-display font-bold text-[26px] md:text-[34px] tracking-tight leading-none">
              <span className={scrolled ? 'text-navy' : 'text-paper'}>Edu</span>
              <span className="text-orange">Studio</span>
            </div>
            <span
              className={`font-body text-[13px] tracking-wide font-normal transition-colors mt-0.5 ${
                scrolled ? 'text-navy/80' : 'text-paper/80'
              }`}
            >
              A Civil Engineering Collective
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-display uppercase font-bold tracking-wider text-[1.25rem]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                  scrolled
                    ? isActive
                      ? 'text-orange font-black'
                      : 'text-navy hover:text-orange'
                    : isActive
                      ? 'text-orange font-black'
                      : 'text-paper hover:text-orange'
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col">
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange" />
                  )}
                </div>
              )}
            </NavLink>
          ))}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="px-7 py-2.5 bg-orange text-paper font-display uppercase font-bold text-[1.25rem] tracking-wider hover:bg-[#e07d1a] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange cursor-pointer"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 hover:text-orange border border-concrete/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange transition-colors ${
            scrolled ? 'text-navy' : 'text-paper'
          }`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-b border-concrete px-4 py-6 text-navy shadow-lg">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 text-[1.1rem] font-display uppercase font-bold tracking-wider transition-colors ${
                    isActive ? 'text-orange pl-2 border-l-4 border-orange' : 'text-navy hover:text-orange'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="block w-full text-center py-3 px-6 bg-orange text-paper font-display uppercase font-bold text-[1.1rem] tracking-wider hover:bg-[#e07d1a] transition-colors mt-2 cursor-pointer"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
