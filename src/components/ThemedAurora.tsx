'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Aurora from './Aurora'

// Xuba brand colors in hex format for aurora effect
const THEME_COLORS = {
  light: {
    // Option 1: White to vibrant green - cleaner look
    colorStops: ['#ffffff', '#b8d02f', '#ffffff'],
    
    // Option 2: Very light mint to green (uncomment to try)
    // colorStops: ['#f0fdf4', '#b8d02f', '#f0fdf4'],
    
    // Option 3: Gradient through complementary tones (uncomment to try)
    // colorStops: ['#fefce8', '#b8d02f', '#ecfccb'],
  },
  dark: {
    // Deep purple to lime green for dark theme
    colorStops: ['#581c87', '#b8d02f', '#581c87'], // purple-900, green-500, purple-900
  },
}

interface ThemedAuroraProps {
  lightColorStops?: string[]
  darkColorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
}

export function ThemedAurora({
  lightColorStops = THEME_COLORS.light.colorStops,
  darkColorStops = THEME_COLORS.dark.colorStops,
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
}: ThemedAuroraProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'
  const colorStops = isDark ? darkColorStops : lightColorStops

  return (
    <Aurora
      colorStops={colorStops}
      amplitude={amplitude}
      blend={blend}
      speed={speed}
    />
  )
}
