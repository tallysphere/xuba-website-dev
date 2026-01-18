import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function SimpleFooterWithFourGrids() {
  const pages = [
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

  const socials = [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/XubaIT',
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/xuba/?originalSubdomain=nz',
    },
  ]

  const legals = [
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
    <div className='border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-xuba-purple-950 w-full relative overflow-hidden'>
      <div className='max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start  md:px-8'>
        <div>
          <div className='mr-0 md:mr-4  md:flex mb-4'>
            <Logo />
          </div>

          <div className='mt-2 ml-2 text-neutral-50'>
            &copy; copyright Xuba {new Date().getFullYear()}. All rights
            reserved.
          </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-10 items-start mt-10 sm:mt-0 md:mt-0'>
          <div className='flex justify-center space-y-4 flex-col w-full'>
            <p className='transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold'>
              Pages
            </p>
            <ul className='transition-colors hover:text-text-neutral-800 text-neutral-100 list-none space-y-4'>
              {pages.map((page, idx) => (
                <li key={'pages' + idx} className='list-none'>
                  <Link
                    className='transition-colors hover:text-text-neutral-800 '
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex justify-center space-y-4 flex-col'>
            <p className='transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold'>
              Socials
            </p>
            <ul className='transition-colors hover:text-text-neutral-800 text-neutral-100 list-none space-y-4'>
              {socials.map((social, idx) => (
                <li key={'social' + idx} className='list-none'>
                  <Link
                    className='transition-colors hover:text-text-neutral-800 '
                    href={social.href}
                  >
                    {social.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex justify-center space-y-4 flex-col'>
            <p className='transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold'>
              Legal
            </p>
            <ul className='transition-colors hover:text-text-neutral-800 text-neutral-100 list-none space-y-4'>
              {legals.map((legal, idx) => (
                <li key={'legal' + idx} className='list-none'>
                  <Link
                    className='transition-colors hover:text-text-neutral-800 '
                    href={legal.href}
                  >
                    {legal.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className='text-center mt-20 text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-xuba-purple-800/70 to-neutral-200 dark:to-xuba-purple-900 inset-x-0'>
        XUBA
      </p>
    </div>
  )
}

const Logo = () => {
  return (
    <Link
      href='/'
      className='font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20'
    >
      <Image src='/images/logo.png' alt='logo' width={120} height={50} />
      {/* <span className='font-medium text-black dark:text-white'>Xuba</span> */}
    </Link>
  )
}
