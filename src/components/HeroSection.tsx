import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ExternalLink, Download } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import ParticleLines from './ParticleLines'

const roles = [
  'Full Stack Python Developer',
  'Django REST API Specialist',
  'React & UI/UX Engineer',
  'Cloud & Database Architect',
]

function GlowingOrb({ color, size, x, y, delay, duration, index }: { color: string; size: string; x: string; y: string; delay: number; duration: number; index: number }) {
  const dirs = [
    { x: '', y: '' },
    { x: '', y: '-' },
    { x: '-', y: '' },
    { x: '-', y: '-' },
  ]
  const dir = dirs[index % dirs.length]
  return (
    <motion.div
      animate={{
        x: [x, `calc(${x} + ${dir.x}80px)`, x],
        y: [y, `calc(${y} + ${dir.y}60px)`, y],
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute rounded-full ${color} ${size} blur-[150px] pointer-events-none will-change-transform`}
      style={{ left: x, top: y }}
    />
  )
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return desktop
}

export default function HeroSection() {
  const portfolio = usePortfolio()
  const { profile } = portfolio
  const heroRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timer: ReturnType<typeof setTimeout>
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1))
      }, 35)
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1))
      }, 65)
    }
    if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setRoleIndex(prev => (prev + 1) % roles.length)
    }
    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, roleIndex])

  // Mouse glow - only on desktop
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const springGlowX = useSpring(mouseX, { stiffness: 30, damping: 25 })
  const springGlowY = useSpring(mouseY, { stiffness: 30, damping: 25 })

  // Transform MUST be at top level (not inside conditional JSX)
  const glowX = useTransform(springGlowX, (v) => v - 400)
  const glowY = useTransform(springGlowY, (v) => v - 400)
  const glowX2 = useTransform(springGlowX, (v) => v - 250)
  const glowY2 = useTransform(springGlowY, (v) => v - 250)
  const glowX3 = useTransform(springGlowX, (v) => v - 100)
  const glowY3 = useTransform(springGlowY, (v) => v - 100)

  useEffect(() => {
    if (!isDesktop) return
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY, isDesktop])

  const fadeUp = (i: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 0.03, 0.26, 1] },
    },
  })

  if (!mounted) {
    return (
      <section id="home" className="relative w-full h-screen bg-[#0A1A0A] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="text-[10px] text-[#50B066]/80 font-semibold tracking-[0.15em] uppercase">Available for Freelance & Full-time</span>
          </div>
          <h1 className="text-[2rem] font-extrabold text-white mb-3 leading-[1.15]">
            <span className="font-extralight text-white/90">Hi, I'm </span>
            <span className="block sm:inline bg-gradient-to-r from-[#50B066] via-[#50B066] to-[#50B066] bg-clip-text text-transparent">Dinesh Kumar</span>
          </h1>
          <p className="text-base text-slate-400 font-mono">&gt; Full Stack Python Developer</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen md:h-screen overflow-hidden bg-[#0A1A0A] select-none scroll-mt-20 pb-20 md:pb-0"
    >
      {/* Mouse glow - desktop only */}
      {isDesktop && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 will-change-transform"
            style={{
              left: glowX,
              top: glowY,
              background: 'radial-gradient(circle at center, rgba(80,176,102,0.06) 0%, rgba(80,176,102,0.03) 30%, transparent 60%)',
            }}
          />
          <motion.div
            className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] will-change-transform"
            style={{
              left: glowX2,
              top: glowY2,
              background: 'radial-gradient(circle at center, rgba(80,176,102,0.08) 0%, rgba(80,176,102,0.04) 35%, transparent 65%)',
            }}
          />
          <motion.div
            className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-[1] will-change-transform"
            style={{
              left: glowX3,
              top: glowY3,
              background: 'radial-gradient(circle at center, rgba(80,176,102,0.12) 0%, transparent 50%)',
            }}
          />
        </>
      )}

      {/* Static ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(80,176,102,0.03) 0%, transparent 50%)',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient Orbs */}
      <GlowingOrb color="bg-[#50B066]" size="w-[600px] h-[600px]" x="-10%" y="-15%" delay={0} duration={18} index={0} />
      <GlowingOrb color="bg-[#50B066]" size="w-[450px] h-[450px]" x="75%" y="10%" delay={4} duration={22} index={1} />
      <GlowingOrb color="bg-[#50B066]" size="w-[400px] h-[400px]" x="50%" y="65%" delay={8} duration={16} index={2} />
      <GlowingOrb color="bg-[#50B066]" size="w-[350px] h-[350px]" x="20%" y="70%" delay={12} duration={20} index={3} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A0A]/20 via-transparent to-[#0A1A0A]/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A0A]/10 via-transparent to-[#0A1A0A]/10 z-[1]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Particle line network */}
      <ParticleLines />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1A0A] to-transparent z-[3]" />

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen md:h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 md:py-0">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Premium Badge */}
          <motion.div variants={fadeUp(0)} initial="hidden" animate="visible" className="mb-6 sm:mb-8 inline-block">
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
              <span className="flex items-center gap-1.5 sm:gap-2 text-[#50B066]/80 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-[#50B066] animate-ping opacity-75" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#50B066]" />
                </span>
                Available for Freelance & Full-time
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp(1)} initial="hidden" animate="visible">
            <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold tracking-[-0.03em] leading-[1.15] sm:leading-[1.1] mb-3 sm:mb-4">
              <span className="text-white/90 font-extralight">Hi, I'm </span>
              <span className="block sm:inline bg-gradient-to-r from-[#50B066] via-[#50B066] to-[#50B066] bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
          </motion.div>

          {/* Typing effect */}
          <motion.div variants={fadeUp(2)} initial="hidden" animate="visible" className="min-h-[40px] sm:min-h-[56px] mb-4 sm:mb-5">
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-mono font-medium tracking-wide">
              <span className="text-slate-600">&gt; </span>
              <span className="text-slate-200">{displayedText}</span>
              <span className="inline-block w-[2px] sm:w-[3px] h-[1em] sm:h-[1.1em] bg-[#50B066] ml-1 align-middle animate-pulse" />
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp(3)} initial="hidden" animate="visible" className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed font-light mb-8 sm:mb-12">
            {profile.bio}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp(4)} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center">
            <a href="#projects" className="group relative w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#50B066] to-[#50B066] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(80,176,102,0.2)] hover:shadow-[0_0_50px_rgba(80,176,102,0.4)] flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </a>
            <a href="#contact" className="group relative w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4 rounded-full border border-white/[0.12] hover:border-[#50B066]/40 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-xl bg-white/[0.02] flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <ExternalLink size={15} />
              </span>
            </a>
            <a href="/Dinesh_Kumar.pdf" download="Dinesh_Kumar_Resume.pdf" className="group relative w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4 rounded-full border border-cyan-400/20 hover:border-cyan-400/50 text-cyan-300 hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-xl bg-white/[0.02] flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <Download size={15} />
                Resume
              </span>
            </a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={fadeUp(5)} initial="hidden" animate="visible" className="mt-8 sm:mt-14 flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {[
              { label: 'Python', color: 'border-yellow-500/20 text-yellow-400/60' },
              { label: 'Django', color: 'border-[#50B066]/20 text-[#50B066]/60' },
              { label: 'React', color: 'border-cyan-500/20 text-cyan-400/60' },
              { label: 'MySQL', color: 'border-orange-500/20 text-orange-400/60' },
              { label: 'AWS', color: 'border-amber-500/20 text-amber-400/60' },
            ].map((tech) => (
              <span key={tech.label} className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-mono tracking-[0.15em] uppercase rounded-full bg-white/[0.03] border ${tech.color}`}>
                {tech.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}