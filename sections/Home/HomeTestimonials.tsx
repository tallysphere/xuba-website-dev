'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import Marquee from 'react-fast-marquee'
import BlurText from '@/components/BlurText/BlurText'

export function TestimonialsMarqueeGrid() {
  return (
    <div className='relative w-full px-4 py-32 md:py-56 overflow-hidden h-full bg-xuba-purple-900'>
      <div className='flex flex-col items-center justify-center gap-8 pb-12 sm:pb-16 md:pb-20'>
        <BlurText
          text='Trusted by Businesses'
          delay={150}
          animateBy='words'
          direction='top'
          className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-xuba-green-500 drop-shadow-lg drop-shadow-xuba-green-500/30 tracking-tight px-4'
        />
        <p className='text-balance text-sm sm:text-base md:text-lg text-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center px-4 sm:px-6 md:px-8'>
          Here&apos;s what some of our users have to say about us
        </p>
      </div>

      <div className=' relative'>
        <div className='h-full overflow-hidden w-full bg-charcoal'>
          <TestimonialsGrid />
        </div>
      </div>

      <div className='absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-charcoal to-transparent'></div>
    </div>
  )
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 6)
  const second = testimonials.slice(6, 12)

  return (
    <div className='relative [mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]'>
      <Marquee direction='right' pauseOnHover speed={50}>
        {first.map((testimonial, index) => (
          <Card key={`testimonial-${testimonial.name}-${index}`}>
            <Quote>{testimonial.quote}</Quote>
            <div className='flex gap-2 items-center mt-8'>
              <div className='flex flex-col'>
                <QuoteDescription className='text-xuba-green-500'>
                  {testimonial.name}
                </QuoteDescription>
                <QuoteDescription className='text-neutral-300'>
                  {testimonial.designation}
                </QuoteDescription>
              </div>
            </div>
          </Card>
        ))}
      </Marquee>
      <Marquee className='mt-10' direction='right' pauseOnHover speed={70}>
        {second.map((testimonial, index) => (
          <Card key={`testimonial-${testimonial.name}-${index}`}>
            <Quote>{testimonial.quote}</Quote>
            <div className='flex gap-2 items-center mt-8'>
              <div className='flex flex-col'>
                <QuoteDescription className='text-xuba-green-500'>
                  {testimonial.name}
                </QuoteDescription>
                <QuoteDescription className='text-neutral-300'>
                  {testimonial.designation}
                </QuoteDescription>
              </div>
            </div>
          </Card>
        ))}
      </Marquee>
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
        'p-4 md:p-8 rounded-xl min-h-[230px] h-full max-w-md md:max-w-lg mx-4 bg-gray-50  dark:bg-xuba-purple-950 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group',
        className
      )}
    >
      {children}
    </div>
  )
}

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h3
      className={cn(
        'text-sm md:text-base font-semibold dark:text-white text-black py-2',
        className
      )}
    >
      {children}
    </h3>
  )
}

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p className={cn('text-xs md:text-sm font-normal max-w-sm', className)}>
      {children}
    </p>
  )
}

interface Testimonial {
  quote: string
  name: string
  designation?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    quote:
      'Their cloud migration service was seamless. We moved our entire infrastructure to AWS with zero downtime and significant cost savings.',
    designation: 'CTO, TechFlow Solutions',
  },
  {
    name: 'Michael Chen',
    quote:
      'The IT support team is incredibly responsive. They resolved our server issues within minutes and prevented what could have been hours of downtime.',
    designation: 'Operations Manager, DataCore Inc',
  },
  {
    name: 'Jennifer Rodriguez',
    quote:
      'Their server security implementation gave us peace of mind. The firewall and VPN setup has protected us from multiple cyber threats.',
    designation: 'IT Director, SecureNet Corp',
  },
  {
    name: 'David Thompson',
    quote:
      'System deployment was handled professionally from start to finish. Every machine was configured perfectly and our team was up and running immediately.',
    designation: 'CEO, StartupHub',
  },
  {
    name: 'Lisa Wang',
    quote:
      'When our systems crashed at 2 AM, their incident support team had us back online in under 30 minutes. Truly lifesavers for our business.',
    designation: 'COO, NightShift Logistics',
  },
  {
    name: 'Robert Johnson',
    quote:
      'As a small business, we needed expert IT guidance without the overhead. Their SMB IT consulting has been invaluable for our growth.',
    designation: 'Founder, Local Retail Co',
  },
  {
    name: 'Amanda Foster',
    quote:
      'The cloud backup solution they implemented saved us when ransomware hit. We recovered everything within hours instead of losing weeks of work.',
    designation: 'Finance Director, AccountPro',
  },
  {
    name: 'James Wilson',
    quote:
      'Their remote desktop support is fantastic. Issues get resolved before I even notice them, and productivity has never been higher.',
    designation: 'Project Manager, BuildRight',
  },
  {
    name: 'Maria Gonzalez',
    quote:
      'The spam filtering and virus protection they set up has eliminated 99% of security threats. Our inbox is finally clean and safe.',
    designation: 'Office Manager, LegalEase',
  },
  {
    name: 'Kevin Park',
    quote:
      'Their server monitoring caught a potential failure before it happened. The proactive approach saved us thousands in lost revenue.',
    designation: 'VP Technology, StreamCast',
  },
  {
    name: 'Rachel Adams',
    quote:
      'Cloud storage and disaster recovery planning gave us confidence during the hurricane. While others lost data, we kept working seamlessly.',
    designation: 'Operations Director, CoastalCorp',
  },
  {
    name: 'Thomas Lee',
    quote:
      'The hardware management service keeps all our equipment running smoothly. No more surprise failures or emergency purchases.',
    designation: 'IT Manager, ManufacturePlus',
  },
  {
    name: 'Nicole Davis',
    quote:
      "Their patch management ensures we're always secure and up-to-date. I sleep better knowing our systems are protected.",
    designation: 'Security Analyst, FinanceFirst',
  },
  {
    name: 'Christopher Moore',
    quote:
      'The system configuration for our new office was flawless. 50 workstations deployed and configured in a single weekend.',
    designation: 'Facilities Manager, GrowthCorp',
  },
]
