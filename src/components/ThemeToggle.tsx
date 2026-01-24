'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="w-5 h-5" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 flex items-center justify-center text-xuba-green-700 dark:text-white/60 hover:text-xuba-green-900 dark:hover:text-xuba-green-400 transition-all duration-300 focus:outline-none"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-xuba-green-500" />
        ) : (
          <Moon className="w-5 h-5 text-xuba-green-500" />
        )}
      </motion.div>
    </motion.button>
  )
}
