'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceCTAProps {
  headline?: string | null
  highlight?: string | null
  subtext?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  serviceName?: string
}

/**
 * Call-to-action section with gradient background and theme-compliant button.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function ServiceCTA({
  headline,
  highlight,
  subtext,
  buttonText = "Let's Talk",
  buttonLink = '/contact',
  serviceName,
}: ServiceCTAProps) {
  // Generate default headline if not provided
  const defaultHeadline = serviceName
    ? `Ready to Get Started with ${serviceName}?`
    : 'Ready to Get Started?'
  const displayHeadline = headline || defaultHeadline

  // Render headline with highlight
  const renderHeadline = () => {
    if (!highlight) return displayHeadline

    const parts = displayHeadline.split(highlight)
    if (parts.length === 1) return displayHeadline

    return (
      <>
        {parts[0]}
        <span className="text-xuba-green-500 dark:text-xuba-green-500">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Light mode background */}
      <div className="absolute inset-0 bg-linear-to-br from-xuba-green-50 via-white to-xuba-green-50 dark:from-xuba-purple-950 dark:via-xuba-purple-900 dark:to-xuba-purple-950" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-xuba-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-xuba-green-900 dark:text-white mb-6">
            {renderHeadline()}
          </h2>
          {subtext && (
            <p className="text-lg md:text-xl text-xuba-green-900 dark:text-white/60 font-light mb-10 max-w-xl mx-auto">
              {subtext}
            </p>
          )}
          {/* CTA Button - Following theming guidelines */}
          <Link
            href={buttonLink || '/contact'}
            className="group inline-flex w-64 justify-center rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300
              hover:scale-105 active:scale-[0.98]
              bg-gray-100 border-gray-600 text-gray-700 shadow-lg
              dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-purple-500/40"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg font-medium tracking-tight whitespace-nowrap">{buttonText || "Let's Talk"}</span>
              <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5">
                <ArrowRight className="h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500" />
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
