import type { NextConfig } from 'next'

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
}

export default nextConfig
