import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cloud Technology | Xuba',
  description:
    'Cloud technology that’s simple, flexible and secure. Solutions for data storage, backup, and disaster recovery.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
