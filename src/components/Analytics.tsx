import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

type SiteSettings = {
  analytics?: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
}

/**
 * Analytics Component
 *
 * Renders Google Analytics and/or Google Tag Manager based on Sanity configuration.
 * Uses @next/third-parties/google for optimised loading (after hydration).
 *
 * Note: If GTM is configured, standalone GA is skipped because Google recommends
 * configuring GA through GTM when using both.
 *
 * @see https://nextjs.org/docs/app/guides/third-party-libraries
 */
export async function Analytics() {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false, // Critical: no stega in analytics IDs
  })

  if (!settings) return null

  const siteSettings = settings as SiteSettings
  const gaId = siteSettings.analytics?.googleAnalyticsId
  const gtmId = siteSettings.analytics?.googleTagManagerId

  // If neither is configured, render nothing
  if (!gaId && !gtmId) return null

  return (
    <>
      {/* Google Tag Manager - placed in <html>, injects into <head> */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {/* Google Analytics - only if GTM is not configured (GA should be set up via GTM otherwise) */}
      {gaId && !gtmId && <GoogleAnalytics gaId={gaId} />}
    </>
  )
}
