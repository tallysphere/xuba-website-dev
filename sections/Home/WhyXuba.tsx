'use client'

import { motion } from 'motion/react'
import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
} from '@tabler/icons-react'

/**
 * Feature data for the WhyXuba section.
 */
const features = [
  {
    icon: IconCoin,
    title: 'No surprise costs',
    description: 'Predictable pricing, Always',
  },
  {
    icon: IconCircleCheck,
    title: 'Right first time',
    description: "We don't do repeat visits",
  },
  {
    icon: IconUsersGroup,
    title: 'We get you',
    description: 'We take time to understand your business',
  },
  {
    icon: IconMessageCircle,
    title: 'No gobblygook',
    description: 'Plain English, Always',
  },
]

/**
 * WhyXuba - Displays the key differentiators and value propositions.
 *
 * Features:
 * - Theme-aware colors (light and dark mode)
 * - Accessible with proper ARIA attributes
 * - Reduced motion support
 * - Staggered entrance animations
 *
 * @example
 * <WhyXuba />
 */
export function WhyXuba() {
  return (
    <section
      aria-labelledby='why-xuba-heading'
      className='relative px-6 py-24 md:py-40 overflow-hidden dark:bg-xuba-purple-900'
    >


      <div className='relative mx-auto max-w-6xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='text-center mb-16 md:mb-24 motion-reduce:opacity-100 motion-reduce:transform-none'
        >
          <span className='text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block'>
            The Xuba Difference
          </span>
          <h2
            id='why-xuba-heading'
            className='text-3xl md:text-5xl font-extralight tracking-tight text-xuba-green-900 dark:text-white'
          >
            Why <span className='text-xuba-green-600 dark:text-xuba-green-500'>Choose</span> Us?
          </h2>
          <span
            className='block w-12 h-[2px] bg-xuba-green-500 mx-auto mt-6'
            aria-hidden='true'
          />
        </motion.div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              className='group relative motion-reduce:opacity-100 motion-reduce:transform-none'
            >
              <div className='flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-xuba-green-100/50 dark:hover:bg-white/3'>
                {/* Icon */}
                <div className='relative mb-6 w-16 h-16 flex items-center justify-center'>
                  <div
                    className='absolute inset-0 rounded-full border border-xuba-green-200 dark:border-white/10 group-hover:border-xuba-green-500 dark:group-hover:border-xuba-green-500/50 transition-colors duration-300'
                    aria-hidden='true'
                  />
                  <feature.icon
                    className='h-7 w-7 text-xuba-green-600 dark:text-white/80 group-hover:text-xuba-green-500 dark:group-hover:text-xuba-green-400 transition-colors duration-300'
                    aria-hidden='true'
                  />
                </div>

                {/* Title */}
                <h3 className='mb-3 text-xl md:text-2xl font-extralight tracking-tight text-xuba-green-900 dark:text-white group-hover:text-xuba-green-600 dark:group-hover:text-xuba-green-400 transition-colors duration-300'>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className='text-sm text-xuba-green-600 dark:text-white/50 font-light leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyXuba
