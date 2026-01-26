import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'
import TiltedCard from '@/components/TiltedCard/TiltedCard'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { TEAM_MEMBERS_QUERY, CONTACT_SECTION_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

/**
 * Our Team Page Component
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - Sanity CMS integration for team members
 * - Tilted card hover effects for team photos
 * - Social links integration
 * - Accessible with proper ARIA attributes
 * - SEO optimized with metadata
 */

export const metadata: Metadata = {
  title: 'Our Team | Xuba IT Solutions',
  description:
    'Meet our dedicated team of IT professionals. With 15 years in the industry, we are committed to delivering exceptional IT support and solutions.',
}

export default async function OurTeamPage() {
  // Fetch team members and contact section data in parallel
  const [{ data: teamMembers }, { data: contactData }] = await Promise.all([
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

  return (
    <section
      aria-labelledby='our-team-heading'
      className='relative bg-white dark:bg-xuba-purple-900 py-20 sm:py-32 lg:py-56 overflow-x-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      <div className='relative z-10 mx-auto flex flex-col md:mt-0 mt-20 items-center justify-center max-w-7xl gap-12 sm:gap-20 px-4 sm:px-6 lg:px-8'>
        {/* Page Header */}
        <header className='max-w-4xl flex flex-col items-center justify-center pb-8 sm:pb-20'>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xuba-green-500 text-xs sm:text-sm md:text-lg font-light tracking-widest text-center uppercase'>
              About The Team
            </span>
            <h1
              id='our-team-heading'
              className='text-xuba-green-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mt-4 text-center'
            >
              Meet{' '}
              <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                Our Team
              </span>
            </h1>
          </div>
          <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-xuba-green-700 dark:text-gray-300 text-center max-w-3xl px-4'>
            With 15 years in the industry and IT in the blood, they are match
            fit and rearing to go. In order to create lasting bonds, we learn
            our client&apos;s business and where they are headed and how we can
            meet them there.
          </p>
        </header>

        {/* Team Members List */}
        <ul role='list' className='w-full'>
          {teamMembers.map((member) => {
            const linkedInUrl = member.socialLinks?.find(
              (link) => link.platform === 'linkedin'
            )?.url
            const twitterUrl = member.socialLinks?.find(
              (link) => link.platform === 'twitter'
            )?.url
            const imageUrl = member.image
              ? urlFor(member.image).width(1024).height(1024).fit('crop').url()
              : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'

            return (
              <li
                key={member._id}
                id={member.slug ?? undefined}
                className='flex flex-col items-center gap-6 sm:gap-10 py-8 sm:py-12 first:pt-0 last:pb-0 sm:flex-row sm:items-start'
              >
                {/* Team Member Photo */}
                <div className='shrink-0 w-full max-w-xs sm:max-w-none sm:w-auto'>
                  <TiltedCard
                    imageSrc={imageUrl}
                    altText={member.image?.alt ?? member.name}
                    captionText={member.role}
                    containerHeight='280px'
                    containerWidth='100%'
                    imageHeight='280px'
                    imageWidth='280px'
                    rotateAmplitude={12}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                  />
                </div>

                {/* Team Member Info */}
                <div className='max-w-xl flex-auto text-center sm:text-left px-4 sm:px-0'>
                  <h3 className='text-2xl sm:text-3xl font-light uppercase tracking-wider text-xuba-green-500'>
                    {member.name}
                  </h3>
                  <p className='text-sm sm:text-base leading-7 text-xuba-green-600 dark:text-gray-300 font-semibold mt-1'>
                    {member.role}
                  </p>
                  {member.bio && Array.isArray(member.bio) && (
                    <p className='mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-xuba-green-900 dark:text-gray-300'>
                      {/* Bio is blockContent - extract plain text from first block */}
                      {member.bio[0] &&
                      'children' in member.bio[0] &&
                      Array.isArray(member.bio[0].children)
                        ? member.bio[0].children[0]?.text
                        : null}
                    </p>
                  )}

                  {/* Social Links */}
                  <ul
                    role='list'
                    className='mt-4 sm:mt-6 flex gap-x-6 justify-center sm:justify-start'
                  >
                    {twitterUrl && (
                      <li>
                        <Link
                          href={twitterUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-xuba-green-400 dark:text-gray-400 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors'
                        >
                          <span className='sr-only'>X (Twitter)</span>
                          <svg
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            aria-hidden='true'
                            className='size-5'
                          >
                            <path d='M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z' />
                          </svg>
                        </Link>
                      </li>
                    )}
                    {linkedInUrl && (
                      <li>
                        <Link
                          href={linkedInUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-xuba-green-400 dark:text-gray-400 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors'
                        >
                          <span className='sr-only'>LinkedIn</span>
                          <svg
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            aria-hidden='true'
                            className='size-5'
                          >
                            <path
                              d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                              clipRule='evenodd'
                              fillRule='evenodd'
                            />
                          </svg>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Contact Section */}
      <div className='px-4 sm:px-6 lg:px-8'>
        <ContactSection {...contactProps} />
      </div>
    </section>
  )
}
