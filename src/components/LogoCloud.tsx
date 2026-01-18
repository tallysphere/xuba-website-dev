import Marquee from 'react-fast-marquee'
import Image from 'next/image'

export function LogoCloudMarquee() {
  const logos = [
    {
      name: 'Gamity',
      src: 'https://assets.aceternity.com/pro/logos/gamity.png',
    },
    {
      name: 'Host it',
      src: 'https://assets.aceternity.com/pro/logos/hostit.png',
    },
    {
      name: 'Asteroid Kit',
      src: 'https://assets.aceternity.com/pro/logos/asteroid-kit.png',
    },
    {
      name: 'Gamity 2',
      src: 'https://assets.aceternity.com/pro/logos/gamity.png',
    },
    {
      name: 'Host it 2',
      src: 'https://assets.aceternity.com/pro/logos/hostit.png',
    },
    {
      name: 'Asteroid Kit 2',
      src: 'https://assets.aceternity.com/pro/logos/asteroid-kit.png',
    },
  ]

  return (
    <div className='relative'>
      <p className='mt-4 text-center font-sans text-base text-neutral-700 dark:text-neutral-300'>
        Our Trusted Partners
      </p>

      <div className='relative mx-auto mt-4 flex h-24 w-full max-w-4xl flex-wrap justify-center gap-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:mt-2 md:gap-40'>
        <Marquee pauseOnHover direction='left' speed={30}>
          {logos.map((logo) => (
            <Image
              key={logo.name + 'second'}
              src={logo.src}
              alt={logo.name}
              width='100'
              height='100'
              className='mx-0 w-32 object-contain filter md:mx-10 md:w-40 dark:invert'
            />
          ))}
        </Marquee>
      </div>
    </div>
  )
}
