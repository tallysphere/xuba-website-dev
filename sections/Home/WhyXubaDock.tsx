'use client'

import { useState } from 'react'
import { Dock, DockIcon } from '@/components/ui/dock'
import { BlurFade } from '@/components/ui/blur-fade'
import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

/**
 * Feature data for the dock.
 */
const features = [
  {
    id: 'pricing',
    icon: IconCoin,
    title: 'Fixed Pricing',
    subtitle: '$0 Hidden Fees',
    description:
      'Budget with confidence. No surprise costs, no hidden charges. What we quote is what you pay.',
  },
  {
    id: 'resolution',
    icon: IconCircleCheck,
    title: 'Right First Time',
    subtitle: '90%+ Resolution Rate',
    description:
      'We don\'t do repeat visits. Our expert team resolves issues on the first call, saving you time.',
  },
  {
    id: 'understand',
    icon: IconUsersGroup,
    title: 'We Get You',
    subtitle: 'Your Language',
    description:
      'We take time to understand your business. Tech solutions that fit you, not the other way around.',
  },
  {
    id: 'communication',
    icon: IconMessageCircle,
    title: 'Plain Talk',
    subtitle: 'No Jargon',
    description:
      'Clear answers, always. We explain things in plain English so you\'re never left confused.',
  },
]

/**
 * WhyXubaDock - Displays key differentiators with interactive dock UI.
 *
 * Features:
 * - MacOS-style dock with magnification effect
 * - Click to reveal detailed description
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 *
 * @example
 * <WhyXubaDock />
 */
export function WhyXubaDock() {
  const [activeFeature, setActiveFeature] = useState(features[0])

  return (
    <section
      aria-labelledby='why-xuba-dock-heading'
      className='relative px-6 py-24 md:py-32 overflow-hidden dark:bg-xuba-purple-900'
    >
      <div className='relative mx-auto max-w-4xl'>
        {/* Header */}
        <BlurFade delay={0} inView>
          <div className='text-center mb-12 md:mb-16'>
            <span className='text-xuba-green-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3 block'>
              The Xuba Difference
            </span>
            <h2
              id='why-xuba-dock-heading'
              className='text-3xl md:text-4xl font-light tracking-tight text-xuba-green-900 dark:text-white'
            >
              Click to{' '}
              <span className='font-medium text-xuba-green-600 dark:text-xuba-green-400'>
                explore
              </span>
            </h2>
          </div>
        </BlurFade>

        {/* Feature Detail Card */}
        <BlurFade delay={0.2} inView>
          <div
            className={cn(
              'relative mx-auto max-w-lg mb-12',
              'p-8 rounded-2xl',
              'bg-white dark:bg-xuba-purple-800/40',
              'border border-xuba-green-100 dark:border-xuba-purple-500/20',
              'shadow-lg shadow-xuba-green-500/5 dark:shadow-none',
              'transition-all duration-500'
            )}
          >
            {/* Active icon */}
            <div
              className={cn(
                'w-14 h-14 mb-6 rounded-full flex items-center justify-center',
                'bg-xuba-green-100 dark:bg-xuba-green-500/20'
              )}
            >
              <activeFeature.icon
                className='w-7 h-7 text-xuba-green-600 dark:text-xuba-green-400'
                strokeWidth={1.5}
              />
            </div>

            {/* Title & Subtitle */}
            <h3 className='text-xl font-semibold text-xuba-green-900 dark:text-white mb-1'>
              {activeFeature.title}
            </h3>
            <p className='text-sm font-medium text-xuba-green-500 dark:text-xuba-green-400 mb-4'>
              {activeFeature.subtitle}
            </p>

            {/* Description */}
            <p className='text-xuba-green-600/80 dark:text-xuba-green-200/60 leading-relaxed'>
              {activeFeature.description}
            </p>

            {/* Progress dots */}
            <div className='flex gap-2 mt-6'>
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    activeFeature.id === feature.id
                      ? 'w-6 bg-xuba-green-500'
                      : 'bg-xuba-green-200 dark:bg-xuba-purple-600 hover:bg-xuba-green-300'
                  )}
                  aria-label={`View ${feature.title}`}
                />
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Interactive Dock */}
        <BlurFade delay={0.3} inView>
          <div className='flex justify-center'>
            <Dock
              iconSize={50}
              iconMagnification={70}
              iconDistance={100}
              direction='bottom'
              className={cn(
                'bg-white/80 dark:bg-xuba-purple-800/60',
                'border-xuba-green-100 dark:border-xuba-purple-500/20',
                'backdrop-blur-md'
              )}
            >
              {features.map((feature) => (
                <DockIcon
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={cn(
                    'cursor-pointer rounded-full transition-colors',
                    activeFeature.id === feature.id
                      ? 'bg-xuba-green-100 dark:bg-xuba-green-500/20'
                      : 'hover:bg-xuba-green-50 dark:hover:bg-xuba-purple-700/50'
                  )}
                >
                  <feature.icon
                    className={cn(
                      'w-6 h-6 transition-colors',
                      activeFeature.id === feature.id
                        ? 'text-xuba-green-600 dark:text-xuba-green-400'
                        : 'text-xuba-green-500/70 dark:text-xuba-green-300/70'
                    )}
                    strokeWidth={1.5}
                  />
                </DockIcon>
              ))}
            </Dock>
          </div>
        </BlurFade>

        {/* Helper text */}
        <BlurFade delay={0.4} inView>
          <p className='text-center mt-8 text-sm text-xuba-green-500/50 dark:text-xuba-green-400/30'>
            Hover to magnify • Click to learn more
          </p>
        </BlurFade>
      </div>
    </section>
  )
}

export default WhyXubaDock
