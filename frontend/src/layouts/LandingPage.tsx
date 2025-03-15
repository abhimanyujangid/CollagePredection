import HeroSection from '@/components/HeroSection'
import NavBar from '@/components/navBar/NavBar'
import { landingPageLinks } from '@/constant/data'

const LandingPage = () => {
  return (
    <div className='main-layout px-19'>
     <NavBar data={landingPageLinks} />
     <HeroSection />

     </div>
  )
}

export default LandingPage