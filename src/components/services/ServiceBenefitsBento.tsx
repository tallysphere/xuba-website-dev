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
import { cn } from '@/lib/utils'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'

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

interface ServiceBenefitsBentoProps {
  title?: string | null
  titleHighlight?: string | null
  benefits: Benefit[]
}

/**
 * Benefits section using BentoGrid with large icon backgrounds.
 * Icons are scaled up with low opacity and glow on hover.
 * Title and description are positioned at the bottom of each card.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function ServiceBenefitsBento({
  title = 'Benefits',
  titleHighlight,
  benefits,
}: ServiceBenefitsBentoProps) {
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

  // Determine grid layout class based on benefit count
  const getGridClass = (index: number, total: number) => {
    // First row: 2 items spanning different widths
    if (total >= 4) {
      if (index === 0) return 'col-span-3 lg:col-span-2'
      if (index === 1) return 'col-span-3 lg:col-span-1'
      if (index === 2) return 'col-span-3 lg:col-span-1'
      if (index === 3) return 'col-span-3 lg:col-span-2'
    }
    // For fewer items, equal distribution
    if (total === 3) return 'col-span-3 lg:col-span-1'
    if (total === 2) return 'col-span-3 lg:col-span-1'
    return 'col-span-3'
  }

  return (
    <section className="relative py-24 md:py-32 px-6 bg-white dark:bg-xuba-purple-950">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-xuba-green-50/30 dark:via-xuba-purple-950/30 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Benefits
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-xuba-green-900 dark:text-white">
            {renderTitle()}
          </h2>
        </motion.div>

        <BentoGrid className="auto-rows-[16rem] md:auto-rows-[18rem]">
          {benefits.slice(0, 6).map((benefit, index) => {
            const Icon = getIcon(benefit.icon)
            return (
              <motion.div
                key={benefit._key ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={getGridClass(index, Math.min(benefits.length, 6))}
              >
                <BentoCard
                  Icon={Icon}
                  name={benefit.title}
                  description={benefit.description || ''}
                  className={cn(
                    'h-full',
                    'border-xuba-green-200 dark:border-white/5',
                    'bg-xuba-green-50/30 dark:bg-white/2',
                    'hover:border-xuba-green-400 dark:hover:border-xuba-green-500/30',
                    'hover:bg-xuba-green-50/50 dark:hover:bg-white/4'
                  )}
                />
              </motion.div>
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
