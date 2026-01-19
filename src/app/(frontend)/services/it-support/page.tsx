'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import {
  Zap,
  Monitor,
  Shield,
  MessageCircle,
  Check,
  ArrowRight,
  Headphones,
  Wrench,
  HardDrive,
  RefreshCw,
} from 'lucide-react'
import WhyXuba from '../../../../../sections/Home/WhyXuba'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'

const benefits = [
  {
    icon: Zap,
    title: 'Fast response times',
    description: 'Most issues resolved within minutes, not hours',
  },
  {
    icon: Monitor,
    title: 'Remote & on-site',
    description: "We'll fix it remotely or come to you if needed",
  },
  {
    icon: Shield,
    title: 'Proactive monitoring',
    description: 'We catch problems before they catch you',
  },
  {
    icon: MessageCircle,
    title: 'Plain English',
    description: 'No gobblygook—just clear explanations',
  },
]

const services = [
  'Hardware troubleshooting & management',
  'Remote data backup & restore',
  'Patch implementation & updates',
  'Virus & spyware removal',
  'Software installation & support',
]

const relatedServices = [
  {
    title: 'Cloud Technology',
    tagline: 'Simple. Flexible. Secure.',
    href: '/services/cloud-technology',
  },
  {
    title: 'Server Support & Security',
    tagline: 'Protected. Monitored. Always running.',
    href: '/services/server-support',
  },
  {
    title: 'Incident Support',
    tagline: 'When things go wrong, we go right.',
    href: '/services/incident-support',
  },
]

export default function ITSupportPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const topLeftRef = useRef<HTMLDivElement>(null)
  const topRightRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)

  return (
    <main className='bg-xuba-purple-900 min-h-screen'>
      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-20 -left-20 w-80 h-80 bg-xuba-green-500/10 rounded-full blur-3xl' />
          <div className='absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-xuba-purple-500/20 rounded-full blur-3xl' />
          <div className='absolute top-1/2 right-1/4 w-64 h-64 bg-xuba-green-500/5 rounded-full blur-3xl' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-6 block'>
              IT Support
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className='text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6'
          >
            Help When You Need It.{' '}
            <span className='text-xuba-green-500 block md:inline'>
              Problems Solved Fast.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className='text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-10'
          >
            Remote desktop support that keeps your team productive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4'
          >
            <Link
              href='/contact'
              className='group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:text-xuba-purple-900 transition-all duration-300'
            >
              Get in Touch
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Link>
            <a
              href='#learn-more'
              className='flex items-center gap-2 px-8 py-4 text-white/60 hover:text-white transition-colors'
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className='absolute bottom-10 left-1/2 -translate-x-1/2'
        >
          <div className='w-6 h-10 border-2 border-white/20 rounded-full flex justify-center'>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className='w-1 h-2 bg-xuba-green-500 rounded-full mt-2'
            />
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section id='learn-more' className='relative py-24 md:py-32 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className='block w-16 h-[2px] bg-xuba-green-500 mx-auto mb-10' />
            <p className='text-xl md:text-2xl lg:text-3xl text-white/80 font-extralight leading-relaxed'>
              Tech problems don&apos;t wait for convenient times. That&apos;s
              why we&apos;re here—ready to{' '}
              <span className='text-xuba-green-400'>jump in</span>,{' '}
              <span className='text-xuba-green-400'>fix the issue</span>, and{' '}
              <span className='text-xuba-green-400'>get you back to work</span>.
              No jargon, no runaround, just real solutions from real people.
            </p>
            <span className='block w-16 h-[2px] bg-xuba-green-500 mx-auto mt-10' />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Bento Grid */}
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
              Why Choose Us
            </span>
            <h2 className='text-3xl md:text-5xl font-extralight tracking-tight text-white'>
              Support That{' '}
              <span className='text-xuba-green-500'>Actually Works</span>
            </h2>
          </motion.div>

          <BentoGrid className='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[14rem]'>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BentoCard
                  name={benefit.title}
                  description={benefit.description}
                  Icon={benefit.icon}
                  className='col-span-1 h-full'
                />
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* What We Handle Section with Animated Beam */}
      <section className='relative py-24 md:py-32 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
            {/* Left - Visual with Animated Beams */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='relative order-2 lg:order-1'
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
                    <Headphones className='w-16 h-16 text-xuba-green-500' />
                  </div>
                </div>

                {/* Corner Icons */}
                <div ref={topLeftRef} className='absolute top-8 left-8'>
                  <div className='w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center bg-xuba-purple-900/80 z-10'>
                    <Monitor className='w-6 h-6 text-white/60' />
                  </div>
                </div>

                <div ref={topRightRef} className='absolute top-8 right-8'>
                  <div className='w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center bg-xuba-purple-900/80 z-10'>
                    <Wrench className='w-6 h-6 text-white/60' />
                  </div>
                </div>

                <div ref={bottomLeftRef} className='absolute bottom-8 left-8'>
                  <div className='w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center bg-xuba-purple-900/80 z-10'>
                    <HardDrive className='w-6 h-6 text-white/60' />
                  </div>
                </div>

                <div ref={bottomRightRef} className='absolute bottom-8 right-8'>
                  <div className='w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center bg-xuba-purple-900/80 z-10'>
                    <RefreshCw className='w-6 h-6 text-white/60' />
                  </div>
                </div>

                {/* Animated Beams */}
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={topLeftRef}
                  toRef={centerRef}
                  curvature={-40}
                  duration={5}
                  delay={0}
                  pathColor='rgba(255,255,255,0.1)'
                  pathWidth={2}
                  gradientStartColor='#c8e600'
                  gradientStopColor='#a5c900'
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={topRightRef}
                  toRef={centerRef}
                  curvature={40}
                  duration={5}
                  delay={1.25}
                  pathColor='rgba(255,255,255,0.1)'
                  pathWidth={2}
                  gradientStartColor='#c8e600'
                  gradientStopColor='#a5c900'
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={bottomLeftRef}
                  toRef={centerRef}
                  curvature={40}
                  duration={5}
                  delay={2.5}
                  pathColor='rgba(255,255,255,0.1)'
                  pathWidth={2}
                  gradientStartColor='#c8e600'
                  gradientStopColor='#a5c900'
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={bottomRightRef}
                  toRef={centerRef}
                  curvature={-40}
                  duration={5}
                  delay={3.75}
                  pathColor='rgba(255,255,255,0.1)'
                  pathWidth={2}
                  gradientStartColor='#c8e600'
                  gradientStopColor='#a5c900'
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='order-1 lg:order-2'
            >
              <span className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-4 block'>
                Our Services
              </span>
              <h2 className='text-3xl md:text-4xl font-extralight tracking-tight text-white mb-8'>
                What We <span className='text-xuba-green-500'>Handle</span> For
                You
              </h2>

              <ul className='space-y-4'>
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='flex items-center gap-4 py-4 border-b border-white/10'
                  >
                    <div className='w-6 h-6 rounded-full bg-xuba-green-500/10 flex items-center justify-center'>
                      <Check className='w-4 h-4 text-xuba-green-500' />
                    </div>
                    <span className='text-white/80 font-light'>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Xuba Section */}
      <WhyXuba />

      {/* CTA Section */}
      <section className='relative py-24 md:py-32 px-6 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-xuba-purple-950 via-xuba-purple-900 to-xuba-purple-950' />
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-xuba-green-500/5 rounded-full blur-3xl' />
        </div>

        <div className='relative max-w-3xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl md:text-5xl font-extralight tracking-tight text-white mb-6'>
              IT Headaches{' '}
              <span className='text-xuba-green-500'>Slowing You Down</span>?
            </h2>
            <p className='text-lg md:text-xl text-white/60 font-light mb-10 max-w-xl mx-auto'>
              Get in touch and let us take the tech stress off your plate.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 px-10 py-5 bg-xuba-green-500 text-xuba-purple-900 font-semibold hover:bg-xuba-green-400 transition-colors duration-300'
            >
              Let&apos;s Talk
              <ArrowRight className='w-5 h-5' />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className='relative py-24 md:py-32 px-6 border-t border-white/5'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-2xl md:text-3xl font-extralight tracking-tight text-white'>
              You Might Also Need...
            </h2>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {relatedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={service.href}
                  className='group block p-8 border border-white/5 hover:border-xuba-green-500/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300'
                >
                  <h3 className='text-xl font-light text-white group-hover:text-xuba-green-400 transition-colors mb-2'>
                    {service.title}
                  </h3>
                  <p className='text-sm text-white/40 mb-4'>
                    {service.tagline}
                  </p>
                  <span className='text-sm text-xuba-green-500 flex items-center gap-2'>
                    Learn more
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
