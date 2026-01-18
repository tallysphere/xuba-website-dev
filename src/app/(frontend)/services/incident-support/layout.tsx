import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Incident Support | Xuba',
  description:
    'Immediate response to IT issues to minimise downtime and maintain productivity.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
