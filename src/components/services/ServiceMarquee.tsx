'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'
import { urlFor } from '@/sanity/lib/image'

interface Logo {
  _key?: string
  asset?: {
    _ref: string
    _type: 'reference'
  } | null
  alt?: string | null
}

interface ServiceMarqueeProps {
  title?: string | null
  logos?: Logo[] | null
}

/**
 * Optional marquee section for displaying client logos or technology stack.
 * Provides seamless infinite horizontal scroll with pause on hover.
 */
export default function ServiceMarquee({ title, logos }: ServiceMarqueeProps) {
  // Only render if logos are provided
  if (!logos || logos.length === 0) return null

  return (
    <section className='relative py-16 md:py-20 overflow-hidden'>
      <div className='max-w-6xl mx-auto px-6 mb-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center'
        >
          {title && (
            <span className='text-white/40 text-sm font-light tracking-wider'>
              {title}
            </span>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Marquee
          pauseOnHover
          className='[--duration:30s] [--gap:3rem]'
        >
          {logos.map((logo, index) => {
            if (!logo.asset) return null
            return (
              <div
                key={logo._key ?? index}
                className='flex items-center justify-center w-32 h-16 opacity-50 hover:opacity-100 transition-opacity duration-300'
              >
                <Image
                  src={urlFor(logo).width(128).height(64).url()}
                  alt={logo.alt || 'Partner logo'}
                  width={128}
                  height={64}
                  className='object-contain grayscale hover:grayscale-0 transition-all duration-300'
                />
              </div>
            )
          })}
        </Marquee>
      </motion.div>
    </section>
  )
}
