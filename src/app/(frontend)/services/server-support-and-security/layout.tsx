import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Server Support and Security | Xuba',
  description:
    'Comprehensive server support and security solutions including firewalls, VPN setup and management, advanced spyware detection and removal, spam filtering, and robust virus protection.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
