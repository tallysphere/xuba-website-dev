import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

/**
 * Navigation link item type.
 */
interface FooterLink {
  /** Display text for the link */
  title: string
  /** URL destination */
  href: string
}

/**
 * Footer - Site footer with four-grid layout and decorative branding.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Logo and copyright on left, navigation grids on right (desktop)
 * - Centered stacked layout on mobile
 * - Large decorative "XUBA" gradient text
 * - Social text links at bottom
 *
 * @example
 * <Footer />
 */
export function Footer() {
  const pages: FooterLink[] = [
    { title: 'Services', href: '/services' },
    { title: 'About', href: '/about' },
    { title: 'Our Team', href: '/our-team' },
  ]

  const legals: FooterLink[] = [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms-of-service' },
  ]

  const contacts: FooterLink[] = [
    { title: 'Support', href: '/support' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'hello@xuba.co.nz', href: 'mailto:hello@xuba.co.nz' },
    { title: '0800 33 22 11', href: 'tel:0800332211' },
  ]

  const socials: FooterLink[] = [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/XubaIT',
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/xuba/?originalSubdomain=nz',
    },
  ]

  return (
    <footer
      aria-label='Site footer'
      className='w-full overflow-hidden border-t mb-0 border-xuba-green-200 bg-white pt-16 sm:pt-20 dark:border-white/10 dark:bg-xuba-purple-900'
    >
      <div className='mx-auto max-w-7xl z-20 text-sm text-xuba-green-600 dark:text-gray-400 md:px-8'>
        {/* Main Footer Content */}
        <div className='flex flex-col items-center md:flex-row md:items-start md:justify-between'>
          {/* Left Section - Logo & Copyright */}
          <div className='mb-10 flex flex-col items-center md:mb-0 md:items-start'>
            <div className='mb-4'>
              <Logo />
            </div>
            <p className='text-center md:text-left'>
              &copy; Xuba {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>

          {/* Right Section - Navigation Grids */}
          <div className='grid w-full max-w-2xl grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8 md:text-left'>
            {/* Pages Column */}
            <div className='flex flex-col space-y-4'>
              <p className='font-light uppercase text-xuba-green-500 text-base'>
                Pages
              </p>
              <ul className='space-y-3'>
                {pages.map((page, idx) => (
                  <li key={'page-' + idx}>
                    <Link
                      href={page.href}
                      className='transition-colors text-xuba-green-900 dark:text-white hover:text-xuba-green-500 dark:hover:text-white font-medium tracking tracking-tight'
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className='flex flex-col space-y-4'>
              <p className='font-light uppercase text-xuba-green-500 text-base'>
                Legal
              </p>
              <ul className='space-y-3'>
                {legals.map((legal, idx) => (
                  <li key={'legal-' + idx}>
                    <Link
                      href={legal.href}
                      className='transition-colors text-xuba-green-900 dark:text-white hover:text-xuba-green-500 dark:hover:text-white font-medium tracking tracking-tight'
                    >
                      {legal.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className='flex flex-col space-y-4'>
              <p className='font-light uppercase text-xuba-green-500 text-base'>
                Socials
              </p>
              <ul className='space-y-3'>
                {socials.map((social, idx) => (
                  <li key={'social-' + idx}>
                    <Link
                      href={social.href}
                      className='transition-colors text-xuba-green-900 dark:text-white hover:text-xuba-green-500 dark:hover:text-white font-medium tracking tracking-tight'
                    >
                      {social.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className='w-screen mt-40 z-0 mb-0 pb-0 bg-linear-to-b from-xuba-green-50/50 to-xuba-green-100 bg-clip-text text-center text-[25vw] font-bold leading-[0.7] text-transparent dark:from-xuba-purple-800 dark:to-xuba-purple-950'>
        XUBA
      </p>
    </footer>
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
export { Footer as SimpleFooterWithFourGrids }

// Default export
export default Footer
