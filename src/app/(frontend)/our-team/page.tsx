import ContactSection from '@/components/ContactSection'
import { Spotlight } from '@/components/Spotlight'
import TiltedCard from '@/components/TiltedCard/TiltedCard'
import Link from 'next/link'
// import Image from 'next/image'

const people = [
  {
    name: 'Tom Cook',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Dries Vincent',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Lindsay Walton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Leslie Alexander',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Courtney Henry',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },

  {
    name: 'Whitney Francis',
    role: 'Copywriter',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    xUrl: '#',
    linkedinUrl: '#',
  },
]

export default function Example() {
  return (
    <div className='bg-xuba-purple-900 py-20 sm:py-32 lg:py-56 overflow-x-hidden'>
      <Spotlight />
      <div className='mx-auto flex flex-col md:mt-0 mt-20 items-center justify-center max-w-7xl gap-12 sm:gap-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl flex flex-col items-center justify-center pb-8 sm:pb-20'>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-white text-xs sm:text-sm md:text-lg font-light tracking-widest text-center'>
              ABOUT THE TEAM
            </div>
            <div className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mt-4 text-center'>
              Meet{' '}
              <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
                Our Team
              </span>
            </div>
          </div>
          <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 text-center max-w-3xl px-4'>
            With 15 years in the industry and IT in the blood, they are match
            fit and rearing to go. In order to create lasting bonds, we learn
            our client&apos;s business and where they are headed and how we can
            meet them there.
          </p>
        </div>
        <ul role='list' className='w-full'>
          {people.map((person) => (
            <li
              key={person.name}
              className='flex flex-col items-center gap-6 sm:gap-10 py-8 sm:py-12 first:pt-0 last:pb-0 sm:flex-row sm:items-start'
            >
              <div className='flex-shrink-0 w-full max-w-xs sm:max-w-none sm:w-auto'>
                <TiltedCard
                  imageSrc={person.imageUrl}
                  altText={person.name}
                  captionText={person.role}
                  containerHeight='280px'
                  containerWidth='100%'
                  imageHeight='280px'
                  imageWidth='280px'
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                />
              </div>
              <div className='max-w-xl flex-auto text-center sm:text-left px-4 sm:px-0'>
                <h3 className='text-2xl sm:text-3xl font-light uppercase tracking-wider text-xuba-green-500'>
                  {person.name}
                </h3>
                <p className='text-sm sm:text-base leading-7 text-gray-300 font-semibold mt-1'>
                  {person.role}
                </p>
                <p className='mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-gray-300'>
                  {person.bio}
                </p>
                <ul
                  role='list'
                  className='mt-4 sm:mt-6 flex gap-x-6 justify-center sm:justify-start'
                >
                  <li>
                    <Link
                      href={person.imageUrl}
                      className='text-gray-400 hover:text-gray-500 transition-colors'
                    >
                      <span className='sr-only'>X</span>
                      <svg
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                        className='size-5'
                      >
                        <path d='M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z' />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={person.imageUrl}
                      className='text-gray-400 hover:text-gray-500 transition-colors'
                    >
                      <span className='sr-only'>LinkedIn</span>
                      <svg
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                        className='size-5'
                      >
                        <path
                          d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                          clipRule='evenodd'
                          fillRule='evenodd'
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='px-4 sm:px-6 lg:px-8'>
        <ContactSection />
      </div>
    </div>
  )
}
