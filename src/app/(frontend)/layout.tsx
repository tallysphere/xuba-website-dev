import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { DisableDraftMode } from '@/components/DisableDraftMode'
import AnimatedHeader from '@/components/Header'
import { SanityLive } from '@/sanity/lib/live'
import { SimpleFooterWithFourGrids } from '@/components/Footer'

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='bg-background min-h-screen overflow-x-hidden'>
      <AnimatedHeader />
      {children}
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <SimpleFooterWithFourGrids />
    </section>
  )
}
