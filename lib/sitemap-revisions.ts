/**
 * Stable sitemap lastmod dates — avoid uniform build-time timestamps on every URL.
 * Update a path's date when that page's substantive content changes.
 */
const REVISIONS: Record<string, string> = {
  '/': '2026-10-17',
  '/green-valley-ranch': '2026-08-15',
  '/mystic-bay': '2026-08-15',
  '/the-cottages': '2026-08-15',
  '/location': '2026-07-20',
  '/contact': '2026-09-01',
  '/faq': '2026-08-01',
  '/about': '2026-08-01',
  '/services': '2026-08-01',
  '/buyers-guide': '2026-07-10',
  '/sellers-guide': '2026-07-10',
  '/testimonials': '2026-06-01',
  '/market-insights': '2026-09-15',
  '/schools': '2026-07-01',
  '/resources': '2026-07-01',
  '/neighborhoods': '2026-08-15',
  '/investment-guide': '2026-06-15',
  '/area-guide': '2026-08-01',
  '/privacy': '2026-01-01',
  '/terms': '2026-01-01',
  '/disclaimer': '2026-01-01',
  '/moving-guide': '2026-07-01',
  '/financing-guide': '2026-07-01',
  '/home-staging': '2026-07-01',
};

export function sitemapLastModified(path: string): Date {
  const iso = REVISIONS[path] ?? '2026-06-01';
  return new Date(`${iso}T12:00:00.000Z`);
}
