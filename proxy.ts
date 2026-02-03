import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy configuration for Xuba IT website.
 *
 * Implements Content Security Policy (CSP) with nonces for strict security,
 * plus additional security headers to protect against common web vulnerabilities.
 *
 * @see https://nextjs.org/docs/app/guides/content-security-policy
 */
export function proxy(request: NextRequest) {
  // Generate a unique nonce for each request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  /**
   * Content Security Policy configuration
   *
   * Allows:
   * - Sanity CMS (images, API, visual editing)
   * - Google Analytics & Tag Manager
   * - Cloudflare Turnstile (bot protection)
   * - Google Fonts (via next/font)
   * - Vercel Analytics
   * - Various image CDNs used in the site
   */
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ''}
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://googletagmanager.com
      https://challenges.cloudflare.com
      https://va.vercel-scripts.com;
    script-src-elem 'self' 'nonce-${nonce}'
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://googletagmanager.com
      https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline'
      https://fonts.googleapis.com;
    style-src-elem 'self' 'unsafe-inline';
    img-src 'self' blob: data:
      https://cdn.sanity.io
      https://assets.aceternity.com
      https://images.unsplash.com
      https://i.pravatar.cc
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://*.google-analytics.com
      https://*.googletagmanager.com;
    font-src 'self'
      https://fonts.gstatic.com
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
      https://vercel.live
      https://*.vercel-insights.com
      https://va.vercel-scripts.com
      ${isDev ? 'ws://localhost:* http://localhost:*' : ''};
    frame-src 'self'
      https://challenges.cloudflare.com;
    frame-ancestors 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `

  // Clean up whitespace in CSP header
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Clone request headers and add nonce + CSP
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  // Create response with modified request headers
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // Set CSP header on response
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  // Additional security headers
  // Prevents clickjacking by only allowing same-origin framing
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Prevents MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Controls referrer information sent with requests
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Enables DNS prefetching for performance
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  // Enforces HTTPS for 2 years with subdomains
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )

  // Restricts browser features/APIs
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  )

  return response
}

/**
 * Matcher configuration
 *
 * Runs proxy on all routes except:
 * - API routes (handled separately)
 * - Static files (_next/static)
 * - Image optimisation (_next/image)
 * - Favicon and metadata files
 * - Public images folder
 * - Sanity Studio (needs different CSP)
 *
 * Also excludes prefetch requests to avoid unnecessary processing
 */
export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|studio).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
