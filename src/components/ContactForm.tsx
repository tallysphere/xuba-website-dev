'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Turnstile } from '@marsidev/react-turnstile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightIcon, CheckCircleIcon, Loader2Icon } from 'lucide-react'
import { sendContactEmail } from '@/app/actions/send-contact-email'

// Zod validation schema
const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

type ContactFormProps = {
  submitButtonText?: string
  successTitle?: string
  successMessage?: string
  privacyText?: string
  privacyLinkText?: string
  privacyLinkUrl?: string
  privacyAfterText?: string
}

/**
 * Contact form component with validation and email submission.
 *
 * Features:
 * - Theme-aware styling (light and dark mode)
 * - Form validation with Zod
 * - Accessible form fields with proper labels
 * - Loading and success states
 * - CMS-driven text content
 */
export function ContactForm({
  submitButtonText = 'Send Message',
  successTitle = 'Message Sent!',
  successMessage = "Thank you for reaching out. We'll get back to you within 24 hours.",
  privacyText = 'By submitting this form, you agree to our',
  privacyLinkText = 'Privacy Policy',
  privacyLinkUrl = '/privacy',
  privacyAfterText = '. Your information will never be shared with third parties.',
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState<string | null>(null)
  // Key to force Turnstile remount/reset
  const [turnstileKey, setTurnstileKey] = useState(0)

  // Helper to reset Turnstile widget by changing its key
  const resetTurnstile = () => {
    setTurnstileKey((prev) => prev + 1)
    setTurnstileToken(null)
  }

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

    // Check for Turnstile token
    if (!turnstileToken) {
      setSubmitError('Please complete the security verification.')
      return
    }

    const result = await sendContactEmail({
      ...data,
      turnstileToken,
    })

    if (result.success) {
      setIsSubmitted(true)
      reset()
      // Reset Turnstile for potential future submissions
      resetTurnstile()
    } else {
      setSubmitError(result.error || 'Something went wrong. Please try again.')
      // Reset Turnstile on error so user can retry
      resetTurnstile()
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className='px-6 pt-0 pb-24 sm:pb-32 lg:px-8 lg:py-48'>
        <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg flex flex-col items-center justify-center text-center py-16'>
          <div className='w-20 h-20 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center mb-6'>
            <CheckCircleIcon
              className='w-10 h-10 text-gray-700 dark:text-white'
              aria-hidden='true'
            />
          </div>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-3'>
            {successTitle}
          </h3>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>
            {successMessage}
          </p>
          <Button
            type='button'
            onClick={() => setIsSubmitted(false)}
            className='rounded-none border-2 border-gray-600 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 transition-all duration-300 px-8 py-3
              dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white/10'
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
              className='block text-base font-medium text-gray-700 dark:text-gray-300 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors duration-200'
            >
              First name <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2.5'>
              <Input
                id='firstName'
                type='text'
                placeholder='John'
                autoComplete='given-name'
                {...register('firstName')}
                className={`block w-full h-12 rounded-none border dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:focus:border-white dark:focus:ring-white transition-all duration-200 ${
                  errors.firstName
                    ? 'border-red-500'
                    : 'border-gray-600 dark:border-white'
                }`}
              />
              {errors.firstName && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          {/* Last Name */}
          <div className='group'>
            <label
              htmlFor='lastName'
              className='block text-base font-medium text-gray-700 dark:text-gray-300 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors duration-200'
            >
              Last name <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2.5'>
              <Input
                id='lastName'
                type='text'
                placeholder='Doe'
                autoComplete='family-name'
                {...register('lastName')}
                className={`block w-full h-12 rounded-none border dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:focus:border-white dark:focus:ring-white transition-all duration-200 ${
                  errors.lastName
                    ? 'border-red-500'
                    : 'border-gray-600 dark:border-white'
                }`}
              />
              {errors.lastName && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className='sm:col-span-2 group'>
            <label
              htmlFor='email'
              className='block text-base font-medium text-gray-700 dark:text-gray-300 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors duration-200'
            >
              Email <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2.5'>
              <Input
                id='email'
                type='email'
                placeholder='john@example.com'
                autoComplete='email'
                {...register('email')}
                className={`block w-full h-12 rounded-none border dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:focus:border-white dark:focus:ring-white transition-all duration-200 ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-600 dark:border-white'
                }`}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className='sm:col-span-2 group'>
            <label
              htmlFor='phone'
              className='block text-base font-medium text-gray-700 dark:text-gray-300 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors duration-200'
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
                className='block w-full h-12 rounded-none border border-gray-600 dark:border-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:focus:border-white dark:focus:ring-white transition-all duration-200'
              />
            </div>
          </div>

          {/* Message */}
          <div className='sm:col-span-2 group'>
            <label
              htmlFor='message'
              className='block text-base font-medium text-gray-700 dark:text-gray-300 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors duration-200'
            >
              Message <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2.5'>
              <Textarea
                id='message'
                rows={4}
                placeholder='Tell us about your project...'
                {...register('message')}
                className={`block w-full h-32 rounded-none border dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:focus:border-white dark:focus:ring-white transition-all duration-200 resize-none ${
                  errors.message
                    ? 'border-red-500'
                    : 'border-gray-600 dark:border-white'
                }`}
              />
              {errors.message && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Turnstile Widget */}
        <div className='mt-6 flex justify-center'>
          <Turnstile
            key={turnstileKey}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => {
              setTurnstileToken(token)
              setTurnstileError(null)
            }}
            onError={() => {
              setTurnstileError(
                'Security verification failed. Please try again.'
              )
              setTurnstileToken(null)
            }}
            onExpire={() => {
              setTurnstileToken(null)
            }}
            options={{
              theme: 'auto',
            }}
          />
        </div>
        {turnstileError && (
          <p className='mt-2 text-sm text-red-500 dark:text-red-400 text-center'>
            {turnstileError}
          </p>
        )}

        {/* Error Message */}
        {submitError && (
          <div
            className='mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg'
            role='alert'
          >
            <p className='text-sm text-red-500 dark:text-red-400'>
              {submitError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className='mt-6'>
          <Button
            type='submit'
            disabled={isSubmitting || !turnstileToken}
            className='group relative cursor-pointer w-full rounded-none border-2 px-3 py-6 text-center font-medium transition-all duration-300
              hover:scale-105 active:scale-[0.98]
              bg-gray-100 border-gray-600 text-gray-700 shadow-lg
              dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl dark:shadow-xuba-purple-500/40
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            <span className='flex items-center justify-center gap-2'>
              {isSubmitting ? (
                <>
                  <Loader2Icon
                    className='w-5 h-5 animate-spin'
                    aria-hidden='true'
                  />
                  <span className='text-lg font-medium tracking-tight'>
                    Sending...
                  </span>
                </>
              ) : (
                <>
                  <span className='text-lg font-medium tracking-tight'>
                    {submitButtonText}
                  </span>
                  <span className='w-0 overflow-hidden transition-all duration-300 group-hover:w-5 group-disabled:group-hover:w-0'>
                    <ArrowRightIcon
                      className='h-5 w-5 text-gray-700 dark:text-white'
                      aria-hidden='true'
                    />
                  </span>
                </>
              )}
            </span>
          </Button>
        </div>

        {/* Privacy Note */}
        <p className='mt-4 text-sm text-gray-500 dark:text-gray-400 text-center'>
          {privacyText}{' '}
          <a
            href={privacyLinkUrl}
            className='text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white underline underline-offset-2'
          >
            {privacyLinkText}
          </a>
          {privacyAfterText}
        </p>
      </div>
    </form>
  )
}
