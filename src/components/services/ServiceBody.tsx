'use client'

import { PortableText, PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'motion/react'
import type { BlockContent } from '@/sanity/types'

interface ServiceBodyProps {
  content: BlockContent
}

/**
 * Custom Portable Text components styled for light/dark mode following Xuba theming guidelines.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg md:text-xl text-xuba-green-900 dark:text-white/70 font-light leading-relaxed mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-xuba-green-900 dark:text-white mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-light text-xuba-green-900 dark:text-white mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-light text-xuba-green-800 dark:text-white mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-xuba-green-500 pl-6 my-8 text-xuba-green-600 dark:text-white/60 italic text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 my-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-4 my-6 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-xuba-green-900 dark:text-white/70">
        <span className="text-xuba-green-500 mt-1.5 shrink-0">•</span>
        <span className="font-light">{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-xuba-green-900 dark:text-white/70 font-light">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-xuba-green-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-xuba-green-800 dark:text-white/80">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline decoration-xuba-green-500/50">{children}</span>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.blank || !value?.href?.startsWith('/')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-xuba-green-600 dark:text-xuba-green-400 hover:text-xuba-green-700 dark:hover:text-xuba-green-300 underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative overflow-hidden">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ''}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-xuba-green-600 dark:text-white/40 mt-3 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

/**
 * Rich text body content section using Sanity Portable Text.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function ServiceBody({ content }: ServiceBodyProps) {
  if (!content || content.length === 0) return null

  return (
    <section className="relative py-16 md:py-24 px-6 bg-white dark:bg-xuba-purple-950">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-xuba-green-50/30 dark:via-xuba-purple-950/20 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto"
      >
        <PortableText value={content} components={components} />
      </motion.div>
    </section>
  )
}
