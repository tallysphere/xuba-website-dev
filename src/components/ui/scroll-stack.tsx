'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
  index?: number
  totalItems?: number
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div
    className={cn(
      'scroll-stack-card relative w-full min-h-[280px] md:min-h-[320px] p-8 md:p-10 rounded-xl',
      'shadow-[0_0_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_30px_rgba(0,0,0,0.3)]',
      'box-border origin-top',
      'border border-xuba-green-200 dark:border-white/10',
      'bg-white dark:bg-xuba-purple-900',
      'transition-all duration-300 ease-out',
      itemClassName
    )}
  >
    {children}
  </div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  stackOffset?: number
  scaleStep?: number
  baseScale?: number
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stackOffset = 20,
  scaleStep = 0.03,
  baseScale = 0.92,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const viewportHeight = window.innerHeight
      const triggerPoint = viewportHeight * 0.35 // Cards stack when they reach 35% from top

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      
      let newActiveIndex = 0
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect()
        const cardTop = cardRect.top

        // Card becomes "active" (pinned) when its top reaches the trigger point
        if (cardTop <= triggerPoint) {
          newActiveIndex = index
        }
      })

      setActiveIndex(newActiveIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Convert children to array for mapping
  const childArray = React.Children.toArray(children)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {childArray.map((child, index) => {
        const isStacked = index < activeIndex
        const stackPosition = isStacked ? activeIndex - index : 0
        const scale = isStacked ? baseScale - (stackPosition - 1) * scaleStep : 1
        const zIndex = childArray.length - index
        const blur = isStacked ? Math.min(stackPosition * 1.5, 4) : 0
        const opacity = isStacked ? Math.max(1 - stackPosition * 0.15, 0.4) : 1

        return (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className="sticky"
            style={{
              top: `${150 + index * stackOffset}px`,
              zIndex,
              transform: `scale(${scale})`,
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
              opacity,
              marginBottom: index < childArray.length - 1 ? '60px' : '0',
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}

export default ScrollStack
