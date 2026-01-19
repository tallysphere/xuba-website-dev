'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightIcon } from 'lucide-react'

/**
 * Contact form component (Client Component for interactivity).
 * Form fields are hardcoded - only the surrounding text comes from Sanity.
 */
export function ContactForm() {
  return (
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
  )
}
