'use client'

import { PointerHighlight } from '@/components/PointerHighlight'
import { SideLines } from '@/components/HeroSections/HeroSection1'
import { ThemedHeroBackground } from '@/components/ThemedHeroBackground'
import { HeroCTA } from '@/components/ui/hero-cta'

/**
 * Props for CTA buttons in the Hero section.
 */
interface CTAProps {
  /** The text label displayed on the button */
  label: string
  /** The URL to navigate to when clicked */
  href: string
}

/**
 * Props for the HomeHero component.
 */
interface HomeHeroProps {
  /** First part of the headline before the highlighted word */
  headlinePart1: string
  /** Word to be highlighted with PointerHighlight effect */
  highlightWord: string
  /** Second part of the headline after the highlighted word */
  headlinePart2: string
  /** Supporting description text */
  description?: string
  /** Primary call-to-action button */
  primaryCta: CTAProps
  /** Secondary call-to-action button (optional) */
  secondaryCta?: CTAProps
}

/**
 * HomeHero - The main hero section for the home page.
 *
 * Features:
 * - Theme-aware backgrounds (DotPattern for light, Aurora for dark)
 * - Animated text with BlurText reveal effect
 * - Animated text highlight with PointerHighlight
 * - Dual CTA buttons with enhanced states
 *
 * @example
 * <HomeHero
 *   headlinePart1="Build Your"
 *   highlightWord="Dream"
 *   headlinePart2="With Us"
 *   description="We help businesses grow"
 *   primaryCta={{ label: "Get Started", href: "/contact" }}
 *   secondaryCta={{ label: "Learn More", href: "/about" }}
 * />
 */
const HomeHero = ({
  headlinePart1,
  highlightWord,
  headlinePart2,
  description,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) => {
  return (
    <section
      id='main-content'
      aria-labelledby='hero-heading'
      className='relative h-[90dvh] md:h-[80dvh] w-full overflow-hidden bg-white dark:bg-xuba-purple-900'
    >
      {/* Theme-aware background: DotPattern for light, Aurora for dark */}
      <ThemedHeroBackground />

      <div className='relative z-20 h-full w-full'>
        <div className='relative flex h-full w-full flex-col items-center justify-center'>
          {/* Decorative side lines - hidden on mobile */}
          {/* <div className='hidden md:block' aria-hidden='true'>
            <SideLines />
          </div> */}

          <div className='relative z-20 flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12'>
            {/* Main Headline */}
            <h1
              id='hero-heading'
              className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-xuba-green-900 dark:text-xuba-green-50'
            >
              <span className='mt-4 block text-center text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
                {headlinePart1}{' '}
                <PointerHighlight
                  rectangleClassName='bg-xuba-green-100 dark:bg-xuba-green-900 border-xuba-green-300 dark:border-xuba-green-700 leading-loose'
                  pointerClassName='text-xuba-green-500 dark:text-xuba-green-500 h-3 w-3'
                  containerClassName='inline-block mx-1'
                >
                  <span className='relative z-10'>{highlightWord} </span>
                </PointerHighlight>
              </span>
              <span className='block text-center font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mt-2 md:mt-4'>
                {headlinePart2}
              </span>
            </h1>

            {/* Description */}
            {description && (
              <p className='mx-auto max-w-2xl py-4 text-center text-base md:text-lg text-xuba-green-950 dark:text-white font-medium'>
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className='relative flex flex-col md:flex-row items-center gap-6 md:gap-14 py-4 sm:flex-row'>
              <HeroCTA
                href={primaryCta.href}
                label={primaryCta.label}
                variant='primary'
              />
              {secondaryCta && (
                <HeroCTA
                  href={secondaryCta.href}
                  label={secondaryCta.label}
                  variant='secondary'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
