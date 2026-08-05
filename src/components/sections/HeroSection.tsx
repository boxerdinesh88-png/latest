import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink, Mail } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import RippleButton from '../ui/RippleButton'
import MagneticButton from '../ui/MagneticButton'
import SplitText from '../animations/SplitText'

export default function HeroSection() {
  const { profile } = usePortfolio()
  const [roleIndex, setRoleIndex] = useState(0)

  const roles = [
    'Full Stack Python Developer',
    'React.js Engineer',
    'Django REST Architect',
    'Creative Frontend Developer',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-primary pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-foreground/60 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for projects
          </motion.div>

          {/* Name */}
          <SplitText
            text={profile.name}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-4"
            delay={0.1}
          />

          {/* Role typewriter */}
          <motion.div
            className="h-12 md:h-14 flex items-center justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="text-xl md:text-2xl lg:text-3xl text-foreground/60 font-light">
              {profile.tagline.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="gradient-text font-medium relative">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-foreground/40 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {profile.bio.split('.')[0]}.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <MagneticButton>
              <RippleButton
                variant="primary"
                className="text-base px-8 py-4"
                onClick={() => scrollTo('#projects')}
              >
                <span className="flex items-center gap-2">
                  View My Work <ExternalLink size={16} />
                </span>
              </RippleButton>
            </MagneticButton>
            <MagneticButton>
              <button
                onClick={() => scrollTo('#contact')}
                className="text-base px-8 py-4 rounded-full glass glass-hover text-foreground/80 hover:text-foreground transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Mail size={16} /> Get in Touch
                </span>
              </button>
            </MagneticButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              onClick={() => scrollTo('#about')}
              className="flex flex-col items-center gap-2 text-foreground/30 hover:text-foreground/60 transition-colors"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
              <ArrowDown size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
