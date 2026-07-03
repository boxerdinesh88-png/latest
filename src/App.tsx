import { useState, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import Loader from './components/layout/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import EducationSection from './components/sections/EducationSection'
import CertificationsSection from './components/sections/CertificationsSection'
import ContactSection from './components/sections/ContactSection'

import AuroraBackground from './components/effects/AuroraBackground'
import CursorFollower from './components/effects/CursorFollower'
import Spotlight from './components/effects/Spotlight'
import FloatingParticles from './components/effects/FloatingParticles'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />

      <ReactLenis root>
        <div className="relative min-h-screen bg-primary text-white selection:bg-accent/30 selection:text-white">
          <AuroraBackground />
          <Spotlight />
          <FloatingParticles />
          <CursorFollower />

          <Navbar />

          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <CertificationsSection />
            <ContactSection />
          </main>

          <Footer />
          <ScrollToTop />
        </div>
      </ReactLenis>
    </>
  )
}

export default App
