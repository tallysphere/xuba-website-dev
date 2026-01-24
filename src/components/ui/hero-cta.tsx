import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Props for the HeroCTA component.
 */
export interface HeroCTAProps {
  /** The URL to navigate to when clicked */
  href: string
  /** The text label displayed on the button */
  label: string
  /** Visual variant of the CTA button */
  variant?: 'primary' | 'secondary'
  /** Whether to show the arrow icon */
  showIcon?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * HeroCTA - A reusable call-to-action button for hero sections.
 *
 * Features an arrow icon that animates in on hover while keeping text centered.
 *
 * @example
 * <HeroCTA href="/contact" label="Get Started" variant="primary" />
 */
export function HeroCTA({
  href,
  label,
  variant = 'primary',
  showIcon = true,
  className,
}: HeroCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group', // Enable group hover
        // Base styles
        'relative flex items-center justify-center rounded-none border-2 px-3 py-4 text-center font-medium transition-all duration-300',
        // Hover & focus states
        'hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xuba-green-500 focus-visible:ring-offset-2',
        // Active state
        'active:scale-[0.98]',
        // Width based on variant
        variant === 'primary' ? 'w-64' : 'w-64 md:w-56',
        // Light theme styles
        'bg-xuba-green-50 border-xuba-green-500 text-xuba-green-800 shadow-lg',
        // Dark theme styles
        'dark:bg-transparent dark:border-white dark:text-white dark:shadow-xl',
        variant === 'primary'
          ? 'dark:shadow-xuba-purple-500/40'
          : 'dark:shadow-xuba-green-500/30',
        className
      )}
    >
      {/* Inner wrapper to keep text + arrow together and centered */}
      <span className='flex items-center gap-2'>
        <span className='text-lg font-medium tracking-tight whitespace-nowrap'>
          {label}
        </span>
        {showIcon && (
          <span className='w-0 overflow-hidden transition-all duration-300 group-hover:w-5'>
            <ArrowRightIcon
              className='h-5 w-5 text-xuba-green-500 dark:text-xuba-green-500'
              aria-hidden='true'
            />
          </span>
        )}
      </span>
    </Link>
  )
}
