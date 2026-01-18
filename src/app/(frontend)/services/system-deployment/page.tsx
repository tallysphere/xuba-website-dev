import { Spotlight } from '@/components/Spotlight'
import React from 'react'

const page = () => {
  return (
    <div className='relative w-full h-full flex flex-col items-center justify-center min-h-screen bg-xuba-purple-900'>
      <Spotlight />
      <div className='text-7xl font-light tracking-tight text-center text-xuba-green-500 mb-10'>
        System Deployment
      </div>
      <div className='text-lg text-center text-gray-300'>
        We offer a range of system deployment services to help you manage your
        IT infrastructure and data.
      </div>
    </div>
  )
}

export default page
