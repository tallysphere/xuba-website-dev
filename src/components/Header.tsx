'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import { IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react'
import { ThemeToggle } from './ThemeToggle'

/**
 * AnimatedHeader - Site header with animated full-screen navigation menu.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Full-screen menu overlay with staggered animations
 * - Body scroll lock when menu is open
 * - Accessible with proper ARIA attributes
 * - Responsive design
 */
export default function AnimatedHeader() {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (isOpen) {
      // Store original values
      const originalHtmlOverflow = html.style.overflow
      const originalBodyOverflow = body.style.overflow

      // Lock scroll on both html and body
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'

      return () => {
        html.style.overflow = originalHtmlOverflow
        body.style.overflow = originalBodyOverflow
      }
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
        staggerChildren: 0.03,
        staggerDirection: -1,
        when: 'afterChildren' as const,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  }

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Support', href: '/support' },
    { name: 'Contact', href: '/contact' },
  ]

  const socials = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/XubaIT',
      icon: IconBrandFacebook,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/xuba/?originalSubdomain=nz',
      icon: IconBrandLinkedin,
    },
  ]

  return (
    <>
      <header
        className={cn(
          'absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-16 md:py-8 flex items-center justify-between',
          'transition-all duration-300'
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96] as const,
          }}
          className='z-50'
        >
          <Link href='/' className='flex items-center relative z-20'>
            <Image src='/images/logo.png' alt='Xuba' width={160} height={40} />
          </Link>
        </motion.div>

        {/* Right Side Controls */}
        <div className='z-50 flex items-center gap-4'>
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Menu Toggle Button */}
          <motion.button
            className='flex items-center gap-3 focus:outline-none group'
            onClick={toggleMenu}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96] as const,
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className='hidden md:block text-xs font-medium tracking-[0.2em] text-xuba-green-600 dark:text-white/70 group-hover:text-xuba-green-900 dark:group-hover:text-white transition-colors uppercase'>
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className='w-6 h-6 relative flex items-center justify-center'>
              <motion.span
                className='absolute block h-[2px] bg-xuba-green-600 dark:bg-xuba-green-500 origin-center'
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -4,
                  width: isOpen ? 20 : 24,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.43, 0.13, 0.23, 0.96] as const,
                }}
              />
              <motion.span
                className='absolute block w-6 h-[2px] bg-xuba-green-600 dark:bg-xuba-green-500 origin-center'
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.43, 0.13, 0.23, 0.96] as const,
                }}
              />
              <motion.span
                className='absolute block h-[2px] bg-xuba-green-600 dark:bg-xuba-green-500 origin-center'
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 4,
                  width: isOpen ? 20 : 16,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.43, 0.13, 0.23, 0.96] as const,
                }}
              />
            </div>
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-40 bg-white dark:bg-xuba-purple-900 flex flex-col overflow-hidden'
            style={{ width: '100vw', height: '100dvh' }}
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}
          >
            {/* Subtle gradient overlay */}
            <div
              className='absolute inset-0 bg-linear-to-b from-xuba-green-50/50 via-transparent to-xuba-green-100/30 dark:from-xuba-purple-950/50 dark:via-transparent dark:to-xuba-purple-950/80 pointer-events-none'
              aria-hidden='true'
            />

            {/* Main Navigation */}
            <nav
              className='flex-1 flex flex-col items-center justify-center z-10 px-6 overflow-hidden'
              aria-label='Main navigation'
            >
              <div className='space-y-6 md:space-y-8'>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={linkVariants}
                    className='overflow-hidden'
                  >
                    <Link
                      href={link.href}
                      className='group flex items-center justify-center'
                      onClick={toggleMenu}
                    >
                      <span className='text-xuba-green-400 dark:text-white/40 text-sm font-light mr-4 group-hover:text-xuba-green-500 transition-colors duration-300'>
                        0{index + 1}
                      </span>
                      <span className='text-xuba-green-900 dark:text-white text-3xl md:text-5xl font-extralight tracking-wide group-hover:text-xuba-green-500 dark:group-hover:text-xuba-green-400 transition-all duration-300 group-hover:tracking-wider'>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            <motion.div
              variants={linkVariants}
              className='relative z-10 px-6 md:px-16 py-8 border-t border-xuba-green-200 dark:border-white/10'
            >
              <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
                {/* Contact Info */}
                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
                  <a
                    href='tel:0800332211'
                    className='flex items-center gap-2 text-xuba-green-700 dark:text-white/90 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors text-sm'
                  >
                    <Phone className='w-4 h-4 text-xuba-green-500 dark:text-xuba-green-500' aria-hidden='true' />
                    <span>0800 33 22 11</span>
                  </a>
                  <a
                    href='mailto:hello@xuba.co.nz'
                    className='flex items-center gap-2 text-xuba-green-700 dark:text-white/90 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors text-sm'
                  >
                    <Mail className='w-4 h-4 text-xuba-green-500 dark:text-xuba-green-500' aria-hidden='true' />
                    <span>hello@xuba.co.nz</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className='flex items-center gap-4'>
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 flex items-center justify-center text-xuba-green-600 dark:text-white/60 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 hover:border-xuba-green-500 dark:hover:border-xuba-green-400 transition-all duration-300'
                      aria-label={social.name}
                    >
                      <social.icon className='w-6 h-6 text-xuba-green-500' aria-hidden='true' />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
