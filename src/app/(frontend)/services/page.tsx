import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import { HomeServices } from '../../../../sections/Home/HomeServices'
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY, CONTACT_SECTION_QUERY } from '@/sanity/lib/queries'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'

/**
 * Services Page Component
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - Sanity CMS integration for dynamic content
 * - Reuses HomeServices bento grid component
 * - Accessible with proper ARIA attributes
 * - SEO optimized with metadata
 */

export const metadata: Metadata = {
  title: 'Our Services | Xuba IT Solutions',
  description:
    'Explore our comprehensive IT services including cloud technology, IT support, server security, system deployment, incident support, and SMB IT guidance.',
}

export default async function ServicesPage() {
  // Fetch homepage and contact section data in parallel
  const [{ data: homepage }, { data: contactData }] = await Promise.all([
    sanityFetch({ query: HOMEPAGE_QUERY }),
    sanityFetch({ query: CONTACT_SECTION_QUERY }),
  ])

  // Services section props (same as homepage)
  const servicesProps = {
    title: homepage?.servicesTitle ?? 'One-Stop IT Solutions',
    description:
      homepage?.servicesDescription ??
      'Explore our comprehensive IT services designed to streamline your business operations',
    serviceCards: homepage?.serviceCards ?? [],
  }

  // Contact section props
  const contactProps = {
    heading: contactData?.contactSection?.heading ?? undefined,
    subheading: contactData?.contactSection?.subheading ?? undefined,
    ctaLabel: contactData?.contactSection?.ctaLabel ?? undefined,
    ctaLink: contactData?.contactSection?.ctaLink ?? undefined,
    address: contactData?.contact?.address ?? undefined,
    phone: contactData?.contact?.phone ?? undefined,
    email: contactData?.contact?.email ?? undefined,
  }

  return (
    <main className='relative min-h-screen w-full h-full overflow-x-hidden'>
      {/* Hero Section */}
      <section
        aria-labelledby='services-page-heading'
        className='relative bg-white dark:bg-xuba-purple-900 py-20 sm:py-32 lg:py-56 overflow-hidden'
      >
        {/* Theme-aware background: DotPattern for light, Aurora for dark */}
        <ThemedHeroBackground />

        <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 md:mt-0'>
          <div className='flex flex-col items-center justify-center text-center'>
            <span className='text-xuba-green-500 text-sm sm:text-lg font-light tracking-widest uppercase'>
              What We Do
            </span>
            <h1
              id='services-page-heading'
              className='text-xuba-green-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mt-4'
            >
              Our{' '}
              <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                Services
              </span>
            </h1>
            <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-xuba-green-700 dark:text-gray-300 max-w-2xl'>
              We offer a robust range of IT support products and services to
              save you money, keep your systems happy, improve efficiency and
              help you work smarter.
            </p>
          </div>
        </div>
      </section>

      {/* Services Bento Grid - reuses HomeServices component */}
      <HomeServices {...servicesProps} />

      {/* Contact Section */}
      <ContactSection {...contactProps} />
    </main>
  )
}
