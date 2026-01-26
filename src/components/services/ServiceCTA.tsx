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
 * Call-to-action section with gradient background.
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
        <span className="text-xuba-green-500">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-xuba-purple-950 via-xuba-purple-900 to-xuba-purple-950" />
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
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-white mb-6">
            {renderHeadline()}
          </h2>
          {subtext && (
            <p className="text-lg md:text-xl text-white/60 font-light mb-10 max-w-xl mx-auto">
              {subtext}
            </p>
          )}
          <Link
            href={buttonLink || '/contact'}
            className="inline-flex items-center gap-2 px-10 py-5 bg-xuba-green-500 text-xuba-purple-900 font-semibold hover:bg-xuba-green-400 transition-colors duration-300"
          >
            {buttonText || "Let's Talk"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
