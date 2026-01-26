import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import { IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react'

/**
 * Navigation link item type.
 */
interface FooterLink {
  /** Display text for the link */
  title: string
  /** URL destination */
  href: string
  /** Whether to open in new tab */
  external?: boolean
}

/**
 * CenteredFooter - Site footer with centered logo and navigation.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Centered layout with horizontal navigation
 * - Decorative grid line separator
 * - Social links and copyright at bottom
 * - TextHoverEffect branding
 *
 * @example
 * <CenteredFooter />
 */
export function CenteredFooter() {
  const pages: FooterLink[] = [
    { title: 'Our Services', href: '/services' },
    { title: 'About Us', href: '/about' },
    { title: 'Support', href: '/support' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Privacy', href: '/privacy' },
    { title: 'Terms', href: '/terms-of-service' },
  ]

  const socials = [
    { title: 'Facebook', href: 'https://www.facebook.com/XubaIT', icon: IconBrandFacebook },
    { title: 'LinkedIn', href: 'https://www.linkedin.com/company/xuba/?originalSubdomain=nz', icon: IconBrandLinkedin },
  ]

  return (
    <footer
      aria-label='Site footer'
      className='relative w-full overflow-hidden border-t border-gray-200 bg-white px-8 py-20 dark:border-white/10 dark:bg-xuba-purple-950'
    >
      <div className='mx-auto max-w-7xl text-sm text-gray-500 md:px-8'>
        {/* Centered Content */}
        <div className='relative flex w-full flex-col items-center justify-center'>
          {/* Logo */}
          <div className='mb-6'>
            <Logo />
          </div>

          {/* Navigation Links */}
          <ul className='flex list-none flex-col gap-4 text-gray-600 transition-colors sm:flex-row sm:gap-8 dark:text-gray-300'>
            {pages.map((page, idx) => (
              <li key={'pages' + idx} className='list-none text-center'>
                <Link
                  className='hover:text-gray-900 dark:hover:text-white transition-colors'
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Decorative Line */}
          <GridLineHorizontal className='mx-auto mt-8 max-w-7xl' />
        </div>

        {/* Bottom Section */}
        <div className='mt-8 flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
          {/* Copyright */}
          <p className='text-gray-500 dark:text-gray-400'>
            &copy; copyright Xuba {new Date().getFullYear()}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className='flex gap-4'>
            {socials.map((social, idx) => (
              <Link
                key={'social' + idx}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.title}
                className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors'
              >
                <social.icon className='h-6 w-6' />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Brand Text */}
      {/* <div className='h-96 flex items-center justify-center'>
        <TextHoverEffect text='XUBA' />
      </div> */}
    </footer>
  )
}

/**
 * GridLineHorizontal - Decorative horizontal dashed line.
 */
const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(0, 0, 0, 0.1)',
          '--height': '1px',
          '--width': '5px',
          '--fade-stop': '90%',
          '--offset': offset || '200px',
          '--color-dark': 'rgba(255, 255, 255, 0.1)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'h-(--height) w-[calc(100%+var(--offset))]',
        'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
        'bg-size-[var(--width)_var(--height)]',
        '[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]',
        'mask-exclude',
        'z-30',
        'dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
        className
      )}
    />
  )
}

/**
 * Logo - Site logo component for the footer.
 */
const Logo = () => {
  return (
    <Link
      href='/'
      className='relative z-20 flex items-center'
      aria-label='Xuba home'
    >
      <Image src='/images/logo.png' alt='Xuba logo' width={120} height={50} />
    </Link>
  )
}

// Alias for backwards compatibility
export { CenteredFooter as SimpleFooterWithFourGrids }

// Default export for compatibility
export default CenteredFooter
