'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  Cloud,
  Server,
  Lock,
  Globe,
  Database,
  Headphones,
  Monitor,
  Wrench,
  HardDrive,
  RefreshCw,
  Shield,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedBeam } from '@/components/ui/animated-beam'

// Icon mapping for center icon
const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Server,
  Lock,
  Globe,
  Database,
  Headphones,
  Monitor,
  Wrench,
  HardDrive,
  RefreshCw,
  Shield,
}

interface ServiceFeaturesProps {
  title?: string | null
  titleHighlight?: string | null
  items: string[]
  centerIcon?: string | null
}

/**
 * "What We Handle" section with animated beam visualization.
 */
export default function ServiceFeatures({
  title = 'What We Handle For You',
  titleHighlight = 'Handle',
  items,
  centerIcon = 'Cloud',
}: ServiceFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  if (!items || items.length === 0) return null

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

  // Get center icon component
  const CenterIcon = centerIcon ? (iconMap[centerIcon] ?? Cloud) : Cloud

  // Outer icons for the visual
  const outerIcons = [Server, Database, Lock, Globe]

  return (
    <section className='relative py-24 md:py-32 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block'>
              Our Services
            </span>
            <h2 className='text-3xl md:text-4xl font-extralight tracking-tight text-white mb-8'>
              {renderTitle()}
            </h2>

            <ul className='space-y-4'>
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-4 py-4 border-b border-white/10'
                >
                  <div className='w-6 h-6 rounded-full bg-xuba-green-500/10 flex items-center justify-center'>
                    <Check className='w-4 h-4 text-xuba-green-500' />
                  </div>
                  <span className='text-white/80 font-light'>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Visual with Animated Beams */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div
              ref={containerRef}
              className='aspect-square max-w-md mx-auto relative'
            >
              {/* Background glow */}
              <div className='absolute inset-0 bg-xuba-green-500/10 rounded-full blur-3xl' />

              {/* Center Icon */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  ref={centerRef}
                  className='w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900/50 z-10'
                >
                  <CenterIcon className='w-16 h-16 text-xuba-green-500' />
                </div>
              </div>

              {/* Outer Icons */}
              <div
                ref={topRef}
                className='absolute top-4 left-1/2 -translate-x-1/2'
              >
                <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                  {(() => {
                    const Icon = outerIcons[0]
                    return <Icon className='w-6 h-6 text-white/60' />
                  })()}
                </div>
              </div>
              <div
                ref={bottomRef}
                className='absolute bottom-4 left-1/2 -translate-x-1/2'
              >
                <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                  {(() => {
                    const Icon = outerIcons[1]
                    return <Icon className='w-6 h-6 text-white/60' />
                  })()}
                </div>
              </div>
              <div
                ref={leftRef}
                className='absolute left-4 top-1/2 -translate-y-1/2'
              >
                <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                  {(() => {
                    const Icon = outerIcons[2]
                    return <Icon className='w-6 h-6 text-white/60' />
                  })()}
                </div>
              </div>
              <div
                ref={rightRef}
                className='absolute right-4 top-1/2 -translate-y-1/2'
              >
                <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                  {(() => {
                    const Icon = outerIcons[3]
                    return <Icon className='w-6 h-6 text-white/60' />
                  })()}
                </div>
              </div>

              {/* Animated Beams */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={topRef}
                toRef={centerRef}
                curvature={-30}
                duration={4}
                delay={0}
                pathColor='rgba(255,255,255,0.1)'
                pathWidth={2}
                gradientStartColor='#c8e600'
                gradientStopColor='#a5c900'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={bottomRef}
                curvature={30}
                duration={4}
                delay={1}
                pathColor='rgba(255,255,255,0.1)'
                pathWidth={2}
                gradientStartColor='#c8e600'
                gradientStopColor='#a5c900'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={leftRef}
                toRef={centerRef}
                curvature={-30}
                duration={4}
                delay={2}
                pathColor='rgba(255,255,255,0.1)'
                pathWidth={2}
                gradientStartColor='#c8e600'
                gradientStopColor='#a5c900'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={rightRef}
                curvature={30}
                duration={4}
                delay={3}
                pathColor='rgba(255,255,255,0.1)'
                pathWidth={2}
                gradientStartColor='#c8e600'
                gradientStopColor='#a5c900'
              />

              {/* Orbit Ring */}
              <div className='absolute inset-8 rounded-full border border-dashed border-white/10' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
