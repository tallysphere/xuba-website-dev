'use client'

import CountUp from 'react-countup'

interface Stat {
  label: string
  value: string
  postfix: string
}

interface CountUpStatsProps {
  stats: Stat[]
}

/**
 * Client component for animated counter stats.
 * Extracted to keep the parent page as a Server Component.
 */
export default function CountUpStats({ stats }: CountUpStatsProps) {
  return (
    <dl className='w-full max-w-sm mx-auto space-y-6 sm:space-y-8 lg:w-64 xl:w-80'>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className='flex flex-col-reverse gap-y-3 sm:gap-y-4 text-center lg:text-left'
        >
          <dt className='text-base leading-7 text-gray-400'>
            {stat.label}
          </dt>
          <dd className='text-4xl sm:text-5xl font-semibold tracking-tight text-xuba-green-500 drop-shadow-2xl drop-shadow-xuba-green-500/50'>
            <CountUp end={Number(stat.value)} />
            {stat.postfix}
          </dd>
        </div>
      ))}
    </dl>
  )
}
