'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { cn } from '@/lib/utils'

/**
 * Feature data with stats for the WhyXuba section.
 */
const features = [
  {
    stat: 0,
    prefix: '$',
    suffix: '',
    label: 'Hidden fees',
    description: 'Fixed pricing you can count on. No surprises, ever.',
  },
  {
    stat: 90,
    prefix: '',
    suffix: '%+',
    label: 'First-call resolution',
    description: 'Right first time. We don\'t do repeat visits.',
  },
  {
    stat: 24,
    prefix: '',
    suffix: '/7',
    label: 'Support available',
    description: 'We\'re here when you need us most.',
  },
  {
    stat: 100,
    prefix: '',
    suffix: '%',
    label: 'Jargon-free',
    description: 'Plain English, always. Tech talk translated.',
  },
]

/**
 * StatCard - Interactive card with animated number ticker.
 */
interface StatCardProps {
  stat: number
  prefix?: string
  suffix?: string
  label: string
  description: string
  index: number
}

const StatCard = ({
  stat,
  prefix = '',
  suffix = '',
  label,
  description,
  index,
}: StatCardProps) => (
  <BlurFade delay={0.1 + index * 0.12} inView direction='up'>
    <div
      className={cn(
        'group relative overflow-hidden',
        'p-8 h-full',
        'rounded-2xl',
        'bg-white dark:bg-xuba-purple-800/40',
        'border border-xuba-green-100/50 dark:border-xuba-purple-500/20',
        'hover:border-xuba-green-300 dark:hover:border-xuba-green-500/30',
        'transition-all duration-500 ease-out',
        'hover:shadow-lg hover:shadow-xuba-green-500/5',
        'dark:hover:shadow-xuba-purple-500/10'
      )}
    >
      {/* Background gradient on hover */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100',
          'bg-linear-to-br from-xuba-green-50/50 to-transparent',
          'dark:from-xuba-green-500/5 dark:to-transparent',
          'transition-opacity duration-500'
        )}
        aria-hidden='true'
      />

      {/* Content */}
      <div className='relative z-10'>
        {/* Stat number */}
        <div className='mb-4'>
          <span className='text-4xl md:text-5xl font-light text-xuba-green-600 dark:text-xuba-green-400 tabular-nums'>
            {prefix}
            <NumberTicker
              value={stat}
              delay={0.2 + index * 0.1}
              className='text-4xl md:text-5xl font-light text-xuba-green-600 dark:text-xuba-green-400'
            />
            {suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className='text-base font-semibold text-xuba-green-900 dark:text-white mb-2 tracking-tight'>
          {label}
        </h3>

        {/* Description */}
        <p className='text-sm text-xuba-green-600/70 dark:text-xuba-green-200/50 leading-relaxed'>
          {description}
        </p>
      </div>

      {/* Corner accent */}
      <div
        className={cn(
          'absolute -bottom-8 -right-8 w-24 h-24',
          'rounded-full',
          'bg-xuba-green-100/30 dark:bg-xuba-green-500/5',
          'group-hover:scale-150 group-hover:bg-xuba-green-200/40 dark:group-hover:bg-xuba-green-500/10',
          'transition-all duration-700 ease-out'
        )}
        aria-hidden='true'
      />
    </div>
  </BlurFade>
)

/**
 * WhyXubaStats - Displays key differentiators with animated number stats.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - NumberTicker animations for stats
 * - Interactive hover effects
 * - Staggered BlurFade entrance animations
 *
 * @example
 * <WhyXubaStats />
 */
export function WhyXubaStats() {
  return (
    <section
      aria-labelledby='why-xuba-stats-heading'
      className='relative px-6 py-24 md:py-32 overflow-hidden dark:bg-xuba-purple-900'
    >
      <div className='relative mx-auto max-w-6xl'>
        {/* Header */}
        <BlurFade delay={0} inView>
          <div className='text-center mb-16 md:mb-20'>
            <span className='text-xuba-green-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3 block'>
              By the numbers
            </span>
            <h2
              id='why-xuba-stats-heading'
              className='text-3xl md:text-4xl font-light tracking-tight text-xuba-green-900 dark:text-white'
            >
              The{' '}
              <span className='font-medium text-xuba-green-600 dark:text-xuba-green-400'>
                Xuba
              </span>{' '}
              difference
            </h2>
            <p className='mt-4 text-xuba-green-600/70 dark:text-xuba-green-200/50 max-w-md mx-auto'>
              Real results, real commitment. Here&apos;s what sets us apart.
            </p>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {features.map((feature, index) => (
            <StatCard key={feature.label} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <BlurFade delay={0.8} inView>
          <div className='flex justify-center mt-16'>
            <p className='text-sm text-xuba-green-500/60 dark:text-xuba-green-400/40 tracking-wide'>
              Experience the difference →
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

export default WhyXubaStats
