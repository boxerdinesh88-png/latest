import { lazy, Suspense, useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider, useTheme } from './lib/theme'
import Cursor from './components/effects/Cursor'
import Particles from './components/effects/Particles'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/layout/Loader'
import { techMarquee } from './lib/data'

const AuroraBackground = lazy(() => import('./components/effects/AuroraBackground'))

const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Featured = lazy(() => import('./components/sections/Featured'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Split = lazy(() => import('./components/sections/Split'))
const Journey = lazy(() => import('./components/sections/Journey'))
const Services = lazy(() => import('./components/sections/Services'))
const Process = lazy(() => import('./components/sections/Process'))
const Contact = lazy(() => import('./components/sections/Contact'))

function LoaderProxy() {
  const { theme } = useTheme()
  return <Loader isLoading themeKey={theme} />
}

function Content() {
  return (
    <main className="relative">
      <Suspense fallback={<SectionFallback />}>
        <Hero />
        <About />
        <Skills />
        <Featured />
        <Projects />
        <Split />
        <Journey />
        <Services />
        <Process />
        <Contact />
      </Suspense>
    </main>
  )
}

function SectionFallback() {
  return <div className="h-[50vh] animate-pulse bg-base/50" aria-hidden="true" />
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.classList.add('custom-cursor-ready')
  }, [])

  return (
    <ThemeProvider>
      {loading && <LoaderProxy />}

      <Cursor />
      <Suspense fallback={null}>
        <AuroraBackground />
      </Suspense>
      <Particles />

      <ReactLenis root options={{ duration: 1.1, smoothWheel: true }}>
        <div className="relative min-h-screen overflow-x-clip">
          <Navbar />
          <Content />
          <Footer />

          {/* Tech marquee strip above footer */}
          <div className="relative overflow-hidden border-y border-ink/10 py-5" aria-hidden="true">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
              {[...Array(2)].flatMap((_, copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-10">
                  {techMarquee.map((t) => (
                    <span key={`${copy}-${t}`} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.3em] text-faint">
                      {t}
                      <span className="h-1.5 w-1.5 rounded-full bg-pink/50" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App