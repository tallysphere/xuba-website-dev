import React from 'react'
import SpotlightCard from './SpotlightCard/SpotlightCard'

const ServiceCard = () => {
  return (
    <SpotlightCard
      className='w-full max-w-2xl h-96 rounded-lg shadow-none hover:shadow-2xl hover:shadow-xuba-green-500/50 transition-all duration-300 '
      spotlightColor='rgba(184, 208, 47, 0.15)'
    >
      <div>
        <h1>Services</h1>
      </div>
    </SpotlightCard>
  )
}

export default ServiceCard
