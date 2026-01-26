'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { MagicCard } from '@/components/ui/magic-card'
import type { SanityImageHotspot, SanityImageCrop } from '@/sanity/types'

interface FeaturedImage {
  asset: {
    _ref: string
    _type: 'reference'
  } | null
  alt: string | null
  hotspot: SanityImageHotspot | null
  crop: SanityImageCrop | null
}

interface RelatedService {
  _id: string
  title: string
  slug: string
  shortDescription: string
  tagline: string
  icon: string | null
  featuredImage: FeaturedImage | null
}

interface RelatedServicesProps {
  services: RelatedService[]
}

/**
 * Related services section with card grid, MagicCard spotlight hover, and optional thumbnail images.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function RelatedServices({ services }: RelatedServicesProps) {
  if (!services || services.length === 0) return null

  return (
    <section className="relative py-24 md:py-32 px-6 border-t border-xuba-green-200 dark:border-white/5 bg-white dark:bg-xuba-purple-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xuba-green-600 dark:text-xuba-green-500 text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-xuba-green-900 dark:text-white">
            You Might Also Need...
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/services/${service.slug}`} className="block group">
                <MagicCard
                  className="h-full overflow-hidden border border-xuba-green-200 dark:border-white/5 bg-xuba-green-50/50 dark:bg-xuba-purple-900/50"
                  gradientFrom="#c8e600"
                  gradientTo="#a5c900"
                  gradientOpacity={0.08}
                  gradientSize={200}
                  gradientColor="rgba(200, 230, 0, 0.1)"
                >
                  {/* Thumbnail Image */}
                  {service.featuredImage?.asset && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(service.featuredImage).width(600).height(400).url()}
                        alt={service.featuredImage.alt || service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-white dark:from-xuba-purple-900 to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-light text-xuba-green-900 dark:text-white group-hover:text-xuba-green-600 dark:group-hover:text-xuba-green-400 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-xuba-green-600 dark:text-white/40 mb-4 line-clamp-2">
                      {service.tagline || service.shortDescription}
                    </p>
                    <span className="text-sm text-xuba-green-600 dark:text-xuba-green-500 flex items-center gap-2">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </MagicCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
