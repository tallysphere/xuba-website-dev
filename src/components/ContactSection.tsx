import Link from 'next/link'
import { GridLineHorizontal } from './GridLines'
import { GridLineVertical } from './GridLineVertical'
import {
  ArrowRight,
  Building2Icon,
  PhoneCallIcon,
  MailIcon,
} from 'lucide-react'

/**
 * Props for the ContactSection component.
 */
interface ContactSectionProps {
  /** Main heading text */
  heading?: string
  /** Supporting subheading text */
  subheading?: string
  /** Call-to-action button label */
  ctaLabel?: string
  /** Call-to-action link destination */
  ctaLink?: string
  /** Physical address */
  address?: string
  /** Phone number */
  phone?: string
  /** Email address */
  email?: string
}

/**
 * ContactSection - A call-to-action section with contact information.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - Clickable contact links (phone, email, address)
 *
 * @example
 * <ContactSection
 *   heading="Get in touch"
 *   subheading="We'd love to hear from you"
 *   ctaLabel="Contact Us"
 *   ctaLink="/contact"
 * />
 */
const ContactSection = ({
  heading = 'We are here to help you with your IT needs',
  subheading = 'Get in touch with us Today.',
  ctaLabel = 'Get in touch',
  ctaLink = '/contact',
  address = '15 King Street, Frankton, Hamilton, NZ',
  phone = '0800 33 22 11',
  email = 'hello@xuba.co.nz',
}: ContactSectionProps) => {
  // Format phone for href (remove spaces)
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`
  const emailHref = `mailto:${email}`

  return (
    <section
      aria-labelledby='contact-heading'
      className='w-full grid grid-cols-1 md:grid-cols-3 my-20 md:my-40 justify-start relative z-20 max-w-7xl mx-auto rounded-xl bg-linear-to-br from-xuba-green-50 to-white dark:from-xuba-purple-800 dark:to-xuba-purple-900'
    >
      <GridLineHorizontal className='top-0' offset='200px' />
      <GridLineHorizontal className='bottom-0 top-auto' offset='200px' />
      <GridLineVertical className='left-0' offset='80px' />
      <GridLineVertical className='left-auto right-0' offset='80px' />

      {/* Main Content */}
      <div className='md:col-span-2 p-8 md:p-14 md:text-start text-center'>
        <h2
          id='contact-heading'
          className='text-xuba-green-700 dark:text-xuba-green-100 text-xl md:text-3xl tracking-tight font-medium'
        >
          {heading}
        </h2>
        <p className='text-xuba-green-600 dark:text-xuba-green-200 mt-4 max-w-lg text-2xl tracking-tight font-medium'>
          {subheading}
        </p>

        <div className='flex items-start sm:items-center flex-col sm:flex-row sm:gap-4 mt-10'>
          <Link
            href={ctaLink}
            className='group relative md:w-56 w-full gap-1 rounded-xl border-2 bg-xuba-green-50 dark:bg-transparent border-xuba-green-500 dark:border-white text-center text-sm text-xuba-green-800 dark:text-white font-medium px-4 py-3 shadow-lg dark:shadow-xl dark:shadow-xuba-purple-500/40 hover:bg-xuba-green-100 dark:hover:bg-white/5 transition-all duration-300'
          >
            <div className='text-xuba-green-800 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center'>
              {ctaLabel}
              <ArrowRight
                className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300'
                aria-hidden='true'
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Contact Info */}
      <div className='border-t md:border-t-0 md:border-l border-dashed border-xuba-green-200 dark:border-xuba-purple-500/30 p-8 md:p-14 md:text-start text-center'>
        <div className='space-y-4'>
          <a
            href='https://maps.app.goo.gl/MdruTpLBcwko2yuV8'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 text-xuba-green-700 dark:text-xuba-green-200 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors justify-center md:justify-start'
          >
            <Building2Icon
              className='w-5 h-5 text-xuba-green-500 shrink-0'
              aria-hidden='true'
            />
            <span className='text-sm'>{address}</span>
          </a>
          <a
            href={phoneHref}
            className='flex items-center gap-3 text-xuba-green-700 dark:text-xuba-green-200 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors justify-center md:justify-start'
          >
            <PhoneCallIcon
              className='w-5 h-5 text-xuba-green-500 shrink-0'
              aria-hidden='true'
            />
            <span className='text-sm'>{phone}</span>
          </a>
          <a
            href={emailHref}
            className='flex items-center gap-3 text-xuba-green-700 dark:text-xuba-green-200 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors justify-center md:justify-start'
          >
            <MailIcon
              className='w-5 h-5 text-xuba-green-500 shrink-0'
              aria-hidden='true'
            />
            <span className='text-sm'>{email}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
