import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'System Deployment | Xuba',
  description:
    'System Deployment including planning, introduction, installation and configuration of any and all new machines for your business.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
