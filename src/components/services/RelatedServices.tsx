'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface FeaturedImage {
  asset?: { _ref: string; _type: string } | null
  alt?: string | null
  hotspot?: { x: number; y: number; height: number; width: number } | null
  crop?: { top: number; bottom: number; left: number; right: number } | null
}

interface RelatedService {
  _id: string
  title: string
  slug: string
  shortDescription?: string | null
  tagline?: string | null
  featuredImage?: FeaturedImage | null
}

interface RelatedServicesProps {
  services: RelatedService[]
}

/**
 * Related services section with card grid and optional thumbnail images.
 * Inspired by Qualitas "Our services" section design.
 */
export default function RelatedServices({ services }: RelatedServicesProps) {
  if (!services || services.length === 0) return null

  return (
    <section className="relative py-24 md:py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xuba-green-500 text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-white">
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
              <Link
                href={`/services/${service.slug}`}
                className="group block border border-white/5 hover:border-xuba-green-500/30 bg-white/2 hover:bg-white/4 transition-all duration-300 overflow-hidden"
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
                    <div className="absolute inset-0 bg-linear-to-t from-xuba-purple-900 to-transparent opacity-60" />
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-light text-white group-hover:text-xuba-green-400 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/40 mb-4 line-clamp-2">
                    {service.tagline || service.shortDescription}
                  </p>
                  <span className="text-sm text-xuba-green-500 flex items-center gap-2">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
