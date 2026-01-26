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

interface ServiceBenefitsProps {
  title?: string | null
  titleHighlight?: string | null
  benefits: Benefit[]
}

/**
 * Benefits section using Bento Grid layout.
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
        <span className='text-xuba-green-500'>{titleHighlight}</span>
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
    <section className='relative py-24 md:py-32 px-6'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-xuba-purple-950/30 to-transparent pointer-events-none' />

      <div className='relative max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <span className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block'>
            Benefits
          </span>
          <h2 className='text-3xl md:text-5xl font-extralight tracking-tight text-white'>
            {renderTitle()}
          </h2>
        </motion.div>

        <BentoGrid className='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[14rem]'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit._key ?? index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BentoCard
                name={benefit.title}
                description={benefit.description ?? ''}
                Icon={getIcon(benefit.icon)}
                className='col-span-1 h-full'
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
