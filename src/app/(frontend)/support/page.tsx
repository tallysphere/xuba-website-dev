import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import { Spotlight } from '@/components/Spotlight'

/**
 * Support Page Component
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - TeamViewer Quick Support integration
 * - Accessible with proper ARIA attributes
 * - Responsive design
 */

export const metadata: Metadata = {
  title: 'Quick Support | Xuba IT Solutions',
  description:
    'Get instant IT support through our secure TeamViewer connection. Our dedicated team is ready to assist with remote troubleshooting and technical guidance.',
}

export default function SupportPage() {
  return (
    <section
      aria-labelledby='support-page-heading'
      className='relative bg-white dark:bg-xuba-purple-900 py-20 sm:py-32 lg:py-56 overflow-x-hidden'
    >
      {/* Spotlight effect - only visible in dark mode */}
      <div className='hidden dark:block'>
        <Spotlight />
      </div>

      {/* Decorative background for light mode */}
      <div
        className='absolute inset-0 overflow-hidden pointer-events-none dark:hidden'
        aria-hidden='true'
      >
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-xuba-green-500/10 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-xuba-green-500/10 rounded-full blur-3xl' />
      </div>

      <div className='relative mx-auto flex flex-col md:mt-0 mt-20 items-center justify-center max-w-7xl gap-12 sm:gap-20 px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <header className='max-w-4xl flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xuba-green-500 text-sm sm:text-lg font-light tracking-wider text-center uppercase'>
              Need Quick Support?
            </span>
            <h1
              id='support-page-heading'
              className='text-xuba-green-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mt-4 text-center'
            >
              Quick{' '}
              <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                Support
              </span>
            </h1>
          </div>
          <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-xuba-green-700 dark:text-gray-300 text-center max-w-3xl px-4'>
            We are here to help you with your IT needs. Our dedicated support
            team is ready to assist you with remote troubleshooting, system
            diagnostics, software installations, and technical guidance. Get
            instant access to professional IT support through our secure
            TeamViewer connection below.
          </p>
        </header>

        {/* TeamViewer Embed */}
        <div
          id='custom-team-viewer-quick-support'
          className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto'
        >
          <div className='w-full bg-xuba-green-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-xuba-green-200 dark:border-gray-700'>
            {/* Window Title Bar */}
            <div className='bg-xuba-green-200 dark:bg-gray-700 px-4 py-2 flex items-center gap-2'>
              <div
                className='w-3 h-3 bg-red-500 rounded-full'
                aria-hidden='true'
              />
              <div
                className='w-3 h-3 bg-yellow-500 rounded-full'
                aria-hidden='true'
              />
              <div
                className='w-3 h-3 bg-green-500 rounded-full'
                aria-hidden='true'
              />
              <span className='text-xuba-green-700 dark:text-gray-300 text-sm ml-4'>
                TeamViewer Quick Support
              </span>
            </div>
            {/* TeamViewer iframe */}
            <iframe
              src='https://get.teamviewer.com/xubasupport'
              className='w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen'
              title='Xuba - TeamViewer Quick Support'
              loading='lazy'
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className='px-4 sm:px-6 lg:px-8'>
        <ContactSection />
      </div>
    </section>
  )
}
