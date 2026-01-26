'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'
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
 * Creative background components for Bento cards (no images)
 */

// Animated gradient orbs
const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-10 -right-10 w-40 h-40 bg-xuba-green-500/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-10 -left-10 w-32 h-32 bg-xuba-purple-500/20 rounded-full blur-3xl"
    />
  </div>
)

// Animated grid pattern
const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-xuba-green-500" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <motion.div
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-0 bg-linear-to-br from-xuba-green-500/10 to-transparent"
    />
  </div>
)

// Pulsing rings
const PulsingRings = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 2.5],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.8,
          ease: 'easeOut',
        }}
        className="absolute w-20 h-20 border border-xuba-green-500/30 rounded-full"
      />
    ))}
    <div className="w-4 h-4 bg-xuba-green-500/40 rounded-full" />
  </div>
)

// Pre-computed dot positions and animations for consistency
const dotConfigs = [
  { left: '15%', top: '25%', duration: 2.5, delay: 0.2 },
  { left: '35%', top: '45%', duration: 3.2, delay: 0.8 },
  { left: '55%', top: '30%', duration: 2.8, delay: 1.4 },
  { left: '75%', top: '55%', duration: 3.5, delay: 0.5 },
  { left: '25%', top: '65%', duration: 2.2, delay: 1.0 },
  { left: '45%', top: '35%', duration: 3.0, delay: 1.8 },
  { left: '65%', top: '50%', duration: 2.6, delay: 0.3 },
  { left: '85%', top: '40%', duration: 3.3, delay: 1.2 },
  { left: '20%', top: '75%', duration: 2.4, delay: 0.7 },
  { left: '50%', top: '60%', duration: 3.1, delay: 1.6 },
  { left: '70%', top: '28%', duration: 2.9, delay: 0.4 },
  { left: '40%', top: '70%', duration: 3.4, delay: 1.1 },
]

// Floating dots
const FloatingDots = () => (
  <div className="absolute inset-0 overflow-hidden">
    {dotConfigs.map((config, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          delay: config.delay,
        }}
        className="absolute w-1.5 h-1.5 bg-xuba-green-500/40 rounded-full"
        style={{
          left: config.left,
          top: config.top,
        }}
      />
    ))}
  </div>
)

// Diagonal lines
const DiagonalLines = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <svg className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="diagonals" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" className="text-xuba-green-400" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonals)" />
    </svg>
  </div>
)

// Number stat display
const StatDisplay = ({ number }: { number: string }) => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 0.08, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-[120px] font-bold text-xuba-green-500 select-none"
    >
      {number}
    </motion.span>
  </div>
)

// Background selector based on index
const backgrounds: ReactNode[] = [
  <GradientOrbs key="orbs" />,
  <GridPattern key="grid" />,
  <PulsingRings key="rings" />,
  <FloatingDots key="dots" />,
  <DiagonalLines key="lines" />,
  <StatDisplay key="stat" number="∞" />,
]

/**
 * Benefits section using BentoGrid with creative animated backgrounds.
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
                  background={backgrounds[index % backgrounds.length]}
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
