/**
 * StructuredData - JSON-LD schema component for SEO.
 *
 * Renders structured data in the page head for search engines.
 * Supports Organization, WebPage, and custom schemas.
 */

interface OrganizationSchema {
  type: 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[] // Social media links
}

interface WebPageSchema {
  type: 'WebPage'
  name: string
  description: string
  url: string
}

interface StructuredDataProps {
  schema: OrganizationSchema | WebPageSchema | Record<string, unknown>
}

/**
 * Renders JSON-LD structured data for SEO.
 *
 * @example
 * <StructuredData
 *   schema={{
 *     type: 'Organization',
 *     name: 'Xuba',
 *     url: 'https://xuba.com',
 *     description: 'We help businesses grow'
 *   }}
 * />
 */
export function StructuredData({ schema }: StructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schema.type,
    ...schema,
  }

  // Remove the 'type' key as it's now '@type'
  delete (jsonLd as Record<string, unknown>).type

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * Pre-configured Xuba organization schema.
 * Use this in your layout or homepage.
 */
export function XubaOrganizationSchema() {
  return (
    <StructuredData
      schema={{
        type: 'Organization',
        name: 'Xuba',
        url: 'https://xuba.com',
        description: 'Software development and digital solutions for modern businesses.',
        // Add your actual social links here
        // sameAs: [
        //   'https://twitter.com/xuba',
        //   'https://linkedin.com/company/xuba',
        // ],
      }}
    />
  )
}
