'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowRightIcon,
  Building2Icon,
  ClockIcon,
  MailIcon,
  PhoneCallIcon,
} from 'lucide-react'

export default function ContactPage() {
  return (
    <div className='relative isolate min-h-screen bg-xuba-purple-900 flex flex-col items-center justify-center md:py-0 py-32 overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-xuba-green-500/10 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-xuba-purple-500/20 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-xuba-green-500/5 rounded-full blur-3xl' />
      </div>

      {/* Header Section */}
      <div className='relative flex flex-col items-center justify-center'>
        <div className='text-xuba-green-500 text-sm font-medium tracking-[0.3em] mt-20 uppercase'>
          Get in Touch
        </div>
        <div className='text-white md:text-7xl text-5xl font-thin tracking-tight mt-4 text-center'>
          Contact{' '}
          <span className='text-xuba-green-500 drop-shadow-xl drop-shadow-xuba-green-500/10'>
            Us
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
        {/* Left Column - Contact Info */}
        <div className='relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48'>
          <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
            <h2 className='text-lg md:text-3xl font-light tracking-tight text-pretty text-white sm:text-3xl text-center md:text-start'>
              WE&apos;D LOVE TO HEAR FROM YOU
              <span className='block w-16 h-1 bg-xuba-green-500 mt-4 mx-auto md:mx-0' />
            </h2>
            <p className='mt-6 text-gray-300 text-base text-center md:text-start leading-relaxed'>
              In our world, we love clients who demand a premium product and
              service, who expect nothing but the best, refuse to cut corners
              and have an affinity for new perspective. If this sounds like you,
              we should meet.
            </p>

            {/* Contact Info Items */}
            <dl className='mt-10 space-y-6 text-base/7 text-gray-300'>
              <a
                href='https://maps.app.goo.gl/MdruTpLBcwko2yuV8'
                target='_blank'
                rel='noopener noreferrer'
                className='flex gap-x-4 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-white/5 group'
              >
                <dt className='flex-none'>
                  <span className='sr-only'>Address</span>
                  <div className='w-12 h-12 rounded-full bg-xuba-green-500/10 flex items-center justify-center group-hover:bg-xuba-green-500/20 transition-colors duration-300'>
                    <Building2Icon
                      aria-hidden='true'
                      className='h-6 w-6 text-xuba-green-500'
                    />
                  </div>
                </dt>
                <dd className='flex flex-col justify-center'>
                  <span className='text-xs text-gray-400 uppercase tracking-wide mb-1'>
                    Visit Us
                  </span>
                  <span className='text-white group-hover:text-xuba-green-400 transition-colors duration-300'>
                    15 King Street, Frankton, Hamilton, New Zealand
                  </span>
                </dd>
              </a>

              <a
                href='tel:0800332211'
                className='flex gap-x-4 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-white/5 group'
              >
                <dt className='flex-none'>
                  <span className='sr-only'>Telephone</span>
                  <div className='w-12 h-12 rounded-full bg-xuba-green-500/10 flex items-center justify-center group-hover:bg-xuba-green-500/20 transition-colors duration-300'>
                    <PhoneCallIcon
                      aria-hidden='true'
                      className='h-6 w-6 text-xuba-green-500'
                    />
                  </div>
                </dt>
                <dd className='flex flex-col justify-center'>
                  <span className='text-xs text-gray-400 uppercase tracking-wide mb-1'>
                    Call Us
                  </span>
                  <span className='text-white group-hover:text-xuba-green-400 transition-colors duration-300'>
                    0800 33 22 11
                  </span>
                </dd>
              </a>

              <a
                href='mailto:hello@xuba.co.nz'
                className='flex gap-x-4 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-white/5 group'
              >
                <dt className='flex-none'>
                  <span className='sr-only'>Email</span>
                  <div className='w-12 h-12 rounded-full bg-xuba-green-500/10 flex items-center justify-center group-hover:bg-xuba-green-500/20 transition-colors duration-300'>
                    <MailIcon
                      aria-hidden='true'
                      className='h-6 w-6 text-xuba-green-500'
                    />
                  </div>
                </dt>
                <dd className='flex flex-col justify-center'>
                  <span className='text-xs text-gray-400 uppercase tracking-wide mb-1'>
                    Email Us
                  </span>
                  <span className='text-white group-hover:text-xuba-green-400 transition-colors duration-300'>
                    hello@xuba.co.nz
                  </span>
                </dd>
              </a>
            </dl>

            {/* Response Time */}
            <div className='mt-10 flex items-center gap-3 text-gray-400'>
              <ClockIcon className='w-5 h-5 text-xuba-green-500' />
              <span className='text-sm'>
                We typically respond within 24 hours
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <form
          action='#'
          method='POST'
          className='px-6 pt-0 pb-24 sm:pb-32 lg:px-8 lg:py-48'
        >
          <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
              <div className='group'>
                <label
                  htmlFor='first-name'
                  className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
                >
                  First name <span className='text-xuba-green-500'>*</span>
                </label>
                <div className='mt-2.5'>
                  <Input
                    id='first-name'
                    name='first-name'
                    type='text'
                    placeholder='John'
                    autoComplete='given-name'
                    required
                    className='block w-full h-12 rounded-none border border-xuba-purple-700 bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200'
                  />
                </div>
              </div>
              <div className='group'>
                <label
                  htmlFor='last-name'
                  className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
                >
                  Last name <span className='text-xuba-green-500'>*</span>
                </label>
                <div className='mt-2.5'>
                  <Input
                    id='last-name'
                    name='last-name'
                    type='text'
                    placeholder='Doe'
                    autoComplete='family-name'
                    required
                    className='block w-full h-12 rounded-none border border-xuba-purple-700 bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200'
                  />
                </div>
              </div>
              <div className='sm:col-span-2 group'>
                <label
                  htmlFor='email'
                  className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
                >
                  Email <span className='text-xuba-green-500'>*</span>
                </label>
                <div className='mt-2.5'>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='john@example.com'
                    autoComplete='email'
                    required
                    className='block w-full h-12 rounded-none border border-xuba-purple-700 bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200'
                  />
                </div>
              </div>
              <div className='sm:col-span-2 group'>
                <label
                  htmlFor='phone-number'
                  className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
                >
                  Phone number
                </label>
                <div className='mt-2.5'>
                  <Input
                    id='phone-number'
                    name='phone-number'
                    type='tel'
                    placeholder='+64 21 123 4567'
                    autoComplete='tel'
                    className='block w-full h-12 rounded-none border border-xuba-purple-700 bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200'
                  />
                </div>
              </div>
              <div className='sm:col-span-2 group'>
                <label
                  htmlFor='message'
                  className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
                >
                  Message <span className='text-xuba-green-500'>*</span>
                </label>
                <div className='mt-2.5'>
                  <Textarea
                    id='message'
                    name='message'
                    rows={4}
                    placeholder='Tell us about your project...'
                    required
                    className='block w-full h-32 rounded-none border border-xuba-purple-700 bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200 resize-none'
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='mt-10'>
              <Button
                type='submit'
                className='relative cursor-pointer w-full rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-3 py-7 shadow-lg dark:shadow-xl dark:shadow-xuba-green-500/30'
              >
                <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center gap-2'>
                  Send Message <ArrowRightIcon className='w-6 h-6' />
                </div>
              </Button>
            </div>

            {/* Privacy Note */}
            <p className='mt-4 text-xs text-gray-400 text-center'>
              By submitting this form, you agree to our{' '}
              <a
                href='/privacy'
                className='text-xuba-green-400 hover:text-xuba-green-300 underline underline-offset-2'
              >
                Privacy Policy
              </a>
              . Your information will never be shared with third parties.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
