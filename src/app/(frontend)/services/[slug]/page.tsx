import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { SERVICE_QUERY, SERVICE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

// Import section components
import {
  ServiceHero,
  ServiceIntro,
  ServiceBody,
  ServiceBenefits,
  ServiceFeatures,
  ContactMiniCTA,
  ServiceCTA,
  RelatedServices,
} from '@/components/services'
import WhyXuba from '../../../../../sections/Home/WhyXuba'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all services at build time.
 */
export async function generateStaticParams() {
  const { data: services } = await sanityFetch({
    query: SERVICE_SLUGS_QUERY,
    stega: false,
  })

  return (
    services?.map((service) => ({
      slug: service.slug,
    })) ?? []
  )
}

/**
 * Generate metadata for the service page from Sanity CMS.
 */
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: service } = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    stega: false,
  })

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.shortDescription,
    openGraph: service.seo?.image?.asset
      ? {
          images: [
            {
              url: urlFor(service.seo.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
    robots: service.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

/**
 * Service page component that renders content from Sanity.
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const { data: service } = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
  })

  if (!service) {
    notFound()
  }

  return (
    <main className='bg-xuba-purple-900 min-h-screen'>
      {/* Hero Section */}
      <ServiceHero
        title={service.title}
        tagline={service.tagline}
        taglineHighlight={service.taglineHighlight}
        subtitle={service.subtitle}
        heroImage={service.heroImage}
      />

      {/* Introduction Section */}
      {service.introText && (
        <ServiceIntro
          text={service.introText}
          highlights={service.introHighlights}
        />
      )}

      {/* Rich Text Body Content */}
      {service.bodyContent && (
        <ServiceBody content={service.bodyContent} />
      )}

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <ServiceBenefits
          title={service.benefitsTitle}
          titleHighlight={service.benefitsHighlight}
          benefits={service.benefits}
        />
      )}

      {/* Contact Mini-CTA Section */}
      {service.contactCta?.enabled && (
        <ContactMiniCTA
          enabled={service.contactCta.enabled}
          heading={service.contactCta.heading}
          buttonText={service.contactCta.buttonText}
          buttonLink={service.contactCta.buttonLink}
        />
      )}

      {/* What We Handle Section */}
      {service.serviceItems && service.serviceItems.length > 0 && (
        <ServiceFeatures
          title={service.servicesTitle}
          titleHighlight={service.servicesTitleHighlight}
          items={service.serviceItems}
          centerIcon={service.icon}
        />
      )}

      {/* Why Xuba Section */}
      <WhyXuba />

      {/* CTA Section */}
      <ServiceCTA
        headline={service.ctaHeadline}
        highlight={service.ctaHighlight}
        subtext={service.ctaSubtext}
        buttonText={service.ctaButtonText}
        buttonLink={service.ctaButtonLink}
        serviceName={service.title}
      />

      {/* Related Services Section */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <RelatedServices services={service.relatedServices} />
      )}
    </main>
  )
}
