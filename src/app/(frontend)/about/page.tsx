'use client'

import React from 'react'
import Image from 'next/image'
import { Spotlight } from '@/components/Spotlight'

import CountUp from 'react-countup'
import ContactSection from '@/components/ContactSection'

const stats = [
  { label: 'Years in Business', value: '10', postfix: '' },
  { label: 'Clients', value: '100', postfix: '+' },
  { label: 'Projects', value: '1000', postfix: '+' },
]

const team = [
  {
    name: 'Tom Cook',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Toronto, Canada',
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Glasgow, Scotland',
  },
  {
    name: 'Dries Vincent',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Niagara Falls, Canada',
  },
  {
    name: 'Lindsay Walton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'London, England',
  },
  {
    name: 'Leslie Alexander',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Toronto, Canada',
  },
  {
    name: 'Courtney Henry',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Toronto, Canada',
  },

  {
    name: 'Whitney Francis',
    role: 'Copywriter',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Toronto, Canada',
  },
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    location: 'Toronto, Canada',
  },
]

export default function AboutPage() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-xuba-purple-900 py-12 sm:py-20 overflow-x-hidden'>
      <Spotlight />
      <div className='flex flex-col items-center justify-center px-4 sm:px-6 md:mt-0 mt-20'>
        <div className='text-white text-sm sm:text-lg font-light tracking-widest mt-12 sm:mt-20 text-center'>
          WHO ARE WE?
        </div>
        <div className='text-white text-4xl sm:text-5xl md:text-7xl font-thin tracking-tight mt-4 text-center max-w-4xl'>
          Our{' '}
          <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
            Team
          </span>
        </div>
      </div>
      <main className='isolate w-full'>
        {/* Hero section */}
        <div className='relative isolate -z-10'>
          <div
            aria-hidden='true'
            className='absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className='aspect-801/1036 w-200.25 bg-linear-to-tr from-xuba-green-500 to-xuba-green-700 opacity-40'
            />
          </div>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-7xl pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 lg:pb-32'>
              <div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
                <div className='relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl'>
                  <h1 className='text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight text-pretty text-white text-center lg:text-left'>
                    Clever IT & Clever People
                  </h1>
                  <p className='mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl font-medium text-pretty text-white text-center lg:text-left'>
                    Xuba was conceived from a shared vision for faster, smarter
                    IT technology coupled with bright spark, cut above the rest
                    IT support service. We believe in quick. We believe in
                    quality. And we&apos;re passionately committed to doing
                    things better. The result? It&apos;s really quite simple; we
                    help our clients sleep at night.
                  </p>
                  <p className='mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl font-medium text-pretty text-white text-center lg:text-left'>
                    We love getting on with it. When it comes to our clients,
                    it&apos;s not size that matters. Whether we&apos;re working
                    with a long-established company or a small start-up, we
                    approach every project with an open mind and enthusiastic
                    attitude.
                  </p>
                </div>
                <div className='mt-8 sm:mt-14 lg:mt-0 flex justify-center lg:justify-end gap-4 sm:gap-8 lg:pl-0'>
                  <div className='w-32 sm:w-44 flex-none space-y-4 sm:space-y-8 pt-16 sm:pt-32 lg:order-last lg:pt-36 xl:order-0 xl:pt-80'>
                    <div className='relative'>
                      <Image
                        alt='Team member working'
                        src='https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80'
                        className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={500}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
                    </div>
                  </div>
                  <div className='w-32 sm:w-44 flex-none space-y-4 sm:space-y-8 pt-8 sm:pt-52 lg:pt-36'>
                    <div className='relative'>
                      <Image
                        alt='Team collaboration'
                        src='https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80'
                        className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={500}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
                    </div>
                    <div className='relative'>
                      <Image
                        alt='Office environment'
                        src='https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80'
                        className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={500}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
                    </div>
                  </div>
                  <div className='w-32 sm:w-44 flex-none space-y-4 sm:space-y-8 pt-16 sm:pt-32 lg:pt-0'>
                    <div className='relative'>
                      <Image
                        alt='Technology workspace'
                        src='https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80'
                        className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={500}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
                    </div>
                    <div className='relative'>
                      <Image
                        alt='Modern office setup'
                        src='https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80'
                        className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={500}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10  sm:-mt-12 lg:xl:-mt-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pretty text-white text-center lg:text-left'>
              Our mission
            </h2>
            <div className='mt-6 flex flex-col gap-x-8 gap-y-12 sm:gap-y-20 lg:flex-row'>
              <div className='lg:w-full lg:max-w-2xl lg:flex-auto'>
                <p className='text-lg sm:text-xl leading-8 text-gray-200 text-center lg:text-left'>
                  Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                  sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                  id at vitae feugiat egestas ac. Diam nulla orci at in viverra
                  scelerisque eget. Eleifend egestas fringilla sapien.
                </p>
                <p className='mt-6 sm:mt-10 text-base leading-7 text-gray-200 text-center lg:text-left'>
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                  risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                  Id dolor praesent donec est. Odio penatibus risus viverra
                  tellus varius sit neque erat velit. Faucibus commodo massa
                  rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                  mauris semper sed amet vitae sed turpis id.
                </p>
              </div>
              <div className='lg:flex lg:flex-auto lg:justify-center'>
                <dl className='w-full max-w-sm mx-auto space-y-6 sm:space-y-8 lg:w-64 xl:w-80'>
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className='flex flex-col-reverse gap-y-3 sm:gap-y-4 text-center lg:text-left'
                    >
                      <dt className='text-base leading-7 text-gray-400'>
                        {stat.label}
                      </dt>
                      <dd className='text-4xl sm:text-5xl font-semibold tracking-tight text-xuba-green-500 drop-shadow-2xl drop-shadow-xuba-green-500/50'>
                        <CountUp end={Number(stat.value)} />
                        {stat.postfix}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto mt-32 sm:mt-32 lg:mt-40 max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pretty text-white text-center lg:text-left'>
              Our team
            </h2>
            <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-gray-300 text-center lg:text-left'>
              We have a rather clever team. With 15 years in the industry and IT
              in the blood, they are match fit and rearing to go. In order to
              create lasting bonds, we learn our client&apos;s business and
              where they are headed and how we can meet them there.
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-12 sm:mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4'
          >
            {team.map((person) => (
              <li key={person.name} className='text-center lg:text-left'>
                <Image
                  alt={`${person.name} - ${person.role}`}
                  src={person.imageUrl}
                  className='aspect-14/13 w-full rounded-2xl object-cover'
                  width={500}
                  height={500}
                />
                <h3 className='mt-4 sm:mt-6 text-lg leading-8 font-semibold tracking-tight text-white'>
                  {person.name}
                </h3>
                <p className='text-base leading-7 text-gray-300'>
                  {person.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <ContactSection />
      </div>
    </div>
  )
}
