import React from 'react'
import HomeNavbar from '../components/Home-components/HomeNavbar'
import HomeHero from '../components/Home-components/HomeHero'
import VoiceOfOurLeaners from '../components/Home-components/VoiceOfOurLeaners'
import CareerFeatures from '../components/Home-components/CareerFeatures'
import AreYouAnOrganization from '../components/Home-components/AreYouAnOrganization'
import HomeFaqSection from '../components/Home-components/HomeFaqSection'
import FeaturedCourses from '../components/Home-components/FeaturedCourses'
import WhatMakesHighrrDifferent from '../components/Home-components/WhatMakesHighrrDifferent'

function Home() {
  return (
    <div className='overflow-x-hidden'>
      <HomeNavbar />
      <HomeHero />
      <FeaturedCourses />
      <WhatMakesHighrrDifferent />
      <VoiceOfOurLeaners />
      <CareerFeatures />
      <AreYouAnOrganization />
      <HomeFaqSection />
    </div>
  )
}

export default Home
