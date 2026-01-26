'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

interface ContactMiniCTAProps {
  enabled?: boolean
  heading?: string | null
  buttonText?: string | null
  buttonLink?: string | null
}

/**
 * Mini contact CTA section inspired by Qualitas "Get a free consultation call!" design.
 * Supports light and dark modes with theme-compliant buttons.
 */
export default function ContactMiniCTA({
  enabled = true,
  heading = 'Get a free consultation call!',
  buttonText = 'Get In Touch',
  buttonLink = '/contact',
}: ContactMiniCTAProps) {
  if (!enabled) return null

  return (
    <section className="relative py-16 md:py-20 px-6 bg-white dark:bg-xuba-purple-950">
      <div className="absolute inset-0 bg-linear-to-r from-xuba-green-50 via-white to-xuba-green-50 dark:from-xuba-purple-950 dark:via-xuba-purple-900/50 dark:to-xuba-purple-950 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 border border-xuba-green-200 dark:border-white/10 bg-xuba-green-50/50 dark:bg-white/2">
          {/* Left side - Icon and Label */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-xuba-green-500/10 border border-xuba-green-500/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-xuba-green-600 dark:text-xuba-green-500" />
            </div>
            <div>
              <span className="text-xuba-green-600 dark:text-xuba-green-500 text-xs font-medium tracking-[0.2em] uppercase block mb-1">
                Contact
              </span>
              <h3 className="text-xl md:text-2xl font-light text-xuba-green-900 dark:text-white">
                {heading}
              </h3>
            </div>
          </div>

          {/* Right side - CTA Button matching HeroCTA styling */}
          <Link
            href={buttonLink || '/contact'}
            className="group w-64 rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300
              hover:scale-105 active:scale-[0.98]
              bg-xuba-green-50 border-xuba-green-500 text-xuba-green-800 shadow-lg
              dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-purple-500/40"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg font-medium tracking-tight whitespace-nowrap">{buttonText || 'Get In Touch'}</span>
              <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5">
                <ArrowRight className="h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500" />
              </span>
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
