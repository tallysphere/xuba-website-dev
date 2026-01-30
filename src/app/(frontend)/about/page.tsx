import type { Metadata } from 'next'
import Image from 'next/image'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'
import ContactSection from '@/components/ContactSection'
import CountUpStats from '@/components/CountUpStats'
import { sanityFetch } from '@/sanity/lib/live'
import {
  TEAM_MEMBERS_QUERY,
  ABOUT_PAGE_QUERY,
  CONTACT_SECTION_QUERY,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

/**
 * About Page Component
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - Sanity CMS integration for dynamic content
 * - Team member grid
 * - Animated statistics counter
 * - Accessible with proper ARIA attributes
 * - SEO optimized with metadata
 */

/**
 * Generate metadata for the About page from Sanity CMS.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: aboutPage } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    stega: false,
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

  return {
    title: aboutPage?.seo?.title ?? 'About Us | Xuba IT Solutions',
    description: aboutPage?.seo?.description ?? undefined,
    openGraph: aboutPage?.seo?.image?.asset
      ? {
          images: [
            {
              url: urlFor(aboutPage.seo.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
    robots: aboutPage?.seo?.noIndex
      ? { index: false, follow: false }
      : undefined,
    alternates: {
      canonical: aboutPage?.seo?.canonicalUrl || `${baseUrl}/about`,
    },
  }
}

// Fallback stats if not configured in Sanity
const defaultStats = [
  { label: 'Years in Business', value: '10', postfix: '' },
  { label: 'Clients', value: '100', postfix: '+' },
  { label: 'Projects', value: '1000', postfix: '+' },
]

export default async function AboutPage() {
  // Fetch about page content, team members, and contact section in parallel
  const [{ data: aboutPage }, { data: teamMembers }, { data: contactData }] =
    await Promise.all([
      sanityFetch({ query: ABOUT_PAGE_QUERY }),
      sanityFetch({ query: TEAM_MEMBERS_QUERY }),
      sanityFetch({ query: CONTACT_SECTION_QUERY }),
    ])

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

  // Use Sanity stats or fallback to defaults
  const stats = aboutPage?.stats?.length
    ? aboutPage.stats.map(
        (stat: {
          label: string | null
          value: string | null
          postfix: string | null
        }) => ({
          label: stat.label ?? '',
          value: stat.value ?? '0',
          postfix: stat.postfix ?? '',
        }),
      )
    : defaultStats

  return (
    <section
      aria-labelledby='about-page-heading'
      className='relative w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-xuba-purple-900 py-12 sm:py-20 overflow-x-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark - constrained to top third */}
      <div
        className='absolute top-0 left-0 right-0 h-[50vh] overflow-hidden'
        style={{
          mask: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
        aria-hidden='true'
      >
        <ThemedHeroBackground />
      </div>

      {/* Page Header */}
      <header className='relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:mt-0 mt-20 pb-12 sm:pb-16 lg:pb-20'>
        <span className='text-xuba-green-500 text-sm sm:text-lg font-light tracking-widest mt-12 sm:mt-20 text-center uppercase'>
          {aboutPage?.headerEyebrow ?? 'Who Are We?'}
        </span>
        <h1
          id='about-page-heading'
          className='text-xuba-green-900 dark:text-white text-4xl sm:text-5xl md:text-7xl font-thin tracking-tight mt-4 text-center max-w-4xl'
        >
          {aboutPage?.headerTitle ?? 'Our'}{' '}
          <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
            {aboutPage?.headerTitleHighlight ?? 'Team'}
          </span>
        </h1>
      </header>

      <main className='relative isolate z-10 w-full'>
        {/* Hero section - "Our People" style with landscape images */}
        <div className='overflow-hidden pt-8 sm:pt-12 lg:pt-16'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8'>
              {/* Hero Text */}
              <div className='lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-xuba-green-900 dark:text-white text-center lg:text-left'>
                  {aboutPage?.heroTitle ?? 'Clever IT & Clever People'}
                </h2>
                <p className='mt-6 text-lg sm:text-xl leading-8 text-xuba-green-700 dark:text-gray-300 text-center lg:text-left'>
                  {aboutPage?.heroSubtitle ??
                    `Xuba was conceived from a shared vision for faster, smarter
                    IT technology coupled with bright spark, cut above the rest
                    IT support service. We believe in quick. We believe in
                    quality. And we're passionately committed to doing
                    things better. The result? It's really quite simple; we
                    help our clients sleep at night.`}
                </p>
              </div>

              {/* Hero Images - Landscape layout */}
              {aboutPage?.heroImages && aboutPage.heroImages.length > 0 && (
                <div className='flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents'>
                  {/* Large image - top right */}
                  {aboutPage.heroImages[0]?.asset && (
                    <div className='w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end'>
                      <Image
                        alt={aboutPage.heroImages[0].alt ?? 'About us image'}
                        src={urlFor(aboutPage.heroImages[0])
                          .width(1152)
                          .height(823)
                          .fit('crop')
                          .url()}
                        className='aspect-7/5 w-148 max-w-none rounded-2xl bg-xuba-green-100 dark:bg-gray-800 object-cover'
                        width={1152}
                        height={823}
                      />
                    </div>
                  )}

                  <div className='contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-148 lg:items-start lg:justify-end lg:gap-x-8'>
                    {/* Small image - bottom left of grid */}
                    {aboutPage.heroImages[1]?.asset && (
                      <div className='order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto'>
                        <Image
                          alt={aboutPage.heroImages[1].alt ?? 'About us image'}
                          src={urlFor(aboutPage.heroImages[1])
                            .width(768)
                            .height(604)
                            .fit('crop')
                            .url()}
                          className='aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-xuba-green-100 dark:bg-gray-800 object-cover'
                          width={768}
                          height={604}
                        />
                      </div>
                    )}

                    {/* Medium image - center */}
                    {aboutPage.heroImages[2]?.asset && (
                      <div className='flex w-96 flex-auto justify-end lg:w-auto lg:flex-none'>
                        <Image
                          alt={aboutPage.heroImages[2].alt ?? 'About us image'}
                          src={urlFor(aboutPage.heroImages[2])
                            .width(1152)
                            .height(842)
                            .fit('crop')
                            .url()}
                          className='aspect-7/5 w-148 max-w-none flex-none rounded-2xl bg-xuba-green-100 dark:bg-gray-800 object-cover max-sm:w-120'
                          width={1152}
                          height={842}
                        />
                      </div>
                    )}

                    {/* Small image - bottom right */}
                    {aboutPage.heroImages[3]?.asset && (
                      <div className='hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none'>
                        <Image
                          alt={aboutPage.heroImages[3].alt ?? 'About us image'}
                          src={urlFor(aboutPage.heroImages[3])
                            .width(768)
                            .height(604)
                            .fit('crop')
                            .url()}
                          className='aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-xuba-green-100 dark:bg-gray-800 object-cover'
                          width={768}
                          height={604}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pretty text-xuba-green-900 dark:text-white text-center lg:text-left'>
              {aboutPage?.missionTitle ?? 'Our mission'}
            </h2>
            <div className='mt-6 flex flex-col gap-x-8 gap-y-12 sm:gap-y-20 lg:flex-row'>
              <div className='lg:w-full lg:max-w-2xl lg:flex-auto'>
                <p className='text-lg sm:text-xl leading-8 text-xuba-green-700 dark:text-gray-200 text-center lg:text-left'>
                  {aboutPage?.missionIntro ??
                    `Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                  sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                  id at vitae feugiat egestas ac. Diam nulla orci at in viverra
                  scelerisque eget. Eleifend egestas fringilla sapien.`}
                </p>
                {aboutPage?.missionBody && (
                  <p className='mt-6 sm:mt-10 text-base leading-7 text-xuba-green-600 dark:text-gray-200 text-center lg:text-left'>
                    {aboutPage.missionBody}
                  </p>
                )}
              </div>
              <div className='lg:flex lg:flex-auto lg:justify-center'>
                <CountUpStats stats={stats} />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className='mx-auto mt-32 sm:mt-32 lg:mt-40 max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pretty text-xuba-green-900 dark:text-white text-center lg:text-left'>
              {aboutPage?.teamTitle ?? 'Our team'}
            </h2>
            <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-xuba-green-600 dark:text-gray-300 text-center lg:text-left'>
              {aboutPage?.teamDescription ??
                `We have a rather clever team. With 15 years in the industry and IT
              in the blood, they are match fit and rearing to go. In order to
              create lasting bonds, we learn our client's business and
              where they are headed and how we can meet them there.`}
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-12 sm:mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4'
          >
            {teamMembers.map((member) => {
              const imageUrl = member.image
                ? urlFor(member.image).width(400).height(560).fit('crop').url()
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=8&w=400&h=560&q=80'

              return (
                <li key={member._id} className='text-center lg:text-left'>
                  <Image
                    alt={member.image?.alt ?? `${member.name} - ${member.role}`}
                    src={imageUrl}
                    className='aspect-5/7 w-full rounded-2xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover'
                    width={400}
                    height={560}
                  />
                  <h3 className='mt-4 sm:mt-6 text-lg leading-8 font-semibold tracking-tight text-xuba-green-900 dark:text-white'>
                    {member.name}
                  </h3>
                  <p className='text-base leading-7 text-xuba-green-600 dark:text-gray-300'>
                    {member.role}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </main>

      {/* Contact Section */}
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <ContactSection {...contactProps} />
      </div>
    </section>
  )
}
