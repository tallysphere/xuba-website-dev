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
 * Displays a compact call-to-action banner between content sections.
 */
export default function ContactMiniCTA({
  enabled = true,
  heading = 'Get a free consultation call!',
  buttonText = 'Get In Touch',
  buttonLink = '/contact',
}: ContactMiniCTAProps) {
  if (!enabled) return null

  return (
    <section className="relative py-16 md:py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-xuba-purple-950 via-xuba-purple-900/50 to-xuba-purple-950 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 border border-white/10 bg-white/[0.02]">
          {/* Left side - Icon and Label */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-xuba-green-500/10 border border-xuba-green-500/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-xuba-green-500" />
            </div>
            <div>
              <span className="text-xuba-green-500 text-xs font-medium tracking-[0.2em] uppercase block mb-1">
                Contact
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white">
                {heading}
              </h3>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <Link
            href={buttonLink || '/contact'}
            className="group flex items-center gap-2 px-8 py-4 bg-xuba-green-500 text-xuba-purple-900 font-semibold hover:bg-xuba-green-400 transition-all duration-300 whitespace-nowrap"
          >
            {buttonText || 'Get In Touch'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
