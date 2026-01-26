'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageHotspot, SanityImageCrop } from '@/sanity/types'

interface HeroImage {
  asset: {
    _ref: string
    _type: 'reference'
  } | null
  alt: string | null
  hotspot: SanityImageHotspot | null
  crop: SanityImageCrop | null
}

interface ServiceHeroProps {
  title: string
  tagline?: string | null
  taglineHighlight?: string | null
  subtitle?: string | null
  heroImage?: HeroImage | null
}

/**
 * Hero section for service pages with animated text, optional featured image, and theme-compliant CTA buttons.
 * Supports light and dark modes following Xuba theming guidelines.
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
        <span className="text-xuba-green-500 dark:text-xuba-green-400">{taglineHighlight}</span>
        {parts[1]}
      </>
    )
  }

  const hasHeroImage = heroImage?.asset

  return (
    <section className="relative h-[70dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-white dark:bg-xuba-purple-950">
      {/* Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-xuba-green-500/5 dark:bg-xuba-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-xuba-green-200/30 dark:bg-xuba-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-xuba-green-100/50 dark:bg-xuba-green-500/5 rounded-full blur-3xl" />
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {hasHeroImage ? (
          // Layout with hero image (two-column on desktop)
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <BlurFade delay={0.1}>
                <span className="text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
                  {title}
                </span>
              </BlurFade>

              <BlurFade delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-xuba-green-900 dark:text-white mb-6">
                  {renderTagline()}
                </h1>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p className="text-lg md:text-xl text-xuba-green-700 dark:text-white/60 font-light mb-10">
                  {subtitle}
                </p>
              </BlurFade>

              <BlurFade delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                  {/* Primary Button - Following theming guidelines */}
                  <Link
                    href="/contact"
                    className="group w-64 rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300
                      hover:scale-105 active:scale-[0.98]
                      bg-gray-100 border-gray-600 text-gray-700 shadow-lg
                      dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-purple-500/40"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-lg font-medium tracking-tight whitespace-nowrap">Get in Touch</span>
                      <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5">
                        <ArrowRight className="h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500" />
                      </span>
                    </span>
                  </Link>
                  {/* Secondary Button - Following theming guidelines with smooth scroll */}
                  <button
                    onClick={() => {
                      document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group w-64 md:w-56 rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300
                      hover:scale-105 active:scale-[0.98]
                      bg-gray-100 border-gray-600 text-gray-700 shadow-lg
                      dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-green-500/30"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-lg font-medium tracking-tight whitespace-nowrap">Learn More</span>
                      <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5">
                        <ArrowRight className="h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500" />
                      </span>
                    </span>
                  </button>
                </div>
              </BlurFade>
            </div>

            {/* Hero Image */}
            <BlurFade delay={0.3}>
              <div className="relative">
                {/* Decorative elements behind image */}
                <div className="absolute -inset-4 bg-linear-to-br from-xuba-green-500/20 to-xuba-purple-500/20 blur-2xl" />
                <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-xuba-green-500/30" />
                <div className="absolute -left-4 -bottom-4 w-24 h-24 border-2 border-xuba-green-300 dark:border-xuba-purple-500/30" />

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
                  <div className="absolute inset-0 bg-linear-to-t from-white/50 dark:from-xuba-purple-900/50 to-transparent" />
                </div>
              </div>
            </BlurFade>
          </div>
        ) : (
          // Original centered layout (no image)
          <div className="text-center max-w-4xl mx-auto">
            <BlurFade delay={0.1}>
              <span className="text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
                {title}
              </span>
            </BlurFade>

            <BlurFade delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-xuba-green-900 dark:text-white mb-6">
                {renderTagline()}
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="text-xl md:text-2xl text-xuba-green-700 dark:text-white/60 font-light max-w-2xl mx-auto mb-10">
                {subtitle}
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Primary Button - Following theming guidelines */}
                <Link
                  href="/contact"
                  className="group w-64 rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300
                    hover:scale-105 active:scale-[0.98]
                    bg-gray-100 border-gray-600 text-gray-700 shadow-lg
                    dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-purple-500/40"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg font-medium tracking-tight whitespace-nowrap">Get in Touch</span>
                    <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5">
                      <ArrowRight className="h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500" />
                    </span>
                  </span>
                </Link>
                {/* Secondary Button - Following theming guidelines with smooth scroll */}
                <button
                  onClick={() => {
                    document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group w-64 md:w-56 rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300
                    hover:scale-105 active:scale-[0.98]
                    bg-gray-100 border-gray-600 text-gray-700 shadow-lg
                    dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-green-500/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg font-medium tracking-tight whitespace-nowrap">Learn More</span>
                    <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5">
                      <ArrowRight className="h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500" />
                    </span>
                  </span>
                </button>
              </div>
            </BlurFade>
          </div>
        )}
      </div>

    </section>
  )
}
