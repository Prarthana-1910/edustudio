# Pages 1-4 (Home, About, What We Do, Team): merge notes

Only NEW files were added. No existing file was edited.

## New files
- src/pages/{Home,About,WhatWeDo,Team}.jsx
- src/components/pages/{PageHero,ImagePlaceholder}.jsx
- src/styles/pages-1-4.css (own hover/stripe styles; imported by the pages)
- src/data/{pages,team,community}.json (all DUMMY content)
- public/images/hero/{home,about,whatwedo,team}-hero.jpg (dummy, cropped from screenshots)
- Preview only: preview.html, src/preview-main.jsx, src/PreviewApp.jsx.
  Run `npm run dev`, open /preview.html (hash routes: #/, #/about, #/what-we-do, #/team).
  Delete these three files after merging.

## To merge (the only edits to her files, do together in the meeting)
- App.jsx: import the four pages, replace the `/` redirect with `<Route path="/" element={<Home />} />`, add routes /about, /what-we-do, /team.
- Navbar.jsx: navLinks = Home, About, What We Do, Team, Blogs, Events.

## Suggestions for the meeting
1. Navbar will have 6 links plus Contact; check it fits on mobile.
2. Hover: hers lifts ~4px; ours lifts 12px with shadow + orange border (`--lift-y` in pages-1-4.css). Pick one and use it everywhere, including her cards.
3. `bg-hazard-stripes` (used by her HazardDivider) is not defined anywhere, so it renders nothing. Ours uses `.stripes-p14`. Define one shared class in index.css.
4. Her heroes are `min-h-screen`; with short taglines that feels tall. Maybe ~70vh on inner pages.
5. Tagline wording ("Collective" vs "Club") appears in her Navbar/Footer; confirm.
6. Her `/` redirects to /events; Home should become `/`.
7. Three stray md files in src/content/ are never loaded; delete or move into articles/.
8. `<!-- SAMPLE POST -->` in article markdown showed as text in her screenshot; remove.
9. Hero photos here are dummy crops; the team one has a stray "Sep 19, 2026" from the screenshot. Replace with originals.
10. Reveal/SectionHeader/HazardDivider live in `ui/_stubs`; decide whether to promote them to real components.
11. Fonts load only from Google Fonts; consider self-hosting.
