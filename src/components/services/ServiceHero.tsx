'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { urlFor } from '@/sanity/lib/image'

interface HeroImage {
  asset?: { _ref: string; _type: string } | null
  alt?: string | null
  hotspot?: { x: number; y: number; height: number; width: number } | null
  crop?: { top: number; bottom: number; left: number; right: number } | null
}

interface ServiceHeroProps {
  title: string
  tagline?: string | null
  taglineHighlight?: string | null
  subtitle?: string | null
  heroImage?: HeroImage | null
}

/**
 * Hero section for service pages with animated text, optional featured image, and CTA buttons.
 */
export default function ServiceHero({
  title,
  tagline,
  taglineHighlight,
  subtitle,
  heroImage,
}: ServiceHeroProps) {
  // Split tagline to highlight specific word
  const renderTagline = () => {
    if (!tagline) return null
    if (!taglineHighlight) return tagline

    const parts = tagline.split(taglineHighlight)
    if (parts.length === 1) return tagline

    return (
      <>
        {parts[0]}
        <span className="text-xuba-green-500">{taglineHighlight}</span>
        {parts[1]}
      </>
    )
  }

  const hasHeroImage = heroImage?.asset

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-xuba-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-xuba-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-xuba-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {hasHeroImage ? (
          // Layout with hero image (two-column on desktop)
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <BlurFade delay={0.1}>
                <span className="text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
                  {title}
                </span>
              </BlurFade>

              <BlurFade delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-6">
                  {renderTagline()}
                </h1>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p className="text-lg md:text-xl text-white/60 font-light mb-10">
                  {subtitle}
                </p>
              </BlurFade>

              <BlurFade delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:text-xuba-purple-900 transition-all duration-300"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="#learn-more"
                    className="flex items-center gap-2 px-8 py-4 text-white/60 hover:text-white transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </BlurFade>
            </div>

            {/* Hero Image */}
            <BlurFade delay={0.3}>
              <div className="relative">
                {/* Decorative elements behind image */}
                <div className="absolute -inset-4 bg-linear-to-br from-xuba-green-500/20 to-xuba-purple-500/20 blur-2xl" />
                <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-xuba-green-500/30" />
                <div className="absolute -left-4 -bottom-4 w-24 h-24 border-2 border-xuba-purple-500/30" />

                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={urlFor(heroImage).width(800).height(600).url()}
                    alt={heroImage.alt || title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-xuba-purple-900/50 to-transparent" />
                </div>
              </div>
            </BlurFade>
          </div>
        ) : (
          // Original centered layout (no image)
          <div className="text-center max-w-4xl mx-auto">
            <BlurFade delay={0.1}>
              <span className="text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
                {title}
              </span>
            </BlurFade>

            <BlurFade delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6">
                {renderTagline()}
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-10">
                {subtitle}
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:text-xuba-purple-900 transition-all duration-300"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#learn-more"
                  className="flex items-center gap-2 px-8 py-4 text-white/60 hover:text-white transition-colors"
                >
                  Learn More
                </a>
              </div>
            </BlurFade>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-xuba-green-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
