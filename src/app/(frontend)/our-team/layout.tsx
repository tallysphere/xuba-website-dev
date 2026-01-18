import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team | Xuba',
  description:
    'Meet the team at Xuba. We are a dedicated group of IT professionals who are passionate about helping small to medium size businesses get the most out of their IT infrastructure.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
