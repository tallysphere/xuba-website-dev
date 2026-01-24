'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import createGlobe from 'cobe'

/**
 * Custom hook to detect user's reduced motion preference.
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
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

interface GlobeProps {
  className?: string
}

// Theme-specific globe configurations
const GLOBE_THEMES = {
  light: {
    dark: 0, // Light globe
    baseColor: [0.85, 0.9, 0.85] as [number, number, number], // Light greenish-white
    markerColor: [0.722, 0.816, 0.184] as [number, number, number], // xuba-green-500
    glowColor: [0.722, 0.816, 0.184] as [number, number, number], // xuba-green-500 glow
  },
  dark: {
    dark: 1, // Dark globe
    baseColor: [0.722, 0.816, 0.184] as [number, number, number], // xuba-green-500
    markerColor: [0.722, 0.816, 0.184] as [number, number, number], // xuba-green-500
    glowColor: [0.4, 0.2, 0.6] as [number, number, number], // xuba-purple tint
  },
}

/**
 * Globe - Interactive 3D globe visualization using cobe.
 *
 * Features:
 * - Auto-rotating globe with markers
 * - Respects reduced motion preference (stops rotation)
 * - Theme-aware colors (light globe for light theme, dark for dark)
 */
export const Globe = ({ className }: GlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    let phi = 0
    const isDark = resolvedTheme === 'dark'
    const themeConfig = isDark ? GLOBE_THEMES.dark : GLOBE_THEMES.light

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: -0.15,
      dark: themeConfig.dark,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isDark ? 6 : 1.2,
      baseColor: themeConfig.baseColor,
      markerColor: themeConfig.markerColor,
      glowColor: themeConfig.glowColor,
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.08 }, // London
        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
      ],
      onRender: (state) => {
        // Only animate if user doesn't prefer reduced motion
        if (!prefersReducedMotion) {
          state.phi = phi
          phi += 0.005
        } else {
          state.phi = 0.5 // Static position
        }
      },
    })

    return () => {
      globe.destroy()
    }
  }, [prefersReducedMotion, resolvedTheme, mounted])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
      className={className}
      aria-hidden='true'
    />
  )
}
