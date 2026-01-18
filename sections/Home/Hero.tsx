'use client'

// import { TopLines } from '@/components/HeroSections/HeroSection1'
import { Spotlight } from '@/components/Spotlight'
import Link from 'next/link'
// import Link from 'next/link'
import React from 'react'

// import Typewriter from '@/fancy/components/text/typewriter'

import { PointerHighlight } from '@/components/PointerHighlight'

import { SideLines } from '@/components/HeroSections/HeroSection1'
// import Typewriter from '@/fancy/components/text/typewriter'
import { ArrowRightIcon } from 'lucide-react'

const HomeHeroDemo1 = () => {
  return (
    <div className='relative h-[80dvh] w-full overflow-hidden bg-white dark:bg-xuba-purple-900'>
      <Spotlight />
      <div className='relative z-20 h-full w-full'>
        <div className='relative flex h-dvh w-full flex-col items-center justify-center dark:bg-xuba-purple-900'>
          <div className='absolute inset-0 h-svh overflow-hidden'>
            {/* <TopLines /> */}
            {/* <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 sm:translate-y-8 md:translate-y-12 lg:translate-y-16'>
              <BottomLines />
            </div> */}
          </div>

          <div className='hidden md:block'>{<SideLines />}</div>

          <div className='relative z-20 flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12'>
            {/* <div className='hidden md:block'>
              <Badge text='Welcome to Xuba' />
            </div> */}
            <div className='rounded-md font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
              <div className='mt-4 text-center text-2xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
                Looking for a{' '}
                <PointerHighlight
                  rectangleClassName='bg-xuba-purple-100 dark:bg-xuba-green-900 border-xuba-purple-300 dark:border-xuba-green-700 leading-loose'
                  pointerClassName='text-xuba-purple-400 dark:text-xuba-green-500 h-3 w-3'
                  containerClassName='inline-block mx-1'
                >
                  <span className='relative z-10'>dedicated </span>
                </PointerHighlight>
              </div>
              <div className='text-center font-bold text-2xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mt-2 md:mt-4'>
                IT Support?
              </div>
            </div>

            <p className='mx-auto max-w-2xl py-4 text-center text-base text-neutral-600 md:text-lg dark:text-neutral-200 font-medium'>
              You&apos;ve come to the right place. We offer a robust range of IT
              support products and services to save you money, keep your systems
              happy, improve efficiency and help you work smarter.
            </p>
            <div className='relative flex flex-col md:flex-row items-center gap-6 md:gap-14 py-4 sm:flex-row'>
              <Link
                href='/services'
                className='relative w-64 gap-1 rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-3 py-4 shadow-lg dark:shadow-xl dark:shadow-xuba-purple-500/40'
              >
                {/* <div className='absolute top-3 left-5 w-8 h-1 transition-all bg-xuba-green-500 dark:bg-xuba-purple-400' /> */}
                {/* <Typewriter
                  text='Explore our Services'
                  className='text-gray-700 font-semibold text-lg text-nowrap tracking-tight'
                  cursorClassName='text-gray-700'
                  speed={70}
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={'_'}
                /> */}
                {/* <span className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight'>
                  Explore our Services
                </span> */}
                <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center gap-2'>
                  Explore our Services <ArrowRightIcon className='w-6 h-6' />
                </div>{' '}
              </Link>
              <Link
                href='/contact'
                className='relative w-64 md:w-56 gap-1 rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-3 py-4 shadow-lg dark:shadow-xl dark:shadow-xuba-green-500/30'
              >
                {/* <div className='absolute top-3 left-5 w-8 h-1 transition-all bg-xuba-green-400' /> */}

                {/* <Typewriter
                  text='Explore our Services'
                  className='text-gray-700 font-semibold text-lg text-nowrap tracking-tight'
                  cursorClassName='text-gray-700'
                  speed={70}
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={'_'}
                /> */}
                {/* <span className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight'>
                  Explore our Services
                </span> */}
                <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center gap-2'>
                  Get in Touch <ArrowRightIcon className='w-6 h-6' />
                </div>
              </Link>
            </div>
            {/* <div className='mt-24 z-20 hidden md:block'>
              <LogoCloudMarquee />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeroDemo1
