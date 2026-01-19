'use client'

import { Spotlight } from '@/components/Spotlight'
import Link from 'next/link'
import React from 'react'
import { PointerHighlight } from '@/components/PointerHighlight'
import { SideLines } from '@/components/HeroSections/HeroSection1'
import { ArrowRightIcon } from 'lucide-react'

interface HomeHeroProps {
  headlinePart1: string
  highlightWord: string
  headlinePart2: string
  description: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
}

const HomeHero = ({
  headlinePart1,
  highlightWord,
  headlinePart2,
  description,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) => {
  return (
    <div className='relative h-[80dvh] w-full overflow-hidden bg-white dark:bg-xuba-purple-900'>
      <Spotlight />
      <div className='relative z-20 h-full w-full'>
        <div className='relative flex h-dvh w-full flex-col items-center justify-center dark:bg-xuba-purple-900'>
          <div className='hidden md:block'>{<SideLines />}</div>

          <div className='relative z-20 flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12'>
            <div className='rounded-md font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
              <div className='mt-4 text-center text-2xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
                {headlinePart1}{' '}
                <PointerHighlight
                  rectangleClassName='bg-xuba-purple-100 dark:bg-xuba-green-900 border-xuba-purple-300 dark:border-xuba-green-700 leading-loose'
                  pointerClassName='text-xuba-purple-400 dark:text-xuba-green-500 h-3 w-3'
                  containerClassName='inline-block mx-1'
                >
                  <span className='relative z-10'>{highlightWord} </span>
                </PointerHighlight>
              </div>
              <div className='text-center font-bold text-2xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mt-2 md:mt-4'>
                {headlinePart2}
              </div>
            </div>

            <p className='mx-auto max-w-2xl py-4 text-center text-base text-neutral-600 md:text-lg dark:text-neutral-200 font-medium'>
              {description}
            </p>
            <div className='relative flex flex-col md:flex-row items-center gap-6 md:gap-14 py-4 sm:flex-row'>
              <Link
                href={primaryCta.href}
                className='relative w-64 gap-1 rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-3 py-4 shadow-lg dark:shadow-xl dark:shadow-xuba-purple-500/40'
              >
                <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center gap-2'>
                  {primaryCta.label} <ArrowRightIcon className='w-6 h-6' />
                </div>
              </Link>
              <Link
                href={secondaryCta.href}
                className='relative w-64 md:w-56 gap-1 rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-3 py-4 shadow-lg dark:shadow-xl dark:shadow-xuba-green-500/30'
              >
                <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center gap-2'>
                  {secondaryCta.label} <ArrowRightIcon className='w-6 h-6' />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
