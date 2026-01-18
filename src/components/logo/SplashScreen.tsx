'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useTheme } from 'next-themes'
import Logo from './AnimatedLogoPath'

interface SplashScreenProps {
  onComplete?: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Create a GSAP timeline for complex animations
    const tl = gsap.timeline({
      onComplete: () => {
        // Call the onComplete callback after the animation finishes
        if (onComplete) setTimeout(onComplete, 2000)
      },
    })

    // Animate the container background
    tl.to(containerRef.current, {
      duration: 0.5,
      background:
        resolvedTheme === 'light'
          ? 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)'
          : 'radial-gradient(circle, rgba(27,8,28,1) 0%, rgba(27,8,28,1) 100%)',
      ease: 'power2.inOut',
    })

    return () => {
      // Clean up animation when component unmounts
      tl.kill()
    }
  }, [onComplete, resolvedTheme])

  return (
    <motion.div
      ref={containerRef}
      className='fixed inset-0 flex items-center justify-center z-50 overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='relative w-full h-full flex items-center justify-center'>
        <div className='relative z-10 w-4/5 max-w-lg'>
          <Logo />
        </div>
      </div>
    </motion.div>
  )
}
