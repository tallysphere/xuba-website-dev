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
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-lg',
      'border border-white/5 bg-white/0.02',
      'hover:border-xuba-green-500/30 hover:bg-white/0.04',
      'transition-all duration-300',
      className
    )}
    {...props}
  >
    <div className='absolute inset-0 overflow-hidden'>{background}</div>
    <div className='relative z-10 flex h-full flex-col justify-end p-6'>
      <div className='flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-2'>
        <Icon className='h-10 w-10 text-white/60 group-hover:text-xuba-green-400 transition-colors duration-300' />
        <h3 className='text-xl font-light tracking-tight text-white group-hover:text-xuba-green-400 transition-colors duration-300'>
          {name}
        </h3>
        <p className='text-sm text-white/50 font-light'>{description}</p>
      </div>
    </div>
    <div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-xuba-green-500/[0.03]' />
  </div>
)

export { BentoCard, BentoGrid }
