import type { MetadataRoute } from 'next';
import { sitemapLastModified } from '@/lib/sitemap-revisions';

type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const ROUTES: SitemapEntry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/green-valley-ranch', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/mystic-bay', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/the-cottages', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/location', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/buyers-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/sellers-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/market-insights', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/schools', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/resources', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/neighborhoods', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/investment-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/area-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/moving-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/financing-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/home-staging', changeFrequency: 'monthly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://www.greenvalleyranchinsider.com';

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: sitemapLastModified(path),
    changeFrequency,
    priority,
  }));
}
