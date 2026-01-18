import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IT Support | Xuba',
  description:
    'Remote desktop support and control, hardware management, remote data backup and restore, patch implementation, virus and spyware removal.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
