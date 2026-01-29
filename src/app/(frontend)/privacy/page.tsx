import type { Metadata } from 'next'
import { PortableText, PortableTextComponents } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { PRIVACY_POLICY_QUERY } from '@/sanity/lib/queries'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

/**
 * Privacy Policy Page
 *
 * Features:
 * - CMS-driven content from Sanity using Portable Text
 * - Theme-aware styling (light and dark mode)
 * - Proper legal document formatting
 * - Accessible with proper ARIA attributes
 */

/**
 * Generate metadata for the Privacy Policy page from Sanity CMS.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PRIVACY_POLICY_QUERY,
    stega: false,
  })

  return {
    title: data?.seo?.title ?? 'Privacy Policy',
    description: data?.seo?.description ?? undefined,
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
  }
}

/**
 * Custom Portable Text components styled for legal documents.
 * Uses proper hierarchy and spacing for privacy policy content.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className='text-xuba-green-700 dark:text-gray-300 mb-4 leading-relaxed'>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className='text-2xl font-semibold text-xuba-green-900 dark:text-white mt-12 mb-6 flex items-center gap-3'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-xl font-medium text-xuba-green-900 dark:text-white mt-8 mb-4'>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-lg font-medium text-xuba-green-800 dark:text-gray-200 mt-6 mb-3'>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-xuba-green-500 pl-6 my-6 text-xuba-green-600 dark:text-gray-400 italic'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className='space-y-3 my-4 ml-4'>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className='space-y-3 my-4 ml-4 list-decimal list-outside'>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className='text-xuba-green-700 dark:text-gray-300 pl-2'>
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className='text-xuba-green-700 dark:text-gray-300 pl-2'>
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className='font-medium text-xuba-green-900 dark:text-white'>
        {children}
      </strong>
    ),
    em: ({ children }) => <em className='italic'>{children}</em>,
    underline: ({ children }) => (
      <span className='underline decoration-xuba-green-500/50 underline-offset-2'>
        {children}
      </span>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.blank || !value?.href?.startsWith('/')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className='text-xuba-green-600 dark:text-xuba-green-400 hover:text-xuba-green-700 dark:hover:text-xuba-green-300 underline underline-offset-4 transition-colors'
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className='my-8'>
          <div className='relative overflow-hidden'>
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ''}
              width={1200}
              height={675}
              className='w-full h-auto'
            />
          </div>
          {value.caption && (
            <figcaption className='text-sm text-xuba-green-600 dark:text-gray-400 mt-3 text-center'>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function PrivacyPolicyPage() {
  const { data } = await sanityFetch({
    query: PRIVACY_POLICY_QUERY,
  })

  // Fallback values
  const eyebrow = data?.eyebrow ?? 'Legal'
  const title = data?.title ?? 'Privacy Policy'
  const titleHighlight = data?.titleHighlight ?? 'Policy'
  const lastUpdated = data?.lastUpdated
  const body = data?.body

  // Format the title with highlight
  const titleParts = title.split(titleHighlight)
  const hasHighlight = titleParts.length > 1

  return (
    <section
      aria-labelledby='privacy-page-heading'
      className='relative isolate min-h-screen bg-white dark:bg-xuba-purple-900 flex flex-col items-center overflow-hidden'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      {/* Header Section */}
      <div className='relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-12'>
        <div className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase'>
          {eyebrow}
        </div>
        <h1
          id='privacy-page-heading'
          className='text-xuba-green-900 dark:text-white md:text-7xl text-4xl sm:text-5xl font-thin tracking-tight mt-4 text-center'
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
        {lastUpdated && (
          <p className='text-xuba-green-600 dark:text-gray-400 text-sm mt-4'>
            Last updated:{' '}
            {new Date(lastUpdated).toLocaleDateString('en-NZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* Content Section */}
      <main className='relative z-10 w-full max-w-4xl mx-auto px-6 pb-24'>
        <div className='prose prose-lg dark:prose-invert max-w-none'>
          {body ? (
            <PortableText value={body} components={components} />
          ) : (
            <p className='text-xuba-green-700 dark:text-gray-300 text-center py-12'>
              Privacy Policy content coming soon.
            </p>
          )}
        </div>
      </main>
    </section>
  )
}
