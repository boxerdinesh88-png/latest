import { useState, useEffect, lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import Loader, { INTRO_MS } from './components/layout/Loader'
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

  // Short branded intro: hide once fonts are ready and the intro has played
  // (INTRO_MS), but never hold the page back for more than 1.5s
  useEffect(() => {
    let done = false
    const hide = () => {
      if (!done) {
        done = true
        setIsLoading(false)
      }
    }
    const started = performance.now()
    const cap = setTimeout(hide, 1500)
    document.fonts?.ready.then(() => {
      setTimeout(hide, Math.max(0, INTRO_MS + 100 - (performance.now() - started)))
    })
    return () => clearTimeout(cap)
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
