'use client'

import BlurText from '@/components/BlurText/BlurText'
import { cn } from '@/lib/utils'
import { IconArrowsUp, IconServer, IconTimeline } from '@tabler/icons-react'
import React, { useState, useId } from 'react'

export function StatsWithGridBackground() {
  const items = [
    {
      title: 'Years in the business',
      description: 'Years in the business where we helped companies grow.',
      icon: IconTimeline,
      value: '10+',
    },
    {
      title: 'People Served',
      description: 'Over 10k people have used our services.',
      icon: IconServer,
      value: '10k+',
    },
    {
      title: 'Response Time',
      description: 'We are always available to help you with your needs.',
      icon: IconArrowsUp,
      value: '100%',
    },
  ]
  return (
    <div className=' bg-xuba-purple-900 px-4 py-32 md:py-56'>
      <div className='flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 pb-12 sm:pb-16 md:pb-20'>
        <BlurText
          text='Comprehensive IT Solutions'
          delay={150}
          animateBy='words'
          direction='top'
          className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center text-xuba-green-500 tracking-tight px-4'
        />

        <p className='text-balance text-sm sm:text-base md:text-lg text-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center px-4 sm:px-6 md:px-8'>
          End-to-end IT solutions that keep your business running smoothly with
          reliable infrastructure and responsive support.
        </p>
      </div>
      <div className='mx-auto max-w-7xl border  rounded-xl'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'group/card relative overflow-hidden p-10',
                index !== items.length - 1 &&
                  'border-b border-neutral-200 dark:border-neutral-800 md:border-b-0 md:border-r'
              )}
            >
              <Grid size={20} />
              <EdgeElement />

              <div className='flex items-center gap-2'>
                <IconContainer>
                  <item.icon className='text-xuba-green-500' />
                </IconContainer>
                <p className='text-4xl font-light text-xuba-green-600 drop-shadow-lg drop-shadow-xuba-green-500/60'>
                  {item.value}
                </p>
              </div>
              <p className='text-balance mt-4 text-base text-white'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const EdgeElement = () => {
  return (
    <div className='absolute right-0 top-0 h-10 w-10 overflow-hidden border-b border-l bg-white shadow-[-3px_4px_9px_0px_rgba(0,0,0,0.14)] transition duration-200 group-hover/card:-translate-y-14 group-hover/card:translate-x-14 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[-3px_4px_9px_0px_rgba(255,255,255,0.2)]'>
      <div className='absolute left-0 top-0 h-px w-[141%] origin-top-left rotate-45 bg-neutral-100 dark:bg-neutral-800' />
    </div>
  )
}
const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-b from-neutral-200 to-white to-50% p-1 dark:from-neutral-800 dark:to-black'>
      <div className='flex h-full w-full items-center justify-center rounded-lg bg-linear-to-b from-[#5D5D5D] to-black dark:to-neutral-900'>
        {children}
      </div>
    </div>
  )
}

const generateRandomPattern = () => [
  [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
]

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][]
  size: number
}) => {
  const [randomPattern] = useState(generateRandomPattern)
  const p = pattern ?? randomPattern

  return (
    <div className='pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full mask-[linear-gradient(white,transparent)]'>
      <div className='absolute inset-0 bg-linear-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 mask-[radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30'>
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x='-12'
          y='4'
          squares={p}
          className='absolute inset-0 h-full w-full fill-xuba-green-500/10 stroke-xuba-green-500/10 mix-blend-overlay'
        />
      </div>
    </div>
  )
}

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width: number
  height: number
  x: number | string
  y: number | string
  squares: number[][]
} & React.SVGProps<SVGSVGElement>) {
  const patternId = useId()

  return (
    <svg aria-hidden='true' {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill='none' />
        </pattern>
      </defs>
      <rect
        width='100%'
        height='100%'
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth='0'
              key={`${index}-${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
