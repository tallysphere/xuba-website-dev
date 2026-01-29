import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type LocalBusinessData = {
  businessType?: string
  legalName?: string
  description?: string
  streetAddress?: string
  city?: string
  region?: string
  postalCode?: string
  country?: string
  latitude?: number
  longitude?: number
  priceRange?: string
  openingHours?: string[]
  serviceArea?: string[]
  foundingDate?: string
  numberOfEmployees?: number
}

type SiteSettings = {
  siteName?: string
  logo?: { asset?: { _ref: string } }
  contact?: {
    phone?: string
    email?: string
    address?: string
  }
  socialLinks?: Array<{
    platform: string
    url: string
  }>
  localBusiness?: LocalBusinessData
}

/**
 * JSON-LD Structured Data Component
 *
 * Outputs Organization/LocalBusiness schema for search engines.
 * Should be included in the root layout.
 */
export async function JsonLd() {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false, // Critical: no stega in structured data
  })

  if (!settings) return null

  const siteSettings = settings as SiteSettings
  const localBusiness = siteSettings.localBusiness
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

  // Build the JSON-LD object
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': localBusiness?.businessType || 'ProfessionalService',
    name: siteSettings.siteName || 'Xuba',
    url: baseUrl,
  }

  // Legal name
  if (localBusiness?.legalName) {
    jsonLd.legalName = localBusiness.legalName
  }

  // Description
  if (localBusiness?.description) {
    jsonLd.description = localBusiness.description
  }

  // Logo
  if (siteSettings.logo?.asset) {
    jsonLd.logo = urlFor(siteSettings.logo).width(600).url()
    jsonLd.image = urlFor(siteSettings.logo).width(1200).url()
  }

  // Contact information
  if (siteSettings.contact?.phone) {
    jsonLd.telephone = siteSettings.contact.phone
  }
  if (siteSettings.contact?.email) {
    jsonLd.email = siteSettings.contact.email
  }

  // Address
  if (localBusiness?.streetAddress || localBusiness?.city) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      ...(localBusiness.streetAddress && {
        streetAddress: localBusiness.streetAddress,
      }),
      ...(localBusiness.city && { addressLocality: localBusiness.city }),
      ...(localBusiness.region && { addressRegion: localBusiness.region }),
      ...(localBusiness.postalCode && { postalCode: localBusiness.postalCode }),
      ...(localBusiness.country && { addressCountry: localBusiness.country }),
    }
  }

  // Geo coordinates
  if (localBusiness?.latitude && localBusiness?.longitude) {
    jsonLd.geo = {
      '@type': 'GeoCoordinates',
      latitude: localBusiness.latitude,
      longitude: localBusiness.longitude,
    }
  }

  // Price range
  if (localBusiness?.priceRange) {
    jsonLd.priceRange = localBusiness.priceRange
  }

  // Opening hours
  if (localBusiness?.openingHours && localBusiness.openingHours.length > 0) {
    jsonLd.openingHours = localBusiness.openingHours
  }

  // Service area
  if (localBusiness?.serviceArea && localBusiness.serviceArea.length > 0) {
    jsonLd.areaServed = localBusiness.serviceArea.map((area) => ({
      '@type': 'City',
      name: area,
    }))
  }

  // Founding date
  if (localBusiness?.foundingDate) {
    jsonLd.foundingDate = localBusiness.foundingDate
  }

  // Number of employees
  if (localBusiness?.numberOfEmployees) {
    jsonLd.numberOfEmployees = {
      '@type': 'QuantitativeValue',
      value: localBusiness.numberOfEmployees,
    }
  }

  // Social profiles (sameAs)
  if (siteSettings.socialLinks && siteSettings.socialLinks.length > 0) {
    jsonLd.sameAs = siteSettings.socialLinks.map((link) => link.url)
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
