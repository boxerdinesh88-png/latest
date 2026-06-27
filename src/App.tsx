import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ServicesSection from './components/ServicesSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import WhyHireMeSection from './components/WhyHireMeSection'

import EducationSection from './components/EducationSection'
import CertificationsSection from './components/CertificationsSection'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

const SectionFallback = () => null

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  // Entrance loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <>
      {/* Dynamic System Initializer Loader */}
      <Loader isLoading={isLoading} />

      <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
        <div className="min-h-screen bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-slate-100 selection:bg-purple-500 selection:text-white">
          <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
          
          <ErrorBoundary fallback={<SectionFallback />} showError>
            <HeroSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <StatsSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <AboutSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <SkillsSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <ServicesSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <ExperienceSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <ProjectsSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <WhyHireMeSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <EducationSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <CertificationsSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <AchievementsSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <ContactSection />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={<SectionFallback />}>
            <Footer />
          </ErrorBoundary>
          
          <ScrollToTop />
        </div>
      </div>
    </>
  )
}

export default App
