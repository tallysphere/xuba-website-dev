import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { SERVICE_QUERY, SERVICE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

// Import section components
import {
  ServiceHero,
  ServiceIntro,
  ServiceBody,
  ServiceBenefitsStack,
  ServiceFAQ,
  ContactMiniCTA,
  ServiceCTA,
  RelatedServices,
} from '@/components/services'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all services at build time.
 * Uses client.fetch directly since generateStaticParams runs outside request scope.
 */
export async function generateStaticParams() {
  const services = await client.fetch(SERVICE_SLUGS_QUERY)

  return (
    services?.map((service: { slug: string }) => ({
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

      {/* Benefits Section (Scroll Stack) */}
      {service.benefits && service.benefits.length > 0 && (
        <ServiceBenefitsStack
          title={service.benefitsTitle}
          titleHighlight={service.benefitsHighlight}
          benefits={service.benefits}
        />
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <ServiceFAQ
          title={service.faqTitle}
          titleHighlight={service.faqTitleHighlight}
          faqs={service.faqs}
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
