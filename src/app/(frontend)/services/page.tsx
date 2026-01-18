'use client'

import { Spotlight } from '@/components/Spotlight'
import Image from 'next/image'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

import { HoverEffect } from '@/components/CardWithHover'

import ContactSection from '@/components/ContactSection'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import createGlobe from 'cobe'
import { BackgroundGrids } from '@/components/BackgroundGrids'

const FAQs = [
  {
    question: 'What IT services do you offer?',
    answer:
      'We offer a comprehensive range of IT services including cloud technology, IT support, server security, system deployment, incident support, and SMB IT guidance.',
  },
  {
    question: 'How quickly can you respond to IT emergencies?',
    answer:
      'Our incident support team provides immediate response to IT issues to minimize downtime and maintain your business productivity.',
  },
  {
    question: 'Do you provide remote IT support?',
    answer:
      'Yes, we offer remote desktop support and control, hardware management, remote data backup and restore, and virus removal services.',
  },
  {
    question: 'What cloud solutions do you provide?',
    answer:
      'We provide simple, flexible and secure cloud technology solutions including data storage, backup, and disaster recovery services.',
  },
  {
    question: 'Do you work with small and medium businesses?',
    answer:
      'Absolutely! We specialize in providing guidance and support for small to medium-sized businesses to ensure optimal IT performance and security.',
  },
  {
    question: 'What security measures do you implement?',
    answer:
      'We provide comprehensive server support and security solutions including firewalls, VPN setup, advanced spyware detection, spam filtering, and robust virus protection.',
  },
]

const features = [
  {
    title: 'Cloud Technology',
    description:
      "Cloud technology that's simple, flexible and secure. Solutions for data storage, backup, and disaster recovery.",
    link: '/services/cloud-technology',
  },
  {
    title: 'IT Support',
    description:
      'Remote desktop support and control, hardware management, remote data backup and restore, patch implementation, virus and spyware removal.',
    link: '/services/it-support',
  },
  {
    title: 'Server Support and Security',
    description:
      'Comprehensive server support and security solutions including firewalls, VPN setup and management, advanced spyware detection and removal, spam filtering, and robust virus protection.',
    link: '/services/server-support-and-security',
  },
  {
    title: 'System Deployment',
    description:
      'System Deployment including planning, introduction, installation and configuration of any and all new machines for your business.',
    link: '/services/system-deployment',
  },
  {
    title: 'Incident Support',
    description:
      'Immediate response to IT issues to minimise downtime and maintain productivity.',
    link: '/services/incident-support',
  },
  {
    title: 'SMB IT Guidance',
    description:
      'Guidance and support for small to medium-sized businesses to ensure optimal IT performance and security.',
    link: '/services/smb-it-guidance',
  },
]

export default function ServicesPage() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className='relative h-full w-full flex flex-col items-center justify-start py-32 overflow-hidden bg-xuba-purple-900'>
      <div className='max-w-7xl'>
        {' '}
        <Spotlight />
        <div className='flex flex-col items-center justify-center'>
          <div className='text-white text-lg font-light tracking-widest mt-20'>
            WHAT WE DO
          </div>
          <div className='text-white md:text-7xl text-5xl font-thint tracking-tight mt-4 text-center'>
            Our{' '}
            <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
              Services
            </span>
          </div>
          <div className='text-white max-w-2xl text-center text-lg font-light tracking-tight mt-4 md:px-0 px-6'>
            We offer a robust range of IT support products and services to save
            you money, keep your systems happy, improve efficiency and help you
            work smarter.
          </div>
        </div>
      </div>
      <div className='relative h-full bg-white dark:bg-xuba-purple-900 p-0 m-0 overflow-hidden'>
        <BackgroundGrids />
        <div className='mx-auto my-20 w-full max-w-7xl px-4 md:px-8'>
          <div className='cols-1 mt-20 grid gap-4 md:auto-rows-[25rem] md:grid-cols-5'>
            <Card
              href='/services/cloud-technology'
              title='Cloud Technology'
              className='flex flex-col justify-between md:col-span-3'
            >
              <CardSkeletonBody>
                <SkeletonOne />
              </CardSkeletonBody>
              <CardContent className='h-40'>
                <CardTitle>Cloud Technology</CardTitle>
                <CardDescription>
                  Cloud technology that’s simple, flexible and secure. Solutions
                  for data storage, backup, and disaster recovery.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              href='/services/it-support'
              title='IT Support'
              className='flex flex-col justify-between md:col-span-2'
            >
              <CardContent>
                <CardTitle>IT Support</CardTitle>
                <CardDescription className='w-full'>
                  Remote desktop support and control, hardware management,
                  remote data backup and restore, patch implementation, virus
                  and spyware removal.
                </CardDescription>
              </CardContent>
              <CardSkeletonBody>
                <div className='ml-6 mt-2 h-full w-full rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
                  <Image
                    src='https://assets.aceternity.com/pro/dashboard.webp'
                    alt='Helpdesk Support'
                    width={500}
                    height={500}
                    className='w-full rounded-lg object-cover'
                  />
                </div>
              </CardSkeletonBody>
            </Card>

            <Card
              href='/services/server-support-and-security'
              title='Server Support and Security'
              className='flex flex-col justify-between md:col-span-2'
            >
              <CardSkeletonBody>
                <SkeletonTwo />
              </CardSkeletonBody>
              <CardContent className='h-40'>
                <CardTitle>Server Support and Security</CardTitle>
                <CardDescription>
                  Comprehensive server support and security solutions including
                  firewalls, VPN setup and management, advanced spyware
                  detection and removal, spam filtering, and robust virus.
                </CardDescription>
              </CardContent>
            </Card>
            <Card
              href='/services/system-deployment'
              title='System Deployment'
              className='flex flex-col justify-between md:col-span-3'
            >
              <CardContent>
                <CardTitle>System Deployment</CardTitle>
                <CardDescription>
                  System Deployment including planning, introduction,
                  installation and configuration of any and all new machines for
                  your business.
                </CardDescription>
              </CardContent>
              <CardSkeletonBody>
                <div className='ml-6 mt-2 h-full w-full rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
                  <Image
                    src='https://assets.aceternity.com/pro/dashboard.webp'
                    alt='Dashboard'
                    width={500}
                    height={500}
                    className='w-full rounded-lg object-cover'
                  />
                </div>
              </CardSkeletonBody>
            </Card>
          </div>

          <div className='cols-1 mt-4 grid gap-4 md:auto-rows-[25rem] md:grid-cols-5'>
            <Card
              href='/services/incident-support'
              title='Incident Support'
              className='flex flex-col justify-between md:col-span-3'
            >
              <CardSkeletonBody>
                <SkeletonOne />
              </CardSkeletonBody>
              <CardContent className='h-40'>
                <CardTitle>Incident Support</CardTitle>
                <CardDescription>
                  Immediate response to IT issues to minimise downtime and
                  maintain productivity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              href='/services/smb-it-guidance'
              title='SMB IT Guidance'
              className='flex flex-col justify-between md:col-span-2'
            >
              <CardContent>
                <CardTitle>SMB IT Guidance</CardTitle>
                <CardDescription className='w-full'>
                  Guidance and support for small to medium-sized businesses to
                  ensure optimal IT performance and security.
                </CardDescription>
              </CardContent>
              <CardSkeletonBody>
                <div className='ml-6 mt-2 h-full w-full rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
                  <Image
                    src='https://assets.aceternity.com/pro/dashboard.webp'
                    alt='Helpdesk Support'
                    width={500}
                    height={500}
                    className='w-full rounded-lg object-cover'
                  />
                </div>
              </CardSkeletonBody>
            </Card>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  )
}

const FAQItem = ({
  question,
  answer,
  setOpen,
  open,
}: {
  question: string
  answer: string
  open: string | null
  setOpen: (open: string | null) => void
}) => {
  const isOpen = open === question

  return (
    <div
      className='cursor-pointer py-4'
      onClick={() => {
        if (isOpen) {
          setOpen(null)
        } else {
          setOpen(question)
        }
      }}
    >
      <div className='flex items-start'>
        <div className='relative mr-4 mt-1 h-6 w-6 flex-shrink-0'>
          <IconPlus
            className={cn(
              'absolute inset-0 h-6 w-6 transform text-xuba-green-500 transition-all duration-200',
              isOpen && 'rotate-90 scale-0'
            )}
          />
          <IconMinus
            className={cn(
              'absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-xuba-green-500 transition-all duration-200',
              isOpen && 'rotate-0 scale-100'
            )}
          />
        </div>
        <div>
          <h3 className='text-lg font-medium text-white'>{question}</h3>
          <AnimatePresence mode='wait'>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='overflow-hidden text-white'
              >
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative mx-auto flex w-fit items-center justify-center p-4'>
      <motion.div
        initial={{ width: 0, height: 0, borderRadius: 0 }}
        whileInView={{ width: '100%', height: '100%' }}
        style={{ transformOrigin: 'top-left' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='absolute inset-0 h-full w-full border border-neutral-200 dark:border-xuba-green-500/55'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className='absolute -left-1 -top-1 h-2 w-2 bg-neutral-200 dark:bg-xuba-green-500/55'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className='absolute -right-1 -top-1 h-2 w-2 bg-neutral-200 dark:bg-xuba-green-500/55'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className='absolute -bottom-1 -left-1 h-2 w-2 bg-neutral-200 dark:bg-xuba-green-500/55'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className='absolute -bottom-1 -right-1 h-2 w-2 bg-neutral-200 dark:bg-xuba-green-500/55'
        />
      </motion.div>
      {children}
    </div>
  )
}

// Skeletons

const SkeletonContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      {...props}
      className={cn(
        'relative flex h-14 w-full items-center justify-center rounded-lg bg-linear-to-b from-white to-white p-2 shadow-lg md:h-40 dark:from-neutral-800 dark:to-neutral-700',
        props.className
      )}
    >
      {children}
    </motion.div>
  )
}

export const SkeletonOne = () => {
  const [gradient1Duration] = useState(() => Math.random() * (7 - 2) + 2)
  const [gradient2Duration] = useState(() => Math.random() * (7 - 2) + 2)

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <svg
        width='128'
        height='69'
        viewBox='0 0 128 69'
        fill='none'
        className='absolute -top-2 left-1/2 -translate-x-[90%] text-neutral-200 dark:text-neutral-800'
      >
        <path
          d='M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75'
          stroke='currentColor'
          strokeWidth='1'
        />
        <motion.path
          d='M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75'
          stroke='url(#gradient-2)'
          strokeWidth='1'
        />

        <defs>
          <motion.linearGradient
            initial={{ x1: '0%', y1: '0%', x2: '0%', y2: '0%' }}
            animate={{ x1: '100%', y1: '90%', x2: '120%', y2: '120%' }}
            id='gradient-2'
            transition={{
              duration: gradient2Duration,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <stop stopColor='#b8d02f' stopOpacity={`0`} />
            <stop offset='1' stopColor='#b8d02f' />
            <stop offset='1' stopColor='#b8d02f' stopOpacity='0' />
          </motion.linearGradient>
        </defs>
      </svg>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='62'
        height='105'
        viewBox='0 0 62 105'
        fill='none'
        className='absolute -bottom-2 left-1/2 translate-x-0 text-neutral-200 dark:text-neutral-800'
      >
        <path
          d='M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105'
          stroke='currentColor'
          strokeWidth='1'
        />
        <motion.path
          d='M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105'
          stroke='url(#gradient-1)'
          strokeWidth='1'
        />
        <defs>
          <motion.linearGradient
            initial={{ x1: '0%', y1: '0%', x2: '0%', y2: '0%' }}
            animate={{ x1: '100%', y1: '90%', x2: '120%', y2: '120%' }}
            id='gradient-1'
            transition={{
              duration: gradient1Duration,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <stop stopColor='#b8d02f' stopOpacity={`0`} />
            <stop offset='1' stopColor='#b8d02f' />
            <stop offset='1' stopColor='#b8d02f' stopOpacity='0' />
          </motion.linearGradient>
        </defs>
      </svg>
      <div className='relative z-30 mx-auto grid w-full max-w-lg grid-cols-1 gap-4 p-8 perspective-[1000px] transform-3d sm:p-0 md:grid-cols-3'>
        <SkeletonContainer
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 6,
          }}
          className='flex-col items-start justify-center overflow-hidden px-2 font-mono text-neutral-800 dark:text-neutral-300'
        >
          <p className='bg-transparent text-[8px]'>git add .</p>
          <p className='bg-transparent text-[8px]'>
            git commit -m &quot;update&quot;
          </p>
          <p className='bg-transparent text-[8px]'>git push</p>
        </SkeletonContainer>
        <SkeletonContainer
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            delay: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 6,
          }}
        >
          <GitHubLogo />
        </SkeletonContainer>
        <SkeletonContainer
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            delay: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 6,
          }}
          className='flex flex-col items-center justify-center'
        >
          <AWSLogo />
          <p className='bg-transparent text-[8px]'>your site is live ✨</p>
        </SkeletonContainer>
      </div>
    </div>
  )
}

const GitHubLogo = () => {
  return (
    <svg
      width='800px'
      height='800px'
      viewBox='0 0 20 20'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className='h-8 w-8 object-contain text-black dark:text-white'
    >
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g
          id='Dribbble-Light-Preview'
          transform='translate(-140.000000, -7559.000000)'
          fill='currentColor'
        >
          <g id='icons' transform='translate(56.000000, 160.000000)'>
            <path
              d='M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399'
              id='github-[#142]'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
const AWSLogo = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 48 48'
      width='48px'
      height='48px'
      className='h-8 w-8 object-contain text-black dark:text-white'
    >
      <path
        fill='currentColor'
        d='M13.527,21.529c0,0.597,0.064,1.08,0.176,1.435c0.128,0.355,0.287,0.742,0.511,1.161 c0.08,0.129,0.112,0.258,0.112,0.371c0,0.161-0.096,0.322-0.303,0.484l-1.006,0.677c-0.144,0.097-0.287,0.145-0.415,0.145 c-0.16,0-0.319-0.081-0.479-0.226c-0.224-0.242-0.415-0.5-0.575-0.758c-0.16-0.274-0.319-0.58-0.495-0.951 c-1.245,1.483-2.81,2.225-4.694,2.225c-1.341,0-2.411-0.387-3.193-1.161s-1.181-1.806-1.181-3.096c0-1.37,0.479-2.483,1.453-3.321 s2.267-1.258,3.911-1.258c0.543,0,1.102,0.048,1.692,0.129s1.197,0.21,1.836,0.355v-1.177c0-1.225-0.255-2.08-0.75-2.58 c-0.511-0.5-1.373-0.742-2.602-0.742c-0.559,0-1.133,0.064-1.724,0.21c-0.591,0.145-1.165,0.322-1.724,0.548 c-0.255,0.113-0.447,0.177-0.559,0.21c-0.112,0.032-0.192,0.048-0.255,0.048c-0.224,0-0.335-0.161-0.335-0.5v-0.79 c0-0.258,0.032-0.451,0.112-0.564c0.08-0.113,0.224-0.226,0.447-0.339c0.559-0.29,1.229-0.532,2.012-0.726 c0.782-0.21,1.612-0.306,2.49-0.306c1.9,0,3.289,0.435,4.183,1.306c0.878,0.871,1.325,2.193,1.325,3.966v5.224H13.527z M7.045,23.979c0.527,0,1.07-0.097,1.644-0.29c0.575-0.193,1.086-0.548,1.517-1.032c0.255-0.306,0.447-0.645,0.543-1.032 c0.096-0.387,0.16-0.855,0.16-1.403v-0.677c-0.463-0.113-0.958-0.21-1.469-0.274c-0.511-0.064-1.006-0.097-1.501-0.097 c-1.07,0-1.852,0.21-2.379,0.645s-0.782,1.048-0.782,1.854c0,0.758,0.192,1.322,0.591,1.709 C5.752,23.786,6.311,23.979,7.045,23.979z M19.865,25.721c-0.287,0-0.479-0.048-0.607-0.161c-0.128-0.097-0.239-0.322-0.335-0.629 l-3.752-12.463c-0.096-0.322-0.144-0.532-0.144-0.645c0-0.258,0.128-0.403,0.383-0.403h1.565c0.303,0,0.511,0.048,0.623,0.161 c0.128,0.097,0.223,0.322,0.319,0.629l2.682,10.674l2.49-10.674c0.08-0.322,0.176-0.532,0.303-0.629 c0.128-0.097,0.351-0.161,0.639-0.161h1.277c0.303,0,0.511,0.048,0.639,0.161c0.128,0.097,0.239,0.322,0.303,0.629l2.522,10.803 l2.762-10.803c0.096-0.322,0.208-0.532,0.319-0.629c0.128-0.097,0.335-0.161,0.623-0.161h1.485c0.255,0,0.399,0.129,0.399,0.403 c0,0.081-0.016,0.161-0.032,0.258s-0.048,0.226-0.112,0.403l-3.847,12.463c-0.096,0.322-0.208,0.532-0.335,0.629 s-0.335,0.161-0.607,0.161h-1.373c-0.303,0-0.511-0.048-0.639-0.161c-0.128-0.113-0.239-0.322-0.303-0.645l-2.474-10.4 L22.18,24.915c-0.08,0.322-0.176,0.532-0.303,0.645c-0.128,0.113-0.351,0.161-0.639,0.161H19.865z M40.379,26.156 c-0.83,0-1.66-0.097-2.458-0.29c-0.798-0.193-1.421-0.403-1.836-0.645c-0.255-0.145-0.431-0.306-0.495-0.451 c-0.064-0.145-0.096-0.306-0.096-0.451v-0.822c0-0.339,0.128-0.5,0.367-0.5c0.096,0,0.192,0.016,0.287,0.048 c0.096,0.032,0.239,0.097,0.399,0.161c0.543,0.242,1.133,0.435,1.756,0.564c0.639,0.129,1.261,0.193,1.9,0.193 c1.006,0,1.788-0.177,2.331-0.532c0.543-0.355,0.83-0.871,0.83-1.532c0-0.451-0.144-0.822-0.431-1.129 c-0.287-0.306-0.83-0.58-1.612-0.838l-2.315-0.726c-1.165-0.371-2.027-0.919-2.554-1.645c-0.527-0.709-0.798-1.499-0.798-2.338 c0-0.677,0.144-1.274,0.431-1.79s0.671-0.967,1.149-1.322c0.479-0.371,1.022-0.645,1.66-0.838C39.533,11.081,40.203,11,40.906,11 c0.351,0,0.718,0.016,1.07,0.064c0.367,0.048,0.702,0.113,1.038,0.177c0.319,0.081,0.623,0.161,0.91,0.258s0.511,0.193,0.671,0.29 c0.224,0.129,0.383,0.258,0.479,0.403c0.096,0.129,0.144,0.306,0.144,0.532v0.758c0,0.339-0.128,0.516-0.367,0.516 c-0.128,0-0.335-0.064-0.607-0.193c-0.91-0.419-1.932-0.629-3.065-0.629c-0.91,0-1.628,0.145-2.123,0.451 c-0.495,0.306-0.75,0.774-0.75,1.435c0,0.451,0.16,0.838,0.479,1.145c0.319,0.306,0.91,0.613,1.756,0.887l2.267,0.726 c1.149,0.371,1.98,0.887,2.474,1.548s0.734,1.419,0.734,2.257c0,0.693-0.144,1.322-0.415,1.87 c-0.287,0.548-0.671,1.032-1.165,1.419c-0.495,0.403-1.086,0.693-1.772,0.903C41.943,26.043,41.193,26.156,40.379,26.156z'
      />
      <path
        fill='#f90'
        d='M43.396,33.992c-5.252,3.918-12.883,5.998-19.445,5.998c-9.195,0-17.481-3.434-23.739-9.142 c-0.495-0.451-0.048-1.064,0.543-0.709c6.769,3.966,15.118,6.369,23.755,6.369c5.827,0,12.229-1.225,18.119-3.741 C43.508,32.364,44.258,33.347,43.396,33.992z M45.583,31.477c-0.671-0.871-4.438-0.419-6.146-0.21 c-0.511,0.064-0.591-0.387-0.128-0.726c3.001-2.128,7.934-1.516,8.509-0.806c0.575,0.726-0.16,5.708-2.969,8.094 c-0.431,0.371-0.846,0.177-0.655-0.306C44.833,35.927,46.254,32.331,45.583,31.477z'
      />
    </svg>
  )
}

export const SkeletonTwo = () => {
  return (
    <div className='relative mt-10 flex h-60 flex-col items-center bg-transparent md:h-60 dark:bg-transparent'>
      <Globe className='absolute -bottom-80 right-0 md:-bottom-72 md:-right-10' />
    </div>
  )
}

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: -0.15,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1.0, 0.2, 0.8],
      markerColor: [0, 0, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi
        phi += 0.005
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
      className={className}
    />
  )
}

// Card structure
const CardSkeletonBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {children}
    </div>
  )
}

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('p-6', className)}>{children}</div>
}

const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h3
      className={cn(
        'text-lg font-medium tracking-tight text-neutral-700 dark:text-xuba-green-400',
        className
      )}
    >
      {children}
    </h3>
  )
}
const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p
      className={cn(
        'mt-2 max-w-md font-sans text-base font-normal tracking-tight text-neutral-500 dark:text-neutral-50',
        className
      )}
    >
      {children}
    </p>
  )
}

const Card = ({
  children,
  className,
  href,
  title,
}: {
  children: React.ReactNode
  href: string
  title: string
  className?: string
}) => {
  return (
    <motion.div
      whileHover='animate'
      className={cn(
        'group isolate relative flex flex-col overflow-hidden rounded-2xl dark:bg-xuba-purple-800/80 border border-xuba-purple-500/25 shadow-2xl hover:shadow-xuba-green-500/10 hover:border-xuba-green-500/30 hover:border transition-all duration-300 ease-in-out',
        className
      )}
    >
      {children}
      <div className='h-14 w-full border-t border-xuba-purple-500/45'>
        <Link
          href={href}
          className='group w-full h-14 rounded-none flex flex-row items-center justify-center gap-2 text-gray-50 cursor-pointer font-semibold tracking-tight hover:bg-xuba-purple-500/20 transition-all duration-300 ease-in-out shadow-2xl shadow-xuba-green-500/30'
        >
          Explore {title}
          <ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out text-xuba-green-400' />
        </Link>
      </div>
    </motion.div>
  )
}
