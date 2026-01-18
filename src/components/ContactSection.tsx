import Link from 'next/link'
import { GridLineHorizontal } from './GridLines'
import { GridLineVertical } from './GridLineVertical'
import {
  ArrowRight,
  Building2Icon,
  PhoneCallIcon,
  MailIcon,
} from 'lucide-react'

const ContactSection = () => {
  return (
    <section className='w-full grid grid-cols-1 md:grid-cols-3 my-20 md:my-40 justify-start relative z-20 max-w-7xl mx-auto bg-gradient-to-br from-gray-100 to-white dark:from-neutral-900 dark:to-xuba-purple-900'>
      <GridLineHorizontal className='top-0' offset='200px' />
      <GridLineHorizontal className='bottom-0 top-auto' offset='200px' />
      <GridLineVertical className='left-0' offset='80px' />
      <GridLineVertical className='left-auto right-0' offset='80px' />
      <div className='md:col-span-2 p-8 md:p-14 md:text-start text-center'>
        <h2 className=' text-neutral-500 dark:text-neutral-200 text-xl md:text-3xl tracking-tight font-medium'>
          We are here to help you{' '}
          <span className='font-bold text-black dark:text-white'>
            with your IT needs
          </span>
        </h2>
        <p className=' text-neutral-500 mt-4 max-w-lg dark:text-neutral-200 text-2xl tracking-tight font-medium'>
          Get in touch with us{' '}
          <span className='text-xuba-green-500'>Today.</span>
        </p>

        <div className='flex items-start sm:items-center flex-col sm:flex-row sm:gap-4 mt-10'>
          <Link
            href='/contact'
            className='relative md:w-56 w-full gap-1 rounded-none border-2 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-2 py-2 shadow-lg dark:shadow-xl dark:shadow-xuba-purple-500/40'
          >
            {/* <div className='absolute top-3 left-12 w-8 h-1 transition-all bg-xuba-green-500 dark:bg-xuba-purple-400' /> */}

            {/* <Typewriter
                  text='Explore our Services'
                  className='text-gray-700 font-semibold text-lg text-nowrap tracking-tight'
                  cursorClassName='text-gray-700'
                  speed={70}
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={'_'}
                /> */}
            {/* <span className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight'>
                  Explore our Services
                </span> */}
            <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center'>
              Get in touch
              <ArrowRight className='w-4 h-4 ml-2' />
            </div>
          </Link>
        </div>
      </div>
      <div className='border-t md:border-t-0 md:border-l border-dashed p-8 md:p-14 md:text-start text-center'>
        <div className='space-y-4'>
          <a
            href='https://maps.app.goo.gl/MdruTpLBcwko2yuV8'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors justify-center md:justify-start'
          >
            <Building2Icon className='w-5 h-5 text-xuba-green-500 shrink-0' />
            <span className='text-sm'>
              15 King Street, Frankton, Hamilton, NZ
            </span>
          </a>
          <a
            href='tel:0800332211'
            className='flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors justify-center md:justify-start'
          >
            <PhoneCallIcon className='w-5 h-5 text-xuba-green-500 shrink-0' />
            <span className='text-sm'>0800 33 22 11</span>
          </a>
          <a
            href='mailto:hello@xuba.co.nz'
            className='flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-xuba-green-500 dark:hover:text-xuba-green-400 transition-colors justify-center md:justify-start'
          >
            <MailIcon className='w-5 h-5 text-xuba-green-500 shrink-0' />
            <span className='text-sm'>hello@xuba.co.nz</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
