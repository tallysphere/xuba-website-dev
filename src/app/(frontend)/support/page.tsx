import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'
import { sanityFetch } from '@/sanity/lib/live'
import { SUPPORT_PAGE_QUERY, CONTACT_SECTION_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

/**
 * Support Page Component
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - TeamViewer Quick Support integration (CMS configurable)
 * - Accessible with proper ARIA attributes
 * - Responsive design
 * - SEO optimized with metadata from CMS
 */

/**
 * Generate metadata for the Support page from Sanity CMS.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: SUPPORT_PAGE_QUERY,
    stega: false,
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

  return {
    title: data?.seo?.title ?? 'Quick Support | Xuba IT Solutions',
    description:
      data?.seo?.description ??
      'Get instant IT support through our secure TeamViewer connection. Our dedicated team is ready to assist with remote troubleshooting and technical guidance.',
    openGraph: data?.seo?.image
      ? {
          images: [
            {
              url: urlFor(data.seo.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
    robots: data?.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: data?.seo?.canonicalUrl || `${baseUrl}/support`,
    },
  }
}

export default async function SupportPage() {
  // Fetch support page and contact section data in parallel
  const [{ data: supportPage }, { data: contactData }] = await Promise.all([
    sanityFetch({ query: SUPPORT_PAGE_QUERY }),
    sanityFetch({ query: CONTACT_SECTION_QUERY }),
  ])

  // Hero section content from Support Page singleton
  const eyebrow = supportPage?.eyebrow ?? 'Need Quick Support?'
  const title = supportPage?.title ?? 'Quick Support'
  const titleHighlight = supportPage?.titleHighlight ?? 'Support'
  const description =
    supportPage?.description ??
    'We are here to help you with your IT needs. Our dedicated support team is ready to assist you with remote troubleshooting, system diagnostics, software installations, and technical guidance. Get instant access to professional IT support through our secure TeamViewer connection below.'

  // TeamViewer settings
  const teamViewerUrl =
    supportPage?.teamViewerUrl ?? 'https://get.teamviewer.com/xubasupport'
  const teamViewerTitle =
    supportPage?.teamViewerTitle ?? 'TeamViewer Quick Support'

  // Format the title with highlight
  const titleParts = title.split(titleHighlight)
  const hasHighlight = titleParts.length > 1

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
    <section
      aria-labelledby='support-page-heading'
      className='relative bg-white dark:bg-xuba-purple-900 py-20 sm:py-32 lg:py-56 overflow-x-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      <div className='relative z-10 mx-auto flex flex-col md:mt-0 mt-20 items-center justify-center max-w-7xl gap-12 sm:gap-20 px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <header className='max-w-4xl flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xuba-green-500 text-sm sm:text-lg font-light tracking-wider text-center uppercase'>
              {eyebrow}
            </span>
            <h1
              id='support-page-heading'
              className='text-xuba-green-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mt-4 text-center'
            >
              {hasHighlight ? (
                <>
                  {titleParts[0]}
                  <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                    {titleHighlight}
                  </span>
                  {titleParts[1]}
                </>
              ) : (
                title
              )}
            </h1>
          </div>
          <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-xuba-green-700 dark:text-gray-300 text-center max-w-3xl px-4'>
            {description}
          </p>
        </header>

        {/* TeamViewer Embed */}
        <div
          id='custom-team-viewer-quick-support'
          className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto'
        >
          <div className='w-full bg-xuba-green-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-xuba-green-200 dark:border-gray-700'>
            {/* Window Title Bar */}
            <div className='bg-xuba-green-200 dark:bg-gray-700 px-4 py-2 flex items-center gap-2'>
              <div
                className='w-3 h-3 bg-red-500 rounded-full'
                aria-hidden='true'
              />
              <div
                className='w-3 h-3 bg-yellow-500 rounded-full'
                aria-hidden='true'
              />
              <div
                className='w-3 h-3 bg-green-500 rounded-full'
                aria-hidden='true'
              />
              <span className='text-xuba-green-700 dark:text-gray-300 text-sm ml-4'>
                {teamViewerTitle}
              </span>
            </div>
            {/* TeamViewer iframe */}
            <iframe
              src={teamViewerUrl}
              className='w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen'
              title={`Xuba - ${teamViewerTitle}`}
              loading='lazy'
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className='px-4 sm:px-6 lg:px-8'>
        <ContactSection {...contactProps} />
      </div>
    </section>
  )
}
