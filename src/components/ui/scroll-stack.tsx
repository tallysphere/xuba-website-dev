'use client'

import React from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
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
      itemClassName
    )}
  >
    {children}
  </div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  stickyTop?: number
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stickyTop = 120,
}) => {
  const childArray = React.Children.toArray(children)
  const totalCards = childArray.length

  return (
    <div className={cn('relative', className)}>
      {childArray.map((child, index) => {
        // Later cards have HIGHER z-index so they stack ON TOP
        const zIndex = index + 1
        // Each card sticks at a slightly offset position to show the stack
        const topOffset = stickyTop + index * 10

        return (
          <div
            key={index}
            className="sticky"
            style={{
              top: `${topOffset}px`,
              zIndex,
              // Large margin creates scroll distance for sticky to work
              marginBottom: index < totalCards - 1 ? '70vh' : '0',
            }}
          >
            {child}
          </div>
        )
      })}
      {/* Spacer to allow last card to scroll fully into sticky position */}
      <div style={{ height: '60vh' }} />
    </div>
  )
}

export default ScrollStack
