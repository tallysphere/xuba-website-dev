'use client'

import { motion, Variants } from 'framer-motion'

export default function Logo() {
  // Animation variants for the SVG paths
  const pathVariants: Variants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(183, 208, 47, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(184, 208, 47, 1)',
      transition: {
        pathLength: {
          type: 'spring' as const,
          duration: 1,
          bounce: 0,
        },
        opacity: {
          duration: 0.2,
        },
        fill: {
          duration: 0.5,
        },
      },
    },
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full'
    >
      <svg
        viewBox='0 0 460.8 259.2'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-auto drop-shadow-[0_0_15px_rgba(184,208,47,0.5)]'
      >
        <motion.path
          d='M241.07,81.05l18.8.03c33.36,4.23,47.83,45.5,22.82,69.02-16.12,15.16-35.44,9.92-55.65,10.79-6.57-.4-11.88-6.62-11.9-13.06-.08-25.84.61-51.81.25-77.7,1.21-11.29,15.82-15.93,22.89-6.8,4.15,5.36,2.4,11.43,2.78,17.72ZM241.43,106.7l-.37.83c.35,8.44-.36,16.97-.14,25.39.01.44.16,2.06.37,2.21,4.15.05,8.45.29,12.62.11,2.51-.11,4.84-.23,7.15-1.24,12.18-5.37,10.94-23.29-2.25-26.69-.37-.1-1.44-.61-1.55-.61h-15.83Z'
          variants={pathVariants}
          initial='hidden'
          animate='visible'
          transition={{
            pathLength: {
              type: 'spring' as const,
              duration: 1,
              bounce: 0,
              delay: 0,
            },
            opacity: {
              duration: 0.2,
              delay: 0,
            },
            fill: {
              duration: 0.5,
              delay: 0.3,
            },
          }}
          stroke='#b7d02f'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <motion.path
          d='M377.24,84.73c1.97,1.99,3.2,4.96,3.69,7.7v57.09c-.89,6.26-5.88,10.96-12.14,11.6-2.46.25-5-.17-7.42-.17-16.18.02-32.58,2.25-45.94-9.04-18.98-16.04-19.28-44.83-.59-61.26,16.01-14.07,35.88-8.52,55.41-9.6,2.52.58,5.17,1.83,6.99,3.68ZM355.25,134.88v-27.81l-.36-.36h-15.59c-.17,0-2.93.72-3.25.83-9.22,3.11-12.08,15.38-5.88,22.68,4.3,5.06,8.38,4.71,14.39,4.77,3.36.03,6.79-.18,10.11.24l.58-.35Z'
          variants={pathVariants}
          initial='hidden'
          animate='visible'
          transition={{
            pathLength: {
              type: 'spring' as const,
              duration: 1,
              bounce: 0,
              delay: 0.3,
            },
            opacity: {
              duration: 0.2,
              delay: 0.3,
            },
            fill: {
              duration: 0.5,
              delay: 0.6,
            },
          }}
          stroke='#b7d02f'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <motion.path
          d='M86.44,101.03c5.26-4.99,10.83-11.58,16.22-16.03,10.16-8.39,24.76,1.77,20.46,14.46-.6,1.76-1.73,3.13-2.94,4.5-5.99,6.79-13.53,13.31-19.92,19.89-.2.21-.52.38-.48.72,5.25-.31,8.11,2.07,11.64,5.39,3.14,2.95,10.94,10.3,12.04,14.1,3.54,12.28-10.02,21.85-20.33,14.33l-18.58-18.5-.85.51c-6.03,5.25-11.62,12.8-17.74,17.75-5.32,4.29-13.26,3.38-17.64-1.8-4.34-5.14-3.98-12.18.24-17.27,4.73-5.71,12.17-10.87,16.51-16.71.24-.32,1-.27.91-1.15l-17.77-17.99c-8.97-11.68,4.53-26.64,17.11-19.02l18.87,18.55h.71c.63-.4,1.06-1.27,1.53-1.72Z'
          variants={pathVariants}
          initial='hidden'
          animate='visible'
          transition={{
            pathLength: {
              type: 'spring' as const,
              duration: 1,
              bounce: 0,
              delay: 0.6,
            },
            opacity: {
              duration: 0.2,
              delay: 0.6,
            },
            fill: {
              duration: 0.5,
              delay: 0.9,
            },
          }}
          stroke='#b7d02f'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <motion.path
          d='M151.28,84.25c2.28,2.05,3.9,5.63,4.16,8.67.79,9.2-.6,19.48,0,28.78.49,7.67,6.58,13.56,14.29,13.55,6.96-.01,13.47-5.85,14.03-12.83.72-8.98-.49-18.96-.02-28.07.9-17.52,23.78-17.8,25.93-1.2-.77,19.73,4.01,39.43-10.8,55.16-24.42,25.93-66.88,9.81-69.32-25.42-.56-8.01-.37-19-.01-27.1.17-3.94.39-6.68,2.83-9.88,4.52-5.91,13.42-6.61,18.92-1.66Z'
          variants={pathVariants}
          initial='hidden'
          animate='visible'
          transition={{
            pathLength: {
              type: 'spring' as const,
              duration: 1,
              bounce: 0,
              delay: 0.9,
            },
            opacity: {
              duration: 0.2,
              delay: 0.9,
            },
            fill: {
              duration: 0.5,
              delay: 1.2,
            },
          }}
          stroke='#b7d02f'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <motion.path
          d='M409.38,139.15c8.82,9.62-.65,24.99-13,21.27-10.52-3.17-12.65-16.62-3.79-22.99,5.12-3.67,12.52-2.94,16.79,1.72Z'
          variants={pathVariants}
          initial='hidden'
          animate='visible'
          transition={{
            pathLength: {
              type: 'spring' as const,
              duration: 1,
              bounce: 0,
              delay: 1.2,
            },
            opacity: {
              duration: 0.2,
              delay: 1.2,
            },
            fill: {
              duration: 0.5,
              delay: 1.5,
            },
          }}
          stroke='#b7d02f'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </motion.div>
  )
}
