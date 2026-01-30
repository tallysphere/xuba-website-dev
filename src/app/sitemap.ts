import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'

/**
 * Sitemap configuration for Xuba website.
 *
 * Generates a dynamic sitemap that includes:
 * - Static pages (home, about, contact, etc.)
 * - Dynamic service pages from Sanity CMS
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

// Query to fetch all published services with their slugs
const SITEMAP_SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(title asc) {
    "slug": slug.current,
    _updatedAt
  }
`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

  // Fetch all services from Sanity
  const services = await client.fetch(SITEMAP_SERVICES_QUERY)

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic service pages from Sanity
  const servicePages: MetadataRoute.Sitemap =
    services?.map(
      (service: { slug: string; _updatedAt: string }) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }),
    ) ?? []

  return [...staticPages, ...servicePages]
}
