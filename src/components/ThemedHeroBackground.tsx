'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { DotPattern } from './ui/dot-pattern'
import { cn } from '@/lib/utils'

/**
 * Lazy load Aurora component (heavy WebGL) to improve initial page load.
 * Only loaded when dark theme is active.
 */
const Aurora = dynamic(() => import('./Aurora'), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 bg-linear-to-br from-xuba-purple-900 via-xuba-purple-800 to-xuba-purple-900 animate-pulse' />
  ),
})

/** Aurora color stops for dark theme (purple-900, green-500, purple-900) */
const DARK_AURORA_COLORS = ['#581c87', '#b8d02f', '#581c87']

/**
 * Custom hook to detect user's reduced motion preference.
 * Uses useSyncExternalStore pattern to avoid cascading renders.
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check on initial render (SSR-safe)
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * ThemedHeroBackground - A theme-aware background component for the Hero section.
 *
 * Features:
 * - Lazy loads Aurora (WebGL) only when needed for dark theme
 * - Respects user's reduced motion preference
 * - Smooth fade-in transition to prevent flash
 *
 * @example
 * <ThemedHeroBackground />
 */
export function ThemedHeroBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  const isDark = resolvedTheme === 'dark'

  // Placeholder gradient while loading (prevents flash)
  if (!mounted) {
    return (
      <div
        className='absolute inset-0 z-0 bg-linear-to-b from-transparent via-xuba-green-50/20 to-transparent dark:from-xuba-purple-900 dark:via-xuba-purple-800/50 dark:to-xuba-purple-900'
        aria-hidden='true'
      />
    )
  }

  if (isDark) {
    // Dark theme: Aurora effect (or static gradient if reduced motion)
    if (prefersReducedMotion) {
      // Static gradient for users who prefer reduced motion
      return (
        <div
          className='absolute inset-0 z-0 bg-linear-to-br from-xuba-purple-900 via-xuba-green-900/30 to-xuba-purple-900 opacity-60'
          aria-hidden='true'
        />
      )
    }

    return (
      <div
        className={cn(
          'absolute inset-0 z-0 opacity-50',
          'motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out'
        )}
        aria-hidden='true'
      >
        <Aurora
          colorStops={DARK_AURORA_COLORS}
          amplitude={1.2}
          blend={0.6}
          speed={0.5}
        />
      </div>
    )
  }

  // Light theme: Dot Pattern (static, no motion concerns)
  return (
    <DotPattern
      width={24}
      height={24}
      cx={1}
      cy={1}
      cr={1.5}
      className={cn(
        'absolute inset-0 z-0 text-xuba-green-400/40',
        'mask-[radial-gradient(ellipse_at_center,white,transparent_80%)]',
        'motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out'
      )}
      aria-hidden='true'
    />
  )
}
