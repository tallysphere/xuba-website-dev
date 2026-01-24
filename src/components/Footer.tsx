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
 * SimpleFooterWithFourGrids - Site footer with navigation links and branding.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Four-column grid layout on large screens
 * - Responsive design with mobile-first approach
 * - Accessible with proper semantic HTML
 *
 * @example
 * <SimpleFooterWithFourGrids />
 */
export function SimpleFooterWithFourGrids() {
  const pages: FooterLink[] = [
    {
      title: 'Our Services',
      href: '/services',
    },
    {
      title: 'About Us',
      href: '/about',
    },
    {
      title: 'Support',
      href: '/support',
    },
    {
      title: 'Contact Us',
      href: '/contact',
    },
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

  const legals: FooterLink[] = [
    {
      title: 'Privacy Policy',
      href: '/privacy',
    },
    {
      title: 'Terms of Service',
      href: '/terms-of-service',
    },
  ]

  return (
    <footer
      aria-label='Site footer'
      className='border-t border-xuba-green-100 dark:border-white/10 px-8 py-20 bg-white dark:bg-xuba-purple-950 w-full relative overflow-hidden'
    >
      <div className='max-w-7xl mx-auto text-sm text-xuba-green-600 dark:text-xuba-green-200 flex sm:flex-row flex-col justify-between items-start md:px-8'>
        {/* Logo & Copyright */}
        <div>
          <div className='mr-0 md:mr-4 md:flex mb-4'>
            <Logo />
          </div>

          <div className='mt-2 ml-2 text-xuba-green-600 dark:text-xuba-green-100'>
            &copy; copyright Xuba {new Date().getFullYear()}. All rights
            reserved.
          </div>
        </div>

        {/* Navigation Grid */}
        <nav
          aria-label='Footer navigation'
          className='grid grid-cols-2 lg:grid-cols-4 gap-10 items-start mt-10 sm:mt-0 md:mt-0'
        >
          {/* Pages */}
          <div className='flex justify-center space-y-4 flex-col w-full'>
            <p className='text-xuba-green-800 dark:text-xuba-green-300 font-bold'>
              Pages
            </p>
            <ul className='list-none space-y-4'>
              {pages.map((page, idx) => (
                <li key={'pages' + idx} className='list-none'>
                  <Link
                    className='text-xuba-green-600 dark:text-xuba-green-200 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors'
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className='flex justify-center space-y-4 flex-col'>
            <p className='text-xuba-green-800 dark:text-xuba-green-300 font-bold'>
              Socials
            </p>
            <ul className='list-none space-y-4'>
              {socials.map((social, idx) => (
                <li key={'social' + idx} className='list-none'>
                  <Link
                    className='text-xuba-green-600 dark:text-xuba-green-200 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors'
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {social.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className='flex justify-center space-y-4 flex-col'>
            <p className='text-xuba-green-800 dark:text-xuba-green-300 font-bold'>
              Legal
            </p>
            <ul className='list-none space-y-4'>
              {legals.map((legal, idx) => (
                <li key={'legal' + idx} className='list-none'>
                  <Link
                    className='text-xuba-green-600 dark:text-xuba-green-200 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors'
                    href={legal.href}
                  >
                    {legal.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Decorative Brand Text */}
      <p
        aria-hidden='true'
        className='text-center mt-20 text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-linear-to-b from-xuba-green-100 dark:from-xuba-purple-800/70 to-xuba-green-200 dark:to-xuba-purple-900 inset-x-0 select-none'
      >
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
      className='font-normal flex space-x-2 items-center text-sm mr-4 px-2 py-1 relative z-20'
      aria-label='Xuba home'
    >
      <Image src='/images/logo.png' alt='Xuba logo' width={120} height={50} />
    </Link>
  )
}
