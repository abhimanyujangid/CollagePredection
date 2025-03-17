import HeroSection from '@/page/Landing/HeroSection'
import NavBar from '@/components/navBar/NavBar'
import { landingPageLinks } from '@/constant/data'
import FAQ from '@/page/Landing/FAQ'
import ContactUs from '@/page/Landing/ContaceUs'

const LandingPage = () => {
  return (
    <div className='main-layout px-19'>
     <NavBar data={landingPageLinks} />
     <main className='main-content w-full'>
     <HeroSection />
     <FAQ />
     <ContactUs />
     </main>
     </div>
  )
}

export default LandingPage