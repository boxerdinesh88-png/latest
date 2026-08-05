import { useState, useEffect, lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import Loader from './components/layout/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import HeroSection from './components/sections/HeroSection'
import AuroraBackground from './components/effects/AuroraBackground'
import FloatingParticles from './components/effects/FloatingParticles'

const AboutSection = lazy(() => import('./components/sections/AboutSection'))
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'))
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'))
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'))
const EducationSection = lazy(() => import('./components/sections/EducationSection'))
const CertificationsSection = lazy(() => import('./components/sections/CertificationsSection'))
const ContactSection = lazy(() => import('./components/sections/ContactSection'))

function SectionFallback() {
  return <div className="min-h-[60vh] animate-pulse bg-primary" aria-hidden="true" />
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />

      <ReactLenis root>
        <div className="relative min-h-screen overflow-hidden bg-primary text-white selection:bg-accent/40 selection:text-white">
          <AuroraBackground />
          <FloatingParticles />
          <Navbar />

          <main className="relative z-10">
            <HeroSection />
            <Suspense fallback={<SectionFallback />}>
              <AboutSection />
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <EducationSection />
              <CertificationsSection />
              <ContactSection />
            </Suspense>
          </main>

          <Footer />
          <ScrollToTop />
        </div>
      </ReactLenis>
    </>
  )
}

export default App
