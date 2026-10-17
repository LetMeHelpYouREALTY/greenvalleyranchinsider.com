import type { MetadataRoute } from 'next';
import { AI_CRAWLER_USER_AGENTS } from '@/lib/ai-crawlers';

const DISALLOW_API = ['/api/'];

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://www.greenvalleyranchinsider.com';

  return {
    rules: [
      {
        userAgent: [...AI_CRAWLER_USER_AGENTS],
        allow: '/',
        disallow: DISALLOW_API,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_API,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
