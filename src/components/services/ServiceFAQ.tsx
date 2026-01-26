'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  _key?: string
  question: string
  answer: string
}

interface ServiceFAQProps {
  title?: string | null
  titleHighlight?: string | null
  faqs: FAQ[]
}

/**
 * FAQ accordion component for service pages.
 * Features animated expand/collapse with plus/minus icons.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function ServiceFAQ({
  title = 'Frequently Asked Questions',
  titleHighlight,
  faqs,
}: ServiceFAQProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  if (!faqs || faqs.length === 0) return null

  // Render title with highlight
  const renderTitle = () => {
    if (!title) return null
    if (!titleHighlight) return title

    const parts = title.split(titleHighlight)
    if (parts.length === 1) return title

    return (
      <>
        {parts[0]}
        <span className="text-xuba-green-500">{titleHighlight}</span>
        {parts[1]}
      </>
    )
  }

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question)
  }

  return (
    <section className="relative py-24 md:py-32 px-6 bg-white dark:bg-xuba-purple-950">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-xuba-green-50/20 dark:via-xuba-purple-900/20 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-xuba-green-900 dark:text-white leading-tight">
              {renderTitle()}
            </h2>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="divide-y divide-xuba-green-200 dark:divide-white/10"
          >
            {faqs.map((faq, index) => {
              const isOpen = openQuestion === faq.question
              return (
                <FAQItem
                  key={faq._key ?? index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={isOpen}
                  onToggle={() => toggleQuestion(faq.question)}
                  index={index}
                />
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="py-5 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        {/* Icon container */}
        <div className="relative mt-1 h-6 w-6 shrink-0">
          <Plus
            className={cn(
              'absolute inset-0 h-6 w-6 text-xuba-green-500 transition-all duration-200',
              isOpen && 'rotate-90 scale-0'
            )}
          />
          <Minus
            className={cn(
              'absolute inset-0 h-6 w-6 text-xuba-green-500 rotate-90 scale-0 transition-all duration-200',
              isOpen && 'rotate-0 scale-100'
            )}
          />
        </div>

        {/* Question and Answer */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-xuba-green-900 dark:text-white/90 group-hover:text-xuba-green-700 dark:group-hover:text-white transition-colors">
            {question}
          </h3>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-xuba-green-700 dark:text-white/60 font-light leading-relaxed">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
