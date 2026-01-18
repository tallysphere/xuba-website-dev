import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get in Touch | Xuba',
  description:
    'Get in touch with Xuba HQ. Located in Hamilton, Waikato, New Zealand. ',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
