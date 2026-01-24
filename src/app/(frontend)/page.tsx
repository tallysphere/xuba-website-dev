import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import HomeHero from '../../../sections/Home/Hero'
import { HomeServices } from '../../../sections/Home/HomeServices'
import WhyXuba from '../../../sections/Home/WhyXuba'
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY, CONTACT_SECTION_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

/**
 * Generate metadata for the Homepage from Sanity CMS.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: homepage } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    stega: false,
  })

  return {
    title: homepage?.seo?.title ?? 'Xuba - IT Solutions',
    description: homepage?.seo?.description ?? undefined,
    openGraph: homepage?.seo?.image?.asset
      ? {
          images: [
            {
              url: urlFor(homepage.seo.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
    robots: homepage?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function Home() {
  // Fetch homepage and contact section data in parallel
  const [{ data: homepage }, { data: contactData }] = await Promise.all([
    sanityFetch({ query: HOMEPAGE_QUERY }),
    sanityFetch({ query: CONTACT_SECTION_QUERY }),
  ])

  // Hero section props
  const heroProps = {
    headlinePart1: homepage?.heroHeadlinePart1 ?? 'Looking for a',
    highlightWord: homepage?.heroHighlightWord ?? 'dedicated',
    headlinePart2: homepage?.heroHeadlinePart2 ?? 'IT Support?',
    description: homepage?.heroDescription ?? "You've come to the right place. We offer a robust range of IT support products and services to save you money, keep your systems happy, improve efficiency and help you work smarter.",
    primaryCta: {
      label: homepage?.heroPrimaryCta?.label ?? 'Explore our Services',
      href: homepage?.heroPrimaryCta?.href ?? '/services',
    },
    secondaryCta: {
      label: homepage?.heroSecondaryCta?.label ?? 'Get in Touch',
      href: homepage?.heroSecondaryCta?.href ?? '/contact',
    },
  }

  // Services section props
  const servicesProps = {
    title: homepage?.servicesTitle ?? 'One-Stop IT Solutions',
    description: homepage?.servicesDescription ?? 'Explore our comprehensive IT services designed to streamline your business operations',
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
      <div className='p-0 m-0 flex flex-col gap-0'>
        <HomeHero {...heroProps} />
        <HomeServices {...servicesProps} />
        <WhyXuba />
        <ContactSection {...contactProps} />
      </div>
    </main>
  )
}
