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
import { MagicCard } from '@/components/ui/magic-card'

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

interface ServiceBenefitsProps {
  title?: string | null
  titleHighlight?: string | null
  benefits: Benefit[]
}

/**
 * Benefits section with clean MagicCard grid for subtle spotlight hover effect.
 * Supports light and dark modes following Xuba theming guidelines.
 */
export default function ServiceBenefits({
  title = 'Benefits',
  titleHighlight,
  benefits,
}: ServiceBenefitsProps) {
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
        <span className='text-xuba-green-600 dark:text-xuba-green-500'>{titleHighlight}</span>
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
    <section className='relative py-24 md:py-32 px-6 bg-white dark:bg-xuba-purple-950'>
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-xuba-green-50/30 dark:via-xuba-purple-950/30 to-transparent pointer-events-none' />

      <div className='relative max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <span className='text-xuba-green-600 dark:text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block'>
            Benefits
          </span>
          <h2 className='text-3xl md:text-5xl font-extralight tracking-tight text-xuba-green-900 dark:text-white'>
            {renderTitle()}
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {benefits.map((benefit, index) => {
            const Icon = getIcon(benefit.icon)
            return (
              <motion.div
                key={benefit._key ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MagicCard
                  className='h-full border border-xuba-green-200 dark:border-white/10 bg-xuba-green-50/50 dark:bg-xuba-purple-900/50'
                  gradientFrom='#c8e600'
                  gradientTo='#a5c900'
                  gradientOpacity={0.1}
                  gradientSize={150}
                  gradientColor='rgba(200, 230, 0, 0.15)'
                >
                  <div className='p-6 h-full flex flex-col'>
                    <div className='w-10 h-10 rounded-full bg-xuba-green-500/10 flex items-center justify-center mb-4'>
                      <Icon className='w-5 h-5 text-xuba-green-600 dark:text-xuba-green-500' />
                    </div>
                    <h3 className='text-lg font-light text-xuba-green-900 dark:text-white mb-2'>
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className='text-sm text-xuba-green-600 dark:text-white/60 font-light leading-relaxed'>
                        {benefit.description}
                      </p>
                    )}
                  </div>
                </MagicCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
