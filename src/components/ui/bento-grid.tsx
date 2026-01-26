import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string
  className?: string
  background?: ReactNode
  Icon: React.ElementType
  description: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[18rem] grid-cols-3 gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      'group relative col-span-3 flex flex-col overflow-hidden rounded-none',
      'border border-xuba-green-200 dark:border-white/5',
      'bg-xuba-green-50/30 dark:bg-white/2',
      'hover:border-xuba-green-400 dark:hover:border-xuba-green-500/30',
      'hover:bg-xuba-green-50/50 dark:hover:bg-white/4',
      'transition-all duration-300',
      className
    )}
    {...props}
  >
    {/* Background element */}
    <div className="absolute inset-0 overflow-hidden">{background}</div>

    {/* Content pushed to bottom */}
    <div className="relative z-10 flex h-full flex-col justify-end p-6">
      <div className="flex transform-gpu flex-col gap-2 transition-all duration-300 group-hover:-translate-y-2">
        <Icon className="h-8 w-8 text-xuba-green-600 dark:text-white/60 group-hover:text-xuba-green-500 dark:group-hover:text-xuba-green-400 transition-colors duration-300 mb-2" />
        <h3 className="text-xl font-light tracking-tight text-xuba-green-900 dark:text-white group-hover:text-xuba-green-700 dark:group-hover:text-xuba-green-400 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-xuba-green-700 dark:text-white/50 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>

    {/* Hover overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-xuba-green-500/3" />
  </div>
)

export { BentoCard, BentoGrid }
