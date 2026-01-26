'use client'

import { motion } from 'motion/react'
import {
  ShieldCheck,
  TrendingUp,
  Database,
  Globe,
  Zap,
  Monitor,
  Shield,
  MessageCircle,
  Cloud,
  Server,
  Lock,
  Headphones,
  CheckCircle,
  Settings,
  Users,
  Clock,
  type LucideIcon,
} from 'lucide-react'
import ScrollStack, { ScrollStackItem } from '../ui/scroll-stack'

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  TrendingUp,
  Database,
  Globe,
  Zap,
  Monitor,
  Shield,
  MessageCircle,
  Cloud,
  Server,
  Lock,
  Headphones,
  CheckCircle,
  Settings,
  Users,
  Clock,
}

interface Benefit {
  _key?: string
  title: string
  description?: string | null
  icon?: string | null
}

interface ServiceBenefitsStackProps {
  title?: string | null
  titleHighlight?: string | null
  benefits: Benefit[]
}

/**
 * Benefits section using ScrollStack for an immersive stacking card effect.
 * Cards stack on top of each other as you scroll with depth and scaling.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function ServiceBenefitsStack({
  title = 'Benefits',
  titleHighlight,
  benefits,
}: ServiceBenefitsStackProps) {
  if (!benefits || benefits.length === 0) return null

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

  // Get icon component from name
  const getIcon = (iconName?: string | null): LucideIcon => {
    if (!iconName) return CheckCircle
    return iconMap[iconName] ?? CheckCircle
  }

  return (
    <section className="relative bg-white dark:bg-xuba-purple-950 py-24 md:py-32">
      {/* Section Header */}
      <div className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Benefits
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-xuba-green-900 dark:text-white">
            {renderTitle()}
          </h2>
        </motion.div>
      </div>

      {/* ScrollStack Cards */}
      <div className="max-w-3xl mx-auto px-6">
        <ScrollStack stickyTop={120}>
          {benefits.slice(0, 6).map((benefit, index) => {
            const Icon = getIcon(benefit.icon)
            return (
              <ScrollStackItem
                key={benefit._key ?? index}
                itemClassName="flex flex-col justify-center"
              >
                {/* Card Number */}
                <span className="absolute top-6 right-6 text-6xl md:text-7xl font-extralight text-xuba-green-200/50 dark:text-white/5 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-xuba-green-100 dark:bg-xuba-green-500/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-xuba-green-600 dark:text-xuba-green-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-xuba-green-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                {benefit.description && (
                  <p className="text-lg text-xuba-green-700 dark:text-white/60 font-light leading-relaxed max-w-xl">
                    {benefit.description}
                  </p>
                )}
              </ScrollStackItem>
            )
          })}
        </ScrollStack>
      </div>
    </section>
  )
}
