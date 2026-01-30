import type { Metadata } from 'next'
import { Building2Icon, ClockIcon, MailIcon, PhoneCallIcon } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ContactForm'
import { urlFor } from '@/sanity/lib/image'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'

/**
 * Contact Page Component
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - Responsive layout with contact info and form
 * - Accessible with proper ARIA attributes
 * - CMS-driven content from Sanity
 */

/**
 * Generate metadata for the Contact page from Sanity CMS.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: CONTACT_PAGE_QUERY,
    stega: false,
  })

  const contactPage = data?.contactPage
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

  return {
    title: contactPage?.seo?.title ?? 'Contact Us',
    description: contactPage?.seo?.description ?? undefined,
    openGraph: contactPage?.seo?.image?.asset
      ? {
          images: [
            {
              url: urlFor(contactPage.seo.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
    robots: contactPage?.seo?.noIndex
      ? { index: false, follow: false }
      : undefined,
    alternates: {
      canonical: contactPage?.seo?.canonicalUrl || `${baseUrl}/contact`,
    },
  }
}

export default async function ContactPage() {
  const { data } = await sanityFetch({
    query: CONTACT_PAGE_QUERY,
  })

  const contactPage = data?.contactPage
  const siteSettings = data?.siteSettings

  // Fallback values
  const eyebrow = contactPage?.eyebrow ?? 'Get in Touch'
  const title = contactPage?.title ?? 'Contact Us'
  const heading = contactPage?.heading ?? "WE'D LOVE TO HEAR FROM YOU"
  const description =
    contactPage?.description ??
    'In our world, we love clients who demand a premium product and service, who expect nothing but the best, refuse to cut corners and have an affinity for new perspective. If this sounds like you, we should meet.'
  const responseTimeText =
    contactPage?.responseTimeText ?? 'We typically respond within 24 hours'

  // Contact labels
  const addressLabel = contactPage?.contactLabels?.addressLabel ?? 'Visit Us'
  const phoneLabel = contactPage?.contactLabels?.phoneLabel ?? 'Call Us'
  const emailLabel = contactPage?.contactLabels?.emailLabel ?? 'Email Us'

  // Contact info from Site Settings
  const address =
    siteSettings?.contact?.address ??
    '15 King Street, Frankton, Hamilton, New Zealand'
  const phone = siteSettings?.contact?.phone ?? '0800 33 22 11'
  const email = siteSettings?.contact?.email ?? 'hello@xuba.co.nz'

  // Format phone for href
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`
  const emailHref = `mailto:${email}`

  return (
    <section
      aria-labelledby='contact-page-heading'
      className='relative isolate min-h-screen bg-white dark:bg-xuba-purple-900 flex flex-col items-center justify-center md:py-0 py-32 overflow-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      {/* Header Section */}
      <header className='relative z-10 flex flex-col items-center justify-center'>
        <div className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] mt-20 uppercase'>
          {eyebrow}
        </div>
        <h1
          id='contact-page-heading'
          className='text-xuba-green-900 dark:text-white md:text-7xl text-5xl font-thin tracking-tight mt-4 text-center'
        >
          {title.includes(' ') ? (
            <>
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                {title.split(' ').slice(-1)}
              </span>
            </>
          ) : (
            <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
              {title}
            </span>
          )}
        </h1>
      </header>

      {/* Main Content Grid */}
      <div className='relative z-10 mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
        {/* Left Column - Contact Info */}
        <div className='relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48'>
          <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
            <h2 className='text-lg md:text-3xl font-light tracking-tight text-pretty text-xuba-green-900 dark:text-white sm:text-3xl text-center md:text-start'>
              {heading}
              <span
                className='block w-16 h-1 bg-xuba-green-500 mt-4 mx-auto md:mx-0'
                aria-hidden='true'
              />
            </h2>
            <p className='mt-6 text-xuba-green-900 dark:text-gray-300 text-base text-center md:text-start leading-relaxed'>
              {description}
            </p>

            {/* Contact Info Items */}
            <dl className='mt-10 space-y-6 text-base/7 text-xuba-green-700 dark:text-gray-300'>
              <a
                href='https://maps.app.goo.gl/MdruTpLBcwko2yuV8'
                target='_blank'
                rel='noopener noreferrer'
                className='flex gap-x-4 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-xuba-green-50 dark:hover:bg-white/5 group'
              >
                <dt className='flex-none'>
                  <span className='sr-only'>Address</span>
                  <div className='w-12 h-12 rounded-full bg-xuba-green-100 dark:bg-xuba-green-500/10 flex items-center justify-center group-hover:bg-xuba-green-200 dark:group-hover:bg-xuba-green-500/20 transition-colors duration-300'>
                    <Building2Icon
                      aria-hidden='true'
                      className='h-6 w-6 text-xuba-green-500'
                    />
                  </div>
                </dt>
                <dd className='flex flex-col justify-center'>
                  <span className='text-xs text-xuba-green-500 dark:text-gray-400 uppercase tracking-wide mb-1'>
                    {addressLabel}
                  </span>
                  <span className='text-xuba-green-900 dark:text-white group-hover:text-xuba-green-500 dark:group-hover:text-xuba-green-400 transition-colors duration-300'>
                    {address}
                  </span>
                </dd>
              </a>

              <a
                href={phoneHref}
                className='flex gap-x-4 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-xuba-green-50 dark:hover:bg-white/5 group'
              >
                <dt className='flex-none'>
                  <span className='sr-only'>Telephone</span>
                  <div className='w-12 h-12 rounded-full bg-xuba-green-100 dark:bg-xuba-green-500/10 flex items-center justify-center group-hover:bg-xuba-green-200 dark:group-hover:bg-xuba-green-500/20 transition-colors duration-300'>
                    <PhoneCallIcon
                      aria-hidden='true'
                      className='h-6 w-6 text-xuba-green-500'
                    />
                  </div>
                </dt>
                <dd className='flex flex-col justify-center'>
                  <span className='text-xs text-xuba-green-500 dark:text-gray-400 uppercase tracking-wide mb-1'>
                    {phoneLabel}
                  </span>
                  <span className='text-xuba-green-900 dark:text-white group-hover:text-xuba-green-500 dark:group-hover:text-xuba-green-400 transition-colors duration-300'>
                    {phone}
                  </span>
                </dd>
              </a>

              <a
                href={emailHref}
                className='flex gap-x-4 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-xuba-green-50 dark:hover:bg-white/5 group'
              >
                <dt className='flex-none'>
                  <span className='sr-only'>Email</span>
                  <div className='w-12 h-12 rounded-full bg-xuba-green-100 dark:bg-xuba-green-500/10 flex items-center justify-center group-hover:bg-xuba-green-200 dark:group-hover:bg-xuba-green-500/20 transition-colors duration-300'>
                    <MailIcon
                      aria-hidden='true'
                      className='h-6 w-6 text-xuba-green-500'
                    />
                  </div>
                </dt>
                <dd className='flex flex-col justify-center'>
                  <span className='text-xs text-xuba-green-500 dark:text-gray-400 uppercase tracking-wide mb-1'>
                    {emailLabel}
                  </span>
                  <span className='text-xuba-green-900 dark:text-white group-hover:text-xuba-green-500 dark:group-hover:text-xuba-green-400 transition-colors duration-300'>
                    {email}
                  </span>
                </dd>
              </a>
            </dl>

            {/* Response Time */}
            <div className='mt-10 flex items-center gap-3 text-xuba-green-600 dark:text-gray-400'>
              <ClockIcon
                className='w-5 h-5 text-xuba-green-500'
                aria-hidden='true'
              />
              <span className='text-sm'>{responseTimeText}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form (Client Component) */}
        <ContactForm />
      </div>
    </section>
  )
}
