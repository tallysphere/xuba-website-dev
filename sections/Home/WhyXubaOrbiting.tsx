'use client'

import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { BlurFade } from '@/components/ui/blur-fade'
import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

/**
 * WhyXubaOrbiting - Displays key differentiators with orbiting circles animation.
 *
 * Features:
 * - Central brand element with orbiting benefits
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - Eye-catching orbital animation
 *
 * @example
 * <WhyXubaOrbiting />
 */
export function WhyXubaOrbiting() {
  return (
    <section
      aria-labelledby='why-xuba-orbiting-heading'
      className='relative px-6 py-24 md:py-32 overflow-hidden dark:bg-xuba-purple-900'
    >
      <div className='relative mx-auto max-w-6xl'>
        {/* Header */}
        <BlurFade delay={0} inView>
          <div className='text-center mb-8 md:mb-12'>
            <span className='text-xuba-green-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3 block'>
              The Xuba Difference
            </span>
            <h2
              id='why-xuba-orbiting-heading'
              className='text-3xl md:text-4xl font-light tracking-tight text-xuba-green-900 dark:text-white'
            >
              Everything{' '}
              <span className='font-medium text-xuba-green-600 dark:text-xuba-green-400'>
                revolves
              </span>{' '}
              around you
            </h2>
          </div>
        </BlurFade>

        {/* Orbiting Circles */}
        <BlurFade delay={0.2} inView>
          <div className='relative flex h-[500px] w-full flex-col items-center justify-center'>
            {/* Center element */}
            <div className='z-10 flex flex-col items-center justify-center'>
              <div
                className={cn(
                  'flex h-24 w-24 items-center justify-center rounded-full',
                  'bg-xuba-green-500 dark:bg-xuba-green-500',
                  'shadow-lg shadow-xuba-green-500/30'
                )}
              >
                <span className='text-2xl font-bold text-white tracking-tight'>
                  XUBA
                </span>
              </div>
              <p className='mt-4 text-sm text-xuba-green-600/70 dark:text-xuba-green-200/50'>
                Your IT Partner
              </p>
            </div>

            {/* Inner orbit - 2 items */}
            <OrbitingCircles
              radius={120}
              duration={25}
              delay={0}
              className='border-none bg-transparent'
            >
              <OrbitItem
                icon={IconCoin}
                label='$0 Fees'
                className='bg-white dark:bg-xuba-purple-800'
              />
              <OrbitItem
                icon={IconCircleCheck}
                label='First Time'
                className='bg-white dark:bg-xuba-purple-800'
              />
            </OrbitingCircles>

            {/* Outer orbit - 2 items, reverse */}
            <OrbitingCircles
              radius={200}
              duration={35}
              reverse
              delay={0}
              className='border-none bg-transparent'
            >
              <OrbitItem
                icon={IconUsersGroup}
                label='We Get You'
                className='bg-white dark:bg-xuba-purple-800'
              />
              <OrbitItem
                icon={IconMessageCircle}
                label='Plain Talk'
                className='bg-white dark:bg-xuba-purple-800'
              />
            </OrbitingCircles>
          </div>
        </BlurFade>

        {/* Bottom description */}
        <BlurFade delay={0.4} inView>
          <div className='text-center mt-8'>
            <p className='text-xuba-green-600/70 dark:text-xuba-green-200/50 max-w-md mx-auto'>
              Fixed pricing. First-call resolution. Plain English. Always.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

/**
 * OrbitItem - Individual item in the orbit.
 */
interface OrbitItemProps {
  icon: React.ElementType
  label: string
  className?: string
}

const OrbitItem = ({ icon: Icon, label, className }: OrbitItemProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'h-16 w-16 rounded-full',
      'border border-xuba-green-200 dark:border-xuba-purple-500/30',
      'shadow-md',
      className
    )}
  >
    <Icon
      className='h-5 w-5 text-xuba-green-600 dark:text-xuba-green-400'
      strokeWidth={1.5}
      aria-hidden='true'
    />
    <span className='text-[10px] font-medium text-xuba-green-700 dark:text-xuba-green-300 mt-1'>
      {label}
    </span>
  </div>
)

export default WhyXubaOrbiting
