import React from 'react';

/**
 * Civil Engineering Architectural & Sketch Motifs
 * Strictly uses color tokens: navy, orange, concrete, paper, yellow.
 */

// Rising Sun Circle Motif (Civil dawn, industry horizon)
export const RisingSun = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size / 2}
    viewBox="0 0 100 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible ${className}`}
  >
    <defs>
      <clipPath id="sunCut">
        <rect x="0" y="0" width="100" height="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#sunCut)">
      {/* Sun disk */}
      <circle cx="50" cy="50" r="44" fill="#F28C28" fillOpacity="0.2" />
      <circle cx="50" cy="50" r="34" fill="#F28C28" />
      <circle cx="50" cy="50" r="22" fill="#F4C542" />
      {/* Radial sun lines */}
      <line x1="50" y1="6" x2="50" y2="0" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="18" x2="13" y2="13" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="82" y1="18" x2="87" y2="13" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6" y1="50" x2="0" y2="50" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="94" y1="50" x2="100" y2="50" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    {/* Horizon line */}
    <line x1="0" y1="50" x2="100" y2="50" stroke="#172A3A" strokeWidth="3" />
  </svg>
);

// Sketch-style Cable-Stayed Bridge motif
export const BridgeSketch = ({ className = '', strokeColor = 'currentColor' }) => (
  <svg
    viewBox="0 0 400 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Foundation / Piers */}
    <rect x="75" y="80" width="10" height="40" fill={strokeColor} fillOpacity="0.3" />
    <rect x="315" y="80" width="10" height="40" fill={strokeColor} fillOpacity="0.3" />

    {/* Central Pylons */}
    <path d="M190 120 L198 10 L202 10 L210 120" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="195" y1="40" x2="205" y2="40" stroke={strokeColor} strokeWidth="1.5" />
    <line x1="193" y1="75" x2="207" y2="75" stroke={strokeColor} strokeWidth="1.5" />

    {/* Deck */}
    <line x1="10" y1="80" x2="390" y2="80" stroke={strokeColor} strokeWidth="3" />
    <line x1="10" y1="84" x2="390" y2="84" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />

    {/* Stay Cables */}
    <line x1="200" y1="16" x2="90" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="200" y1="26" x2="120" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="200" y1="38" x2="150" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="200" y1="52" x2="175" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />

    <line x1="200" y1="16" x2="310" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="200" y1="26" x2="280" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="200" y1="38" x2="250" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="200" y1="52" x2="225" y2="80" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />

    {/* Technical dimension markers */}
    <circle cx="200" cy="80" r="3" fill="#F28C28" />
    <text x="210" y="75" fill={strokeColor} fillOpacity="0.6" fontSize="8" fontFamily="JetBrains Mono">PIER-01</text>
  </svg>
);

// Sketch-style Tower Crane motif
export const TowerCraneSketch = ({ className = '', strokeColor = 'currentColor' }) => (
  <svg
    viewBox="0 0 240 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Base mast */}
    <line x1="75" y1="260" x2="75" y2="60" stroke={strokeColor} strokeWidth="2.5" />
    <line x1="85" y1="260" x2="85" y2="60" stroke={strokeColor} strokeWidth="2.5" />
    {/* Lattice diagonals */}
    <path d="M75 250 L85 240 M75 240 L85 230 M75 220 L85 210 M75 200 L85 190 M75 180 L85 170 M75 160 L85 150 M75 140 L85 130 M75 120 L85 110 M75 100 L85 90 M75 80 L85 70" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.6" />
    
    {/* Slewing ring / Cabin */}
    <rect x="71" y="50" width="18" height="12" fill={strokeColor} fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.5" />
    <rect x="88" y="52" width="10" height="9" fill="#F28C28" />

    {/* Apex Tower */}
    <polygon points="76,50 84,20 84,50" stroke={strokeColor} strokeWidth="1.5" fill="none" />

    {/* Counter-jib (left) */}
    <line x1="75" y1="50" x2="20" y2="50" stroke={strokeColor} strokeWidth="2" />
    <line x1="84" y1="20" x2="20" y2="50" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    {/* Counterweight */}
    <rect x="22" y="51" width="14" height="10" fill={strokeColor} stroke={strokeColor} strokeWidth="1.5" />

    {/* Working Jib (right) */}
    <line x1="85" y1="50" x2="225" y2="50" stroke={strokeColor} strokeWidth="2.5" />
    <line x1="84" y1="20" x2="160" y2="50" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />
    <line x1="84" y1="20" x2="220" y2="50" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.75" />

    {/* Trolley & Hoist Line */}
    <rect x="155" y="47" width="8" height="6" fill="#F4C542" />
    <line x1="159" y1="53" x2="159" y2="120" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="3 2" />
    {/* Hook */}
    <path d="M156 120 C156 125, 162 125, 162 122" stroke={strokeColor} strokeWidth="2" fill="none" />
  </svg>
);

// Wordmark / Logo component using the EduStudio logo image
export const EduStudioWordmark = ({ className = '', alt = 'EduStudio' }) => (
  <img
    src="/images/logo.png"
    alt={alt}
    className={`h-[36px] md:h-[44px] w-auto object-contain ${className}`}
  />
);
