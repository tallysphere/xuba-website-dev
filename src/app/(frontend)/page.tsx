// import { motion } from 'framer-motion'
import ContactSection from '@/components/ContactSection'
import HomeHeroDemo1 from '../../../sections/Home/Hero'
import { HomeServices } from '../../../sections/Home/HomeServices'
import WhyXuba from '../../../sections/Home/WhyXuba'


// import Threads from '@/components/originui/Threads/Threads'

export default function Home() {
  return (
    <main className='relative min-h-screen w-full h-full bg-xuba-purple-900'>
      <div className='p-0 m-0 flex flex-col gap-0'>
        <HomeHeroDemo1 />
        <HomeServices />
        <WhyXuba />
        {/* <TestimonialsMarqueeGrid /> */}
        <ContactSection />
      </div>
    </main>
  )
}
