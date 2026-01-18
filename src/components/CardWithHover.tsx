'use client'

// import Typewriter from '@/fancy/components/text/typewriter'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

import { useState } from 'react'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10',
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className='relative group  block p-2 h-full w-full'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 h-full w-full hover:border-xuba-green-500 block rounded-xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col'>
                <CardTitle className='text-2xl font-light tracking-tight '>
                  {item.title}
                </CardTitle>
                <CardDescription className='text-gray-300'>
                  {item.description}
                </CardDescription>
              </div>
              <div className='flex justify-end mt-10'>
                <Link
                  href={item.link}
                  target='_blank'
                  className='relative w-56 gap-2 flex items-center justify-end rounded-xl bg-gray-100 dark:bg-transparent text-end text-sm text-xuba-green-500 font-medium px-2 py-2'
                >
                  {/* <div className='absolute top-3 left-4 w-8 h-1 transition-all bg-xuba-green-500 dark:bg-xuba-purple-400' /> */}

                  {/* <Typewriter
                  text='Explore our Services'
                  className='text-gray-700 font-semibold text-lg text-nowrap tracking-tight'
                  cursorClassName='text-gray-700'
                  speed={70}
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={'_'}
                /> */}
                  {/* <span className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight'>
                  Explore our Services
                </span> */}
                  <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight'>
                    Learn More
                  </div>
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'rounded-xl h-full w-full p-4 overflow-hidden bg-xuba-purple-800/40 border-2 border-transparent group-hover:border-xuba-green-500/40 relative z-20',
        className
      )}
    >
      <div className='relative z-50 h-full'>
        <div className='p-4 flex flex-col h-full'>{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4', className)}>
      {children}
    </h4>
  )
}
export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p
      className={cn(
        'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className
      )}
    >
      {children}
    </p>
  )
}
