import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Xuba',
  description:
    'Xuba was conceived from a shared vision for faster, smarter IT technology coupled with bright spark, cut above the rest IT support service.   We believe in quick.  We believe in quality.  And we&apos;re passionately committed to doing things better.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
