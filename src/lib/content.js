import fallbackEvents from '@/data/fallback/events.json';

// Import all markdown files in src/content/articles
const articleModules = import.meta.glob('/src/content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * Parses frontmatter key-value pairs and body from raw markdown string.
 */
function parseFrontmatter(rawMarkdown) {
  const normalized = (typeof rawMarkdown === 'string' ? rawMarkdown : rawMarkdown?.default || '').replace(/\r\n/g, '\n');
  // Match frontmatter block whether preceded by comments/whitespace or directly at file start
  const match = normalized.match(/^(?:<!--[\s\S]*?-->\s*)?---\n([\s\S]*?)\n---\n?([\s\S]*)$/) || normalized.match(/---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: normalized };
  }

  const frontmatterRaw = match[1];
  const body = match[2];
  const data = {};

  const lines = frontmatterRaw.split('\n');
  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentKey) {
      const item = trimmed.slice(2).trim().replace(/^["']|["']$/g, '');
      if (Array.isArray(data[currentKey])) {
        data[currentKey].push(item);
      } else {
        data[currentKey] = [item];
      }
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();

      if (val === '') {
        currentKey = key;
        data[key] = [];
      } else {
        currentKey = null;
        if (val.startsWith('[') && val.endsWith(']')) {
          data[key] = val
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^["']|["']$/g, ''))
            .filter(Boolean);
        } else {
          val = val.replace(/^["']|["']$/g, '');
          data[key] = val;
        }
      }
    }
  }

  return { data, content: body };
}

/**
 * Loads and constructs article objects from markdown modules.
 */
function loadMarkdownArticles() {
  const articles = [];
  for (const path in articleModules) {
    const rawContent = articleModules[path];
    const filenameMatch = path.match(/\/([^/]+)\.md$/);
    const defaultSlug = filenameMatch ? filenameMatch[1] : '';

    const { data, content } = parseFrontmatter(rawContent);
    const slug = data.slug || defaultSlug;

    articles.push({
      id: slug,
      slug,
      title: data.title || '',
      subtitle: data.subtitle || '',
      author: data.author || '',
      authorRole: data.authorRole || '',
      authorBio: data.authorBio || '',
      authorPhoto: data.authorPhoto || '',
      authorEmail: data.authorEmail || '',
      authorGithub: data.authorGithub || '',
      authorLinkedin: data.authorLinkedin || '',
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      summary: data.summary || data.subtitle || '',
      image: data.image || '',
      imageCaption: data.imageCaption || '',
      body: content,
    });
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Retrieves all articles sorted by date (newest first).
 */
export function getArticles() {
  return loadMarkdownArticles();
}

/**
 * Retrieves an article by slug.
 */
export function getArticleBySlug(slug) {
  if (!slug) return undefined;
  const articles = getArticles();
  return articles.find((art) => art.slug === slug);
}

/**
 * Retrieves all events sorted by date.
 */
export function getEvents() {
  return [...fallbackEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Retrieves upcoming events sorted by date ascending.
 */
export function getUpcomingEvents() {
  const now = new Date().getTime();
  return fallbackEvents
    .filter((ev) => ev.status === 'upcoming' || new Date(ev.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Retrieves past events sorted by date descending.
 */
export function getPastEvents() {
  const now = new Date().getTime();
  return fallbackEvents
    .filter((ev) => ev.status === 'past' || new Date(ev.date).getTime() < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
