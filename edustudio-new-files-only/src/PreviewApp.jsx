import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import App from '@/App';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { WhatWeDo } from '@/pages/WhatWeDo';
import { Team } from '@/pages/Team';

/**
 * PREVIEW ONLY. Lets pages 1-4 run next to the co-head's app without editing App.jsx.
 * Run:  npm run dev  ->  open /preview.html (hash routes: /, /about, /what-we-do, /team; others fall through to her App)
 * The real merge is the 4 <Route> lines + 4 imports shown in MERGE-NOTES-PAGES-1-4.md.
 */
const Shell = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-paper text-navy selection:bg-orange selection:text-paper">
    <Navbar />
    <main className="grow">{children}</main>
    <Footer />
  </div>
);

export default function PreviewApp() {
  return (
    <Routes>
      <Route path="/" element={<Shell><Home /></Shell>} />
      <Route path="/about" element={<Shell><About /></Shell>} />
      <Route path="/what-we-do" element={<Shell><WhatWeDo /></Shell>} />
      <Route path="/team" element={<Shell><Team /></Shell>} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}
