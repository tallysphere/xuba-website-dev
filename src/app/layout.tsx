import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { JsonLd } from '@/components/JsonLd'

/**
 * Base URL for the site - used for generating absolute URLs in metadata.
 * This is essential for Open Graph images, canonical URLs, and sitemap generation.
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xuba.co.nz'

/**
 * Viewport configuration for the site.
 * Separated from metadata as per Next.js 14+ conventions.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#17600e' },
  ],
}

/**
 * Root metadata configuration for the site.
 * Provides default SEO settings that can be overridden by individual pages.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Xuba | IT Services & Support Partner | Hamilton, NZ',
    template: '%s | Xuba IT Solutions',
  },
  description:
    'Looking for a dedicated, hard-working, clever IT support partner? Located in Hamilton, Waikato, New Zealand, Xuba offers IT support products and services including Cloud technology, Helpdesk remote support, System deployment, Server support and security, Network configuration, Proactive IT Support, Incident Support, and SMB IT Guidance.',
  keywords: [
    'IT support Hamilton',
    'IT services New Zealand',
    'cloud technology NZ',
    'IT helpdesk Waikato',
    'server support',
    'network configuration',
    'SMB IT solutions',
    'proactive IT support',
    'Xuba IT',
  ],
  authors: [{ name: 'Xuba IT Solutions', url: baseUrl }],
  creator: 'Xuba IT Solutions',
  publisher: 'Xuba IT Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: baseUrl,
    siteName: 'Xuba IT Solutions',
    title: 'Xuba | IT Services & Support Partner | Hamilton, NZ',
    description:
      'Dedicated IT support partner in Hamilton, New Zealand. Cloud technology, Helpdesk support, Server security, Network configuration, and SMB IT guidance.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Xuba IT Solutions - Your IT Support Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xuba | IT Services & Support Partner | Hamilton, NZ',
    description:
      'Dedicated IT support partner in Hamilton, New Zealand. Cloud technology, Helpdesk support, Server security, and SMB IT guidance.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'technology',
}

const raleway = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='overflow-x-hidden'>
      <head>
        <JsonLd />
      </head>
      <body className={`${raleway.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
