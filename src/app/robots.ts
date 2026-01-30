import type { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for Xuba website.
 *
 * This file generates the robots.txt that tells search engine crawlers
 * which URLs they can access on the site.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/', // Sanity Studio - no need to index
          '/api/', // API routes - no need to index
          '/draft/', // Draft mode routes
          '/_next/', // Next.js internal routes
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
