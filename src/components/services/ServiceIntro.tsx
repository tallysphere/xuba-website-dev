'use client'

import { motion } from 'motion/react'

interface ServiceIntroProps {
  text?: string | null
  highlights?: string[] | null
}

/**
 * Introduction section with highlighted keywords.
 */
export default function ServiceIntro({ text, highlights }: ServiceIntroProps) {
  if (!text) return null

  // Render text with highlighted words
  const renderText = () => {
    if (!highlights || highlights.length === 0) return text

    let result = text
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0

    // Find and highlight each word
    highlights.forEach((word, i) => {
      const index = result.toLowerCase().indexOf(word.toLowerCase(), lastIndex)
      if (index !== -1) {
        // Add text before the highlight
        if (index > lastIndex) {
          parts.push(result.substring(lastIndex, index))
        }
        // Add the highlighted word
        parts.push(
          <span key={i} className='text-xuba-green-400'>
            {result.substring(index, index + word.length)}
          </span>
        )
        lastIndex = index + word.length
      }
    })

    // Add remaining text
    if (lastIndex < result.length) {
      parts.push(result.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <section id='learn-more' className='relative py-24 md:py-32 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className='block w-16 h-[2px] bg-xuba-green-500 mx-auto mb-10' />
          <p className='text-xl md:text-2xl lg:text-3xl text-white/80 font-extralight leading-relaxed'>
            {renderText()}
          </p>
          <span className='block w-16 h-[2px] bg-xuba-green-500 mx-auto mt-10' />
        </motion.div>
      </div>
    </section>
  )
}
