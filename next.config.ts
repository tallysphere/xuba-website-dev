import type { NextConfig } from 'next'

/**
 * Content Security Policy for Xuba IT website.
 *
 * This CSP uses 'unsafe-inline' for scripts since nonce-based CSP
 * requires proxy.ts which has compatibility issues with Vercel deployments.
 *
 * Allowed sources:
 * - Sanity CMS (images, API, visual editing)
 * - Google Analytics & Tag Manager
 * - Cloudflare Turnstile (bot protection)
 * - Google Fonts (via next/font)
 * - Vercel Analytics
 * - Various image CDNs used in the site
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://googletagmanager.com
    https://challenges.cloudflare.com
    https://*.cloudflare.com
    https://static.cloudflareinsights.com
    https://va.vercel-scripts.com
    https://vercel.live
    https://*.vercel.live
    https://*.vercel.com;
  style-src 'self' 'unsafe-inline'
    https://fonts.googleapis.com
    https://vercel.live
    https://*.vercel.live;
  img-src 'self' blob: data:
    https://cdn.sanity.io
    https://assets.aceternity.com
    https://images.unsplash.com
    https://i.pravatar.cc
    https://www.google-analytics.com
    https://www.googletagmanager.com
    https://*.google-analytics.com
    https://*.googletagmanager.com
    https://vercel.live
    https://*.vercel.live
    https://vercel.com
    https://*.vercel.com;
  font-src 'self'
    https://fonts.gstatic.com
    https://vercel.live
    https://*.vercel.live
    data:;
  connect-src 'self'
    https://*.sanity.io
    https://api.sanity.io
    https://*.api.sanity.io
    https://www.google-analytics.com
    https://google-analytics.com
    https://*.google-analytics.com
    https://www.googletagmanager.com
    https://googletagmanager.com
    https://*.googletagmanager.com
    https://challenges.cloudflare.com
    https://*.cloudflare.com
    https://cloudflareinsights.com
    https://*.cloudflareinsights.com
    https://vercel.live
    https://*.vercel.live
    https://*.vercel.com
    https://*.vercel-insights.com
    https://va.vercel-scripts.com
    wss://ws-us3.pusher.com
    wss://*.pusher.com;
  frame-src 'self'
    https://challenges.cloudflare.com
    https://*.cloudflare.com
    https://vercel.live
    https://*.vercel.live;
  frame-ancestors 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`

/**
 * Security headers configuration for Xuba IT website.
 *
 * These headers protect against common web vulnerabilities:
 * - XSS attacks (CSP)
 * - Clickjacking (X-Frame-Options)
 * - MIME sniffing (X-Content-Type-Options)
 * - Referrer leakage (Referrer-Policy)
 * - Protocol downgrade attacks (HSTS)
 * - Unwanted browser features (Permissions-Policy)
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
]

const nextConfig: NextConfig = {
  reactCompiler: true,

  /**
   * Image optimisation configuration
   *
   * Using remotePatterns (recommended) instead of deprecated domains array.
   * All external image sources used in the site are listed here.
   */
  images: {
    remotePatterns: [
      // Sanity CMS images
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Aceternity UI component images
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      // Unsplash stock photos
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      // Pravatar placeholder avatars
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // Tailwind CSS assets (if used)
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
    ],
  },

  /**
   * Custom headers configuration
   *
   * Applies security headers to all routes except Sanity Studio
   * which requires its own CSP configuration.
   */
  async headers() {
    return [
      {
        // Apply to all routes except Sanity Studio
        source: '/((?!studio).*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
