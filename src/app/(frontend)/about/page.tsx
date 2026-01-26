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
        })
      )
    : defaultStats

  return (
    <section
      aria-labelledby='about-page-heading'
      className='relative w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-xuba-purple-900 py-12 sm:py-20 overflow-x-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      {/* Page Header */}
      <header className='relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:mt-0 mt-20'>
        <span className='text-xuba-green-500 text-sm sm:text-lg font-light tracking-widest mt-12 sm:mt-20 text-center uppercase'>
          Who Are We?
        </span>
        <h1
          id='about-page-heading'
          className='text-xuba-green-900 dark:text-white text-4xl sm:text-5xl md:text-7xl font-thin tracking-tight mt-4 text-center max-w-4xl'
        >
          Our{' '}
          <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
            Team
          </span>
        </h1>
      </header>

      <main className='relative isolate z-10 w-full'>
        {/* Hero section */}
        <div className='relative isolate -z-10'>
          {/* Decorative gradient blob */}
          <div
            aria-hidden='true'
            className='absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className='aspect-801/1036 w-200.25 bg-linear-to-tr from-xuba-green-500/20 to-xuba-green-700/20 dark:from-xuba-green-500 dark:to-xuba-green-700 opacity-40'
            />
          </div>

          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-7xl pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 lg:pb-32'>
              <div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
                {/* Hero Text */}
                <div className='relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl'>
                  <h2 className='text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight text-pretty text-xuba-green-900 dark:text-white text-center lg:text-left'>
                    {aboutPage?.heroTitle ?? 'Clever IT & Clever People'}
                  </h2>
                  <p className='mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl font-medium text-pretty text-xuba-green-700 dark:text-white text-center lg:text-left'>
                    {aboutPage?.heroSubtitle ??
                      `Xuba was conceived from a shared vision for faster, smarter
                    IT technology coupled with bright spark, cut above the rest
                    IT support service. We believe in quick. We believe in
                    quality. And we're passionately committed to doing
                    things better. The result? It's really quite simple; we
                    help our clients sleep at night.`}
                  </p>
                </div>

                {/* Hero image grid */}
                {aboutPage?.heroImages && aboutPage.heroImages.length > 0 && (
                  <div className='mt-8 sm:mt-14 lg:mt-0 flex justify-center lg:justify-end gap-4 sm:gap-8 lg:pl-0'>
                    {/* Column 1 */}
                    <div className='w-32 sm:w-44 flex-none space-y-4 sm:space-y-8 pt-16 sm:pt-32 lg:order-last lg:pt-36 xl:order-0 xl:pt-80'>
                      {aboutPage.heroImages[0]?.asset && (
                        <div className='relative'>
                          <Image
                            alt={
                              aboutPage.heroImages[0].alt ?? 'About us image'
                            }
                            src={urlFor(aboutPage.heroImages[0])
                              .width(400)
                              .height(528)
                              .fit('crop')
                              .url()}
                            className='aspect-2/3 w-full rounded-xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover shadow-lg'
                            width={400}
                            height={528}
                          />
                          <div
                            className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-xuba-green-200 dark:ring-gray-900/10 ring-inset'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                    </div>
                    {/* Column 2 */}
                    <div className='w-32 sm:w-44 flex-none space-y-4 sm:space-y-8 pt-8 sm:pt-52 lg:pt-36'>
                      {aboutPage.heroImages[1]?.asset && (
                        <div className='relative'>
                          <Image
                            alt={
                              aboutPage.heroImages[1].alt ?? 'About us image'
                            }
                            src={urlFor(aboutPage.heroImages[1])
                              .width(400)
                              .height(528)
                              .fit('crop')
                              .url()}
                            className='aspect-2/3 w-full rounded-xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover shadow-lg'
                            width={400}
                            height={528}
                          />
                          <div
                            className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-xuba-green-200 dark:ring-gray-900/10 ring-inset'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                      {aboutPage.heroImages[2]?.asset && (
                        <div className='relative'>
                          <Image
                            alt={
                              aboutPage.heroImages[2].alt ?? 'About us image'
                            }
                            src={urlFor(aboutPage.heroImages[2])
                              .width(400)
                              .height(528)
                              .fit('crop')
                              .url()}
                            className='aspect-2/3 w-full rounded-xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover shadow-lg'
                            width={400}
                            height={528}
                          />
                          <div
                            className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-xuba-green-200 dark:ring-gray-900/10 ring-inset'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                    </div>
                    {/* Column 3 */}
                    <div className='w-32 sm:w-44 flex-none space-y-4 sm:space-y-8 pt-16 sm:pt-32 lg:pt-0'>
                      {aboutPage.heroImages[3]?.asset && (
                        <div className='relative'>
                          <Image
                            alt={
                              aboutPage.heroImages[3].alt ?? 'About us image'
                            }
                            src={urlFor(aboutPage.heroImages[3])
                              .width(400)
                              .height(528)
                              .fit('crop')
                              .url()}
                            className='aspect-2/3 w-full rounded-xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover shadow-lg'
                            width={400}
                            height={528}
                          />
                          <div
                            className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-xuba-green-200 dark:ring-gray-900/10 ring-inset'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                      {aboutPage.heroImages[4]?.asset && (
                        <div className='relative'>
                          <Image
                            alt={
                              aboutPage.heroImages[4].alt ?? 'About us image'
                            }
                            src={urlFor(aboutPage.heroImages[4])
                              .width(400)
                              .height(528)
                              .fit('crop')
                              .url()}
                            className='aspect-2/3 w-full rounded-xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover shadow-lg'
                            width={400}
                            height={528}
                          />
                          <div
                            className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-xuba-green-200 dark:ring-gray-900/10 ring-inset'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 sm:-mt-12 lg:xl:-mt-8'>
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
                ? urlFor(member.image).width(500).height(500).fit('crop').url()
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=8&w=500&h=500&q=80'

              return (
                <li key={member._id} className='text-center lg:text-left'>
                  <Image
                    alt={
                      member.image?.alt ?? `${member.name} - ${member.role}`
                    }
                    src={imageUrl}
                    className='aspect-14/13 w-full rounded-2xl bg-xuba-green-100 dark:bg-gray-900/5 object-cover'
                    width={500}
                    height={500}
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
