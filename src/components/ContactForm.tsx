'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightIcon, CheckCircleIcon, Loader2Icon } from 'lucide-react'
import { sendContactEmail } from '@/app/actions/send-contact-email'

// Zod validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * Contact form component with validation and email submission.
 */
export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null)
    
    const result = await sendContactEmail(data)
    
    if (result.success) {
      setIsSubmitted(true)
      reset()
    } else {
      setSubmitError(result.error || 'Something went wrong. Please try again.')
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className='px-6 pt-0 pb-24 sm:pb-32 lg:px-8 lg:py-48'>
        <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg flex flex-col items-center justify-center text-center py-16'>
          <div className='w-20 h-20 rounded-full bg-xuba-green-500/20 flex items-center justify-center mb-6'>
            <CheckCircleIcon className='w-10 h-10 text-xuba-green-500' />
          </div>
          <h3 className='text-2xl font-semibold text-white mb-3'>Message Sent!</h3>
          <p className='text-gray-400 mb-8'>
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
          <Button
            type='button'
            onClick={() => setIsSubmitted(false)}
            className='rounded-none border-2 border-xuba-green-500 bg-transparent text-xuba-green-500 hover:bg-xuba-green-500 hover:text-white transition-all duration-300 px-8 py-3'
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='px-6 pt-0 pb-24 sm:pb-32 lg:px-8 lg:py-48'
    >
      <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          {/* First Name */}
          <div className='group'>
            <label
              htmlFor='firstName'
              className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
            >
              First name <span className='text-xuba-green-500'>*</span>
            </label>
            <div className='mt-2.5'>
              <Input
                id='firstName'
                type='text'
                placeholder='John'
                autoComplete='given-name'
                {...register('firstName')}
                className={`block w-full h-12 rounded-none border bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200 ${
                  errors.firstName ? 'border-red-500' : 'border-xuba-purple-700'
                }`}
              />
              {errors.firstName && (
                <p className='mt-1 text-sm text-red-400'>{errors.firstName.message}</p>
              )}
            </div>
          </div>

          {/* Last Name */}
          <div className='group'>
            <label
              htmlFor='lastName'
              className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
            >
              Last name <span className='text-xuba-green-500'>*</span>
            </label>
            <div className='mt-2.5'>
              <Input
                id='lastName'
                type='text'
                placeholder='Doe'
                autoComplete='family-name'
                {...register('lastName')}
                className={`block w-full h-12 rounded-none border bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200 ${
                  errors.lastName ? 'border-red-500' : 'border-xuba-purple-700'
                }`}
              />
              {errors.lastName && (
                <p className='mt-1 text-sm text-red-400'>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
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
                type='email'
                placeholder='john@example.com'
                autoComplete='email'
                {...register('email')}
                className={`block w-full h-12 rounded-none border bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-xuba-purple-700'
                }`}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-400'>{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className='sm:col-span-2 group'>
            <label
              htmlFor='phone'
              className='block text-sm/6 font-medium text-gray-300 group-focus-within:text-xuba-green-400 transition-colors duration-200'
            >
              Phone number
            </label>
            <div className='mt-2.5'>
              <Input
                id='phone'
                type='tel'
                placeholder='+64 21 123 4567'
                autoComplete='tel'
                {...register('phone')}
                className='block w-full h-12 rounded-none border border-xuba-purple-700 bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200'
              />
            </div>
          </div>

          {/* Message */}
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
                rows={4}
                placeholder='Tell us about your project...'
                {...register('message')}
                className={`block w-full h-32 rounded-none border bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 transition-all duration-200 resize-none ${
                  errors.message ? 'border-red-500' : 'border-xuba-purple-700'
                }`}
              />
              {errors.message && (
                <p className='mt-1 text-sm text-red-400'>{errors.message.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className='mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg'>
            <p className='text-sm text-red-400'>{submitError}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className='mt-10'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='relative cursor-pointer w-full rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-transparent border-gray-600 dark:border-white text-center text-sm text-gray-800 dark:text-white font-medium px-3 py-7 shadow-lg dark:shadow-xl dark:shadow-xuba-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            <div className='text-gray-700 dark:text-white font-semibold text-lg text-nowrap tracking-tight flex items-center justify-center gap-2'>
              {isSubmitting ? (
                <>
                  <Loader2Icon className='w-6 h-6 animate-spin' />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <ArrowRightIcon className='w-6 h-6' />
                </>
              )}
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
