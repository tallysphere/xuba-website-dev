'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import DotGrid, { DotGridProps } from './DotGrid'

// Xuba brand colors in hex format
const THEME_COLORS = {
  light: {
    base: '#d5e382', // xuba-green-300
    active: '#b8d02f', // xuba-green-500
  },
  dark: {
    base: '#4a5412', // xuba-green-800
    active: '#c7da58', // xuba-green-400
  },
}

interface ThemedDotGridProps extends Omit<DotGridProps, 'baseColor' | 'activeColor'> {
  lightBaseColor?: string
  lightActiveColor?: string
  darkBaseColor?: string
  darkActiveColor?: string
}

export function ThemedDotGrid({
  lightBaseColor = THEME_COLORS.light.base,
  lightActiveColor = THEME_COLORS.light.active,
  darkBaseColor = THEME_COLORS.dark.base,
  darkActiveColor = THEME_COLORS.dark.active,
  ...props
}: ThemedDotGridProps) {
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
  const baseColor = isDark ? darkBaseColor : lightBaseColor
  const activeColor = isDark ? darkActiveColor : lightActiveColor

  return (
    <DotGrid
      baseColor={baseColor}
      activeColor={activeColor}
      {...props}
    />
  )
}
