'use client'

import { Marquee } from '@/components/ui/marquee'
import { BlurFade } from '@/components/ui/blur-fade'
import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
  IconShieldCheck,
  IconClock24,
  IconHeadset,
  IconThumbUp,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

/**
 * Feature items for the marquee.
 */
const features = [
  { icon: IconCoin, text: '$0 Hidden Fees' },
  { icon: IconCircleCheck, text: '90%+ First-Call Resolution' },
  { icon: IconUsersGroup, text: 'We Understand Your Business' },
  { icon: IconMessageCircle, text: 'Plain English, Always' },
  { icon: IconShieldCheck, text: 'Secure & Reliable' },
  { icon: IconClock24, text: '24/7 Support Available' },
  { icon: IconHeadset, text: 'Dedicated Account Manager' },
  { icon: IconThumbUp, text: '100% Satisfaction Guaranteed' },
]

/**
 * FeatureChip - Individual feature item in the marquee.
 */
interface FeatureChipProps {
  icon: React.ElementType
  text: string
}

const FeatureChip = ({ icon: Icon, text }: FeatureChipProps) => (
  <div
    className={cn(
      'flex items-center gap-3 px-6 py-3',
      'rounded-full',
      'bg-white dark:bg-xuba-purple-800/60',
      'border border-xuba-green-100 dark:border-xuba-purple-500/20',
      'shadow-sm',
      'transition-all duration-300',
      'hover:border-xuba-green-300 dark:hover:border-xuba-green-500/30',
      'hover:shadow-md hover:shadow-xuba-green-500/5'
    )}
  >
    <Icon
      className='h-5 w-5 text-xuba-green-500 shrink-0'
      strokeWidth={1.5}
      aria-hidden='true'
    />
    <span className='text-sm font-medium text-xuba-green-800 dark:text-xuba-green-100 whitespace-nowrap'>
      {text}
    </span>
  </div>
)

/**
 * WhyXubaMarquee - Displays key differentiators with scrolling marquee.
 *
 * Features:
 * - Continuous scrolling animation
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - Pause on hover
 *
 * @example
 * <WhyXubaMarquee />
 */
export function WhyXubaMarquee() {
  // Split features into two rows
  const firstRow = features.slice(0, 4)
  const secondRow = features.slice(4)

  return (
    <section
      aria-labelledby='why-xuba-marquee-heading'
      className='relative py-24 md:py-32 overflow-hidden dark:bg-xuba-purple-900'
    >
      <div className='relative mx-auto max-w-6xl px-6'>
        {/* Header */}
        <BlurFade delay={0} inView>
          <div className='text-center mb-12 md:mb-16'>
            <span className='text-xuba-green-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3 block'>
              The Xuba Difference
            </span>
            <h2
              id='why-xuba-marquee-heading'
              className='text-3xl md:text-4xl font-light tracking-tight text-xuba-green-900 dark:text-white'
            >
              Why businesses{' '}
              <span className='font-medium text-xuba-green-600 dark:text-xuba-green-400'>
                trust
              </span>{' '}
              us
            </h2>
          </div>
        </BlurFade>
      </div>

      {/* Marquee rows - full width */}
      <BlurFade delay={0.2} inView>
        <div className='relative'>
          {/* Gradient masks */}
          <div
            className='pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-white dark:from-xuba-purple-900 to-transparent'
            aria-hidden='true'
          />
          <div
            className='pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-white dark:from-xuba-purple-900 to-transparent'
            aria-hidden='true'
          />

          {/* First row - scrolls left */}
          <Marquee pauseOnHover className='[--duration:30s] mb-4'>
            {firstRow.map((feature) => (
              <FeatureChip key={feature.text} {...feature} />
            ))}
          </Marquee>

          {/* Second row - scrolls right */}
          <Marquee pauseOnHover reverse className='[--duration:35s]'>
            {secondRow.map((feature) => (
              <FeatureChip key={feature.text} {...feature} />
            ))}
          </Marquee>
        </div>
      </BlurFade>

      {/* Bottom CTA */}
      <div className='relative mx-auto max-w-6xl px-6'>
        <BlurFade delay={0.4} inView>
          <div className='text-center mt-12'>
            <p className='text-sm text-xuba-green-500/60 dark:text-xuba-green-400/40'>
              Hover to pause • Experience the difference
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

export default WhyXubaMarquee
