import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink, Mail, Download, Github, Linkedin, MapPin } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import RippleButton from '../ui/RippleButton'
import MagneticButton from '../ui/MagneticButton'

const roles = [
  'Full Stack Developer',
  'WordPress & Elementor Expert',
  'Python & Django Engineer',
  'React.js Developer',
]

const ease = [0.16, 1, 0.3, 1] as const

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1)
          setText(next)
          if (next === word) setTimeout(() => setDeleting(true), 1600)
        } else {
          const next = word.slice(0, text.length - 1)
          setText(next)
          if (next === '') {
            setDeleting(false)
            setIndex((i) => i + 1)
          }
        }
      },
      deleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return text
}

export default function HeroSection() {
  const { profile } = usePortfolio()
  const typed = useTypewriter(roles)

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const socials = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile.social.email}`, label: 'Email' },
  ]

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 lg:pt-28"
    >
      {/* Floating background shapes */}
      <div className="glow-orb top-[-10%] left-[-5%] h-[420px] w-[420px] bg-accent/25 animate-blob" />
      <div className="glow-orb bottom-[-15%] right-[-5%] h-[460px] w-[460px] bg-pink/20 animate-blob [animation-delay:3s]" />
      <div className="glow-orb top-1/3 left-1/2 h-[300px] w-[300px] bg-cyan/15 animate-blob [animation-delay:6s]" />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-px relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="badge-gradient"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[80px]"
            >
              Hi, I'm{' '}
              <span className="relative whitespace-nowrap">
                <span className="gradient-text-animated">Dinesh Kumar</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-pink/60"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C60 3 150 2 298 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-6 flex min-h-[32px] items-center gap-3 font-grotesk text-lg font-medium text-white sm:text-2xl"
            >
              <span className="h-6 w-1 rounded-full bg-gradient-to-b from-accent to-cyan" aria-hidden="true" />
              <span className="text-faint">&gt;</span> {typed}
              <span className="ml-0.5 inline-block h-6 w-[3px] animate-pulse bg-cyan" aria-hidden="true" />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-5 max-w-xl text-base leading-relaxed text-faint md:text-lg"
            >
              {profile.tagline}. I build scalable APIs, responsive UIs and custom WordPress
              solutions that deliver real business results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <RippleButton onClick={() => scrollTo('#projects')}>
                  <span className="flex items-center gap-2">
                    View My Work <ExternalLink size={15} />
                  </span>
                </RippleButton>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={profile.resumeUrl || '/DINESH-RESUME.pdf'}
                  download="Dinesh_Kumar_Resume.pdf"
                  className="btn-ghost"
                >
                  <Download size={15} /> Download Resume
                </a>
              </MagneticButton>
              <MagneticButton>
                <button onClick={() => scrollTo('#contact')} className="btn-ghost">
                  <Mail size={15} /> Contact Me
                </button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex items-center gap-3">
                {socials.map(
                  ({ icon: Icon, href, label }) =>
                    href && (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-faint transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan hover:shadow-glow-cyan"
                      >
                        <Icon size={18} />
                      </a>
                    ),
                )}
              </div>
              <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
              <p className="hidden items-center gap-1.5 text-sm text-faint sm:flex">
                <MapPin size={14} className="text-cyan" /> {profile.location}
              </p>
            </motion.div>
          </div>

          {/* Right profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-sm">
              {/* Rotating gradient ring */}
              <div
                className="absolute -inset-6 animate-spin-slow rounded-[36px] opacity-60"
                style={{
                  background:
                    'conic-gradient(from 0deg, #7C3AED, #EC4899, #06B6D4, #7C3AED)',
                  filter: 'blur(70px)',
                }}
                aria-hidden="true"
              />
              <div className="glass-card relative overflow-hidden rounded-[28px] p-2">
                <div className="relative overflow-hidden rounded-[22px] bg-surface">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    width={480}
                    height={480}
                    loading="eager"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-line bg-primary/70 px-5 py-4 backdrop-blur-xl">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
                      <p className="text-xs text-faint">{profile.role}</p>
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat chips */}
              <motion.div
                className="glass-strong absolute -left-8 top-10 hidden rounded-2xl px-5 py-3.5 md:block animate-float-slow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p className="font-display text-2xl font-bold gradient-text">2+</p>
                <p className="text-[11px] text-faint">Years Experience</p>
              </motion.div>
              <motion.div
                className="glass-strong absolute -right-6 top-1/3 hidden rounded-2xl px-5 py-3.5 md:block animate-float-slower"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <p className="font-display text-2xl font-bold gradient-text">15+</p>
                <p className="text-[11px] text-faint">Projects Delivered</p>
              </motion.div>
              <motion.div
                className="glass-strong absolute -bottom-5 right-8 hidden rounded-2xl px-5 py-3.5 md:block animate-float-slow [animation-delay:2s]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <p className="font-display text-2xl font-bold gradient-text">20+</p>
                <p className="text-[11px] text-faint">Technologies</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={16} className="text-cyan" />
        </motion.span>
      </motion.button>
    </section>
  )
}
