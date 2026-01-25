'use client'

import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
} from '@tabler/icons-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'

/**
 * Feature data for the WhyXuba section.
 */
const features = [
  {
    icon: IconCoin,
    title: 'Fixed pricing',
    subtitle: 'Zero surprises',
    description: 'Budget with confidence.',
  },
  {
    icon: IconCircleCheck,
    title: 'Right first time',
    subtitle: 'Done once',
    description: '90%+ first-call resolution.',
  },
  {
    icon: IconUsersGroup,
    title: 'We get you',
    subtitle: 'Your language',
    description: 'Tech that fits your business.',
  },
  {
    icon: IconMessageCircle,
    title: 'Plain talk',
    subtitle: 'No jargon',
    description: 'Clear answers, always.',
  },
]

/**
 * FeatureCard - Minimalistic card for displaying a single feature.
 */
interface FeatureCardProps {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  index: number
}

const FeatureCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  index,
}: FeatureCardProps) => (
  <BlurFade delay={0.1 + index * 0.15} inView direction='up'>
    <div
      className={cn(
        'group relative flex flex-col items-center text-center p-8',
        'transition-all duration-500 ease-out'
      )}
    >
      {/* Subtle number indicator */}
      <span
        className='absolute top-4 right-4 text-6xl font-extralight text-xuba-green-100 dark:text-xuba-purple-700/50 select-none'
        aria-hidden='true'
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className={cn(
          'relative mb-6 w-14 h-14 flex items-center justify-center',
          'rounded-full',
          'bg-xuba-green-50 dark:bg-xuba-purple-800/80',
          'group-hover:bg-xuba-green-100 dark:group-hover:bg-xuba-purple-700/80',
          'transition-colors duration-300'
        )}
      >
        <Icon
          className='w-6 h-6 text-xuba-green-600 dark:text-xuba-green-400'
          strokeWidth={1.5}
          aria-hidden='true'
        />
      </div>

      {/* Title & Subtitle */}
      <div className='mb-3'>
        <h3 className='text-lg font-medium text-xuba-green-900 dark:text-white tracking-tight'>
          {title}
        </h3>
        <p className='text-sm text-xuba-green-500 dark:text-xuba-green-400 font-medium'>
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p className='text-sm text-xuba-green-600/70 dark:text-xuba-green-200/60 max-w-[200px]'>
        {description}
      </p>

      {/* Hover line indicator */}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2',
          'w-0 h-[2px] bg-xuba-green-500',
          'group-hover:w-12 transition-all duration-300 ease-out'
        )}
        aria-hidden='true'
      />
    </div>
  </BlurFade>
)

/**
 * WhyXuba - Displays the key differentiators and value propositions.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - Staggered BlurFade entrance animations
 * - Minimalistic, modern design
 *
 * @example
 * <WhyXuba />
 */
export function WhyXuba() {
  return (
    <section
      aria-labelledby='why-xuba-heading'
      className='relative px-6 py-24 md:py-32 overflow-hidden dark:bg-xuba-purple-900'
    >
      <div className='relative mx-auto max-w-5xl'>
        {/* Header */}
        <BlurFade delay={0} inView>
          <div className='text-center mb-16 md:mb-20'>
            <span className='text-xuba-green-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3 block'>
              The Xuba Difference
            </span>
            <h2
              id='why-xuba-heading'
              className='text-3xl md:text-4xl font-light tracking-tight text-xuba-green-900 dark:text-white'
            >
              Why{' '}
              <span className='font-medium text-xuba-green-600 dark:text-xuba-green-400'>
                choose
              </span>{' '}
              us?
            </h2>
          </div>
        </BlurFade>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4'>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom accent line */}
        <BlurFade delay={0.7} inView>
          <div className='flex justify-center mt-16'>
            <div
              className='w-24 h-px bg-linear-to-r from-transparent via-xuba-green-300 dark:via-xuba-green-500/50 to-transparent'
              aria-hidden='true'
            />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

export default WhyXuba
