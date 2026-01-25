'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { BlurFade } from '@/components/ui/blur-fade'
import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

/**
 * Xuba brand gradient colors for glass icons.
 * - Light mode: xuba-green hsl(68.92 63% 50%)
 * - Dark mode: xuba-purple hsl(297.09 56% 36%)
 */
const brandGradients = {
  light: 'linear-gradient(135deg, hsl(69, 63%, 50%), hsl(69, 63%, 40%))', // xuba-green
  dark: 'linear-gradient(135deg, hsl(297, 56%, 44%), hsl(297, 56%, 36%))',  // xuba-purple
}

/**
 * Feature data for the grid.
 */
const features = [
  {
    icon: IconCoin,
    title: 'Transparent Pricing',
    description:
      'No hidden fees, no surprise invoices. Fixed monthly costs you can budget for with complete confidence.',
  },
  {
    icon: IconCircleCheck,
    title: 'First-Time Resolution',
    description:
      'Our expert team resolves 90%+ of issues on the first call. No repeat visits, no wasted time.',
  },
  {
    icon: IconUsersGroup,
    title: 'Business-First Approach',
    description:
      'We take time to understand your operations. Solutions that fit your workflow, not the other way around.',
  },
  {
    icon: IconMessageCircle,
    title: 'Plain English',
    description:
      'No jargon. Clear explanations and straightforward advice you can actually use.',
  },
]

/**
 * GlassIcon - Individual glass-styled icon with 3D hover effect.
 * Automatically uses xuba-green for light theme and xuba-purple for dark theme.
 */
interface GlassIconProps {
  icon: React.ElementType
}

const GlassIcon = ({ icon: Icon }: GlassIconProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  const gradient = mounted
    ? resolvedTheme === 'dark'
      ? brandGradients.dark
      : brandGradients.light
    : brandGradients.light

  return (
    <div
      className='relative w-14 h-14 mb-5 group/icon cursor-pointer'
      style={{ perspective: '24em', transformStyle: 'preserve-3d' }}
    >
      {/* Background layer with gradient */}
      <span
        className={cn(
          'absolute top-0 left-0 w-full h-full rounded-xl block',
          'transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]',
          'origin-bottom-right rotate-15',
          'group-hover/icon:rotate-25 group-hover/icon:translate-x-[-0.3em] group-hover/icon:translate-y-[-0.3em]'
        )}
        style={{
          background: gradient,
          boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)',
        }}
        aria-hidden='true'
      />
      {/* Frosted glass layer with icon */}
      <span
        className={cn(
          'absolute top-0 left-0 w-full h-full rounded-xl flex',
          'bg-white/20 dark:bg-white/15',
          'backdrop-blur-md',
          'transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]',
          'group-hover/icon:translate-z-[2em] group-hover/icon:scale-105'
        )}
        style={{
          boxShadow: '0 0 0 1px hsla(0, 0%, 100%, 0.3) inset',
        }}
      >
        <Icon
          className='m-auto w-6 h-6 text-white'
          strokeWidth={1.5}
          aria-hidden='true'
        />
      </span>
    </div>
  )
}

/**
 * FeatureCard - Individual feature in the grid with glass icon.
 */
interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  index: number
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <BlurFade delay={0.3 + index * 0.1} inView direction='up'>
    <div className='group'>
      {/* Glass Icon */}
      <GlassIcon icon={icon} />

      {/* Title */}
      <h3 className='text-lg font-semibold text-xuba-green-900 dark:text-white mb-2 tracking-tight'>
        {title}
      </h3>

      {/* Description */}
      <p className='text-sm text-xuba-green-950 dark:text-xuba-green-200/60 leading-relaxed'>
        {description}
      </p>
    </div>
  </BlurFade>
)

/**
 * WhyXubaAbout - Two-column layout with statement and feature grid.
 *
 * Features:
 * - Bold statement with CTA on left
 * - 2x2 feature grid on right
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - Staggered BlurFade entrance animations
 *
 * @example
 * <WhyXubaAbout />
 */
export function WhyXubaAbout() {
  return (
    <section
      aria-labelledby='why-xuba-about-heading'
      className='relative px-6 py-24 md:py-32 overflow-hidden dark:bg-xuba-purple-900'
    >
      <div className='relative mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start'>
          {/* Left Column - Statement */}
          <div className='lg:sticky lg:top-32'>
            <BlurFade delay={0} inView>
              <span className='text-xuba-green-500 text-sm font-semibold tracking-wide uppercase mb-4 block'>
                Why Choose Xuba
              </span>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h2
                id='why-xuba-about-heading'
                className='text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-xuba-green-900 dark:text-white mb-6'
              >
                <span className='font-bold text-xuba-green-600 dark:text-white'>Built for reliability, designed for growth</span>
                <span className='font-normal text-xuba-green-950 dark:text-xuba-green-200/80'>
                 {' '}  - Your IT partner for every challenge. No shortcuts, just dependable support and solutions that scale.
                </span>
              </h2>
            </BlurFade>

            {/* <BlurFade delay={0.2} inView>
              <Link
                href='/about'
                className={cn(
                  'group inline-flex items-center gap-2',
                  'mt-8 px-6 py-4',
                  'rounded-none border-4',
                  // Light theme: gray background with gray border
                  'bg-gray-100 border-gray-600 text-gray-700',
                  // Dark theme: transparent with white border and glow
                  'dark:bg-transparent dark:border-white dark:text-white',
                  'dark:shadow-xl dark:shadow-xuba-green-500/30',
                  'font-semibold text-lg',
                  'hover:scale-105',
                  'transition-all duration-300',
                  'shadow-lg dark:shadow-xl'
                )}
              >
                More About Us
                <ArrowRight
                  className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
                  aria-hidden='true'
                />
              </Link>
            </BlurFade> */}
          </div>

          {/* Right Column - Feature Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12'>
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyXubaAbout
