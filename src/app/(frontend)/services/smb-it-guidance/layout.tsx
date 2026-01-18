import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SMB IT Guidance | Xuba',
  description:
    'Guidance and support for small to medium-sized businesses to ensure optimal IT performance and security.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
