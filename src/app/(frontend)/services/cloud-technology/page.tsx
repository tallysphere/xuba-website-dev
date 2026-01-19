'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import {
  ShieldCheck,
  TrendingUp,
  Database,
  Globe,
  Check,
  ArrowRight,
  Cloud,
  Server,
  Lock,
} from 'lucide-react'
import WhyXuba from '../../../../../sections/Home/WhyXuba'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Rock-solid security',
    description: 'Your data protected with enterprise-grade encryption',
  },
  {
    icon: TrendingUp,
    title: 'Scale as you grow',
    description: "Pay for what you need, expand when you're ready",
  },
  {
    icon: Database,
    title: 'Automatic backups',
    description: 'Never lose a file again with continuous cloud backup',
  },
  {
    icon: Globe,
    title: 'Access anywhere',
    description: 'Work from the office, home, or beach—your choice',
  },
]

const services = [
  'Cloud migration & setup',
  'Microsoft 365 & Google Workspace',
  'AWS, Azure & cloud hosting',
  'Data storage & disaster recovery',
  'Cloud security & compliance',
]

const relatedServices = [
  {
    title: 'IT Support',
    tagline: 'Help when you need it. Problems solved fast.',
    href: '/services/it-support',
  },
  {
    title: 'Server Support & Security',
    tagline: 'Protected. Monitored. Always running.',
    href: '/services/server-support',
  },
  {
    title: 'System Deployment',
    tagline: 'New tech, zero drama.',
    href: '/services/system-deployment',
  },
]

export default function CloudTechnologyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  return (
    <main className='bg-xuba-purple-900 min-h-screen'>
      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-96 h-96 bg-xuba-green-500/10 rounded-full blur-3xl' />
          <div className='absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-xuba-purple-500/20 rounded-full blur-3xl' />
          <div className='absolute top-1/3 left-1/4 w-72 h-72 bg-xuba-green-500/5 rounded-full blur-3xl' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] uppercase mb-6 block'>
              Cloud Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className='text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6'
          >
            Simple. Flexible.{' '}
            <span className='text-xuba-green-500'>Secure.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className='text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-10'
          >
            Your data, accessible anywhere—without the headaches.
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
              Moving to the cloud doesn&apos;t have to be complicated. We make
              it <span className='text-xuba-green-400'>simple</span>,{' '}
              <span className='text-xuba-green-400'>flexible</span>, and{' '}
              <span className='text-xuba-green-400'>secure</span>—so you can
              access your files, apps, and data from anywhere without worrying
              about what&apos;s happening behind the scenes.
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
              Benefits
            </span>
            <h2 className='text-3xl md:text-5xl font-extralight tracking-tight text-white'>
              Why Go <span className='text-xuba-green-500'>Cloud</span>?
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
                What We <span className='text-xuba-green-500'>Handle</span> For
                You
              </h2>

              <ul className='space-y-4'>
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
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
                    <Cloud className='w-16 h-16 text-xuba-green-500' />
                  </div>
                </div>

                {/* Outer Icons */}
                <div
                  ref={topRef}
                  className='absolute top-4 left-1/2 -translate-x-1/2'
                >
                  <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                    <Server className='w-6 h-6 text-white/60' />
                  </div>
                </div>
                <div
                  ref={bottomRef}
                  className='absolute bottom-4 left-1/2 -translate-x-1/2'
                >
                  <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                    <Database className='w-6 h-6 text-white/60' />
                  </div>
                </div>
                <div
                  ref={leftRef}
                  className='absolute left-4 top-1/2 -translate-y-1/2'
                >
                  <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                    <Lock className='w-6 h-6 text-white/60' />
                  </div>
                </div>
                <div
                  ref={rightRef}
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                >
                  <div className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-xuba-purple-900 z-10'>
                    <Globe className='w-6 h-6 text-white/60' />
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
              Ready to Move to the{' '}
              <span className='text-xuba-green-500'>Cloud</span>?
            </h2>
            <p className='text-lg md:text-xl text-white/60 font-light mb-10 max-w-xl mx-auto'>
              Let&apos;s chat about what cloud setup makes sense for your
              business.
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
                  <p className='text-sm text-white/40 mb-4'>{service.tagline}</p>
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
