'use client'

import { motion } from 'motion/react'
import {
  IconCoin,
  IconCircleCheck,
  IconUsersGroup,
  IconMessageCircle,
} from '@tabler/icons-react'

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

export function WhyXuba() {
  return (
    <section className='relative bg-xuba-purple-900 px-6 py-24 md:py-40 overflow-hidden'>
      {/* Subtle background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-xuba-purple-950/30 via-transparent to-xuba-purple-950/50 pointer-events-none' />

      <div className='relative mx-auto max-w-6xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='text-center mb-16 md:mb-24'
        >
          <span className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block'>
            The Xuba Difference
          </span>
          <h2 className='text-3xl md:text-5xl font-extralight tracking-tight text-white'>
            Why <span className='text-xuba-green-500'>Choose</span> Us?
          </h2>
          <span className='block w-12 h-[2px] bg-xuba-green-500 mx-auto mt-6' />
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
              className='group relative'
            >
              <div className='flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:bg-white/[0.03]'>
                {/* Number */}
                {/* <span className='absolute top-4 right-4 text-white/10 text-5xl font-extralight'>
                  0{index + 1}
                </span> */}

                {/* Icon */}
                <div className='relative mb-6 w-16 h-16 flex items-center justify-center'>
                  <div className='absolute inset-0 rounded-full border border-white/10 group-hover:border-xuba-green-500/50 transition-colors duration-300' />
                  <feature.icon className='h-7 w-7 text-white/80 group-hover:text-xuba-green-400 transition-colors duration-300' />
                </div>

                {/* Title */}
                <h3 className='mb-3 text-xl md:text-2xl font-extralight tracking-tight text-white group-hover:text-xuba-green-400 transition-colors duration-300'>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className='text-sm text-white/50 font-light leading-relaxed'>
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
