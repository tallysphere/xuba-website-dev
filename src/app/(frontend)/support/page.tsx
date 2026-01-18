import ContactSection from '@/components/ContactSection'
import { Spotlight } from '@/components/Spotlight'
import React from 'react'

const page = () => {
  return (
    <div className='bg-xuba-purple-900 py-20 sm:py-32 lg:py-56 overflow-x-hidden'>
      <Spotlight />
      <div className='mx-auto flex flex-col md:mt-0 mt-20 items-center justify-center max-w-7xl gap-12 sm:gap-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-white text-sm sm:text-lg font-light tracking-wider text-center'>
              NEED QUICK SUPPORT?
            </div>
            <div className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mt-4 text-center'>
              Quick{' '}
              <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                Support
              </span>
            </div>
          </div>
          <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 text-center max-w-3xl px-4'>
            We are here to help you with your IT needs. Our dedicated support
            team is ready to assist you with remote troubleshooting, system
            diagnostics, software installations, and technical guidance. Get
            instant access to professional IT support through our secure
            TeamViewer connection below.
          </p>
        </div>
        <div
          id='custom-team-viewer-quick-support'
          className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto'
        >
          <div className='w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl'>
            <div className='bg-gray-700 px-4 py-2 flex items-center gap-2'>
              <div className='w-3 h-3 bg-red-500 rounded-full'></div>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span className='text-gray-300 text-sm ml-4'>
                TeamViewer Quick Support
              </span>
            </div>
            <iframe
              src='https://get.teamviewer.com/xubasupport'
              className='w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen'
              title='Xuba - TeamViewer Quick Support'
              frameBorder='0'
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <div className='px-4 sm:px-6 lg:px-8'>
        <ContactSection />
      </div>
    </div>
  )
}

export default page

// custom-team-viewer-quick-support https://get.teamviewer.com/xubasupport
