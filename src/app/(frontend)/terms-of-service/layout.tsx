import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Xuba',
  description:
    'Terms of Service for Xuba.  We are committed to providing the best possible service to our clients.  This is our Terms of Service.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
