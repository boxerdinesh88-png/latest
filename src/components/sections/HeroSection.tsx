import { useEffect, useState, useMemo } from 'react'
import type { MouseEvent } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import { ArrowRight, Mail, Download, Github, Linkedin, MapPin, Sparkles } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import RippleButton from '../ui/RippleButton'
import MagneticButton from '../ui/MagneticButton'
import CountUp from '../ui/CountUp'
import { useSmoothScroll } from '../../lib/useSmoothScroll'

const roles = [
  'Full Stack Developer',
  'WordPress & Elementor Expert',
  'Python & Django Engineer',
  'React.js Developer',
]

const ease = [0.16, 1, 0.3, 1] as const

// Fine film grain that keeps large gradients from looking flat
const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function useRotatingWord(words: string[], interval = 2600) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return words[index]
}

// Headline words rise out of a blur, one after another
function RevealWords({
  text,
  delay = 0,
  className = '',
}: {
  text: string
  delay?: number
  className?: string
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: '100%', opacity: 0, filter: 'blur(12px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </>
  )
}

function CodeWindow() {
  return (
    <div className="w-[300px] rounded-2xl border border-line bg-surface/95 p-4 font-mono text-[11.5px] leading-[1.7] shadow-card-lg backdrop-blur-2xl">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-faint">dinesh.ts</span>
      </div>
      <p>
        <span className="text-accent">const</span> <span className="text-white">dinesh</span>{' '}
        <span className="text-faint">=</span> {'{'}
      </p>
      <p className="pl-4">
        <span className="text-cyan">stack</span>: [<span className="text-pink">'Python'</span>,{' '}
        <span className="text-pink">'Django'</span>, <span className="text-pink">'React'</span>],
      </p>
      <p className="pl-4">
        <span className="text-cyan">cms</span>: [<span className="text-pink">'WordPress'</span>,{' '}
        <span className="text-pink">'Elementor'</span>],
      </p>
      <p className="pl-4">
        <span className="text-cyan">shipsToProd</span>: <span className="text-accent">true</span>,
      </p>
      <p>
        {'}'}
        <span className="ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] animate-pulse bg-cyan" />
      </p>
    </div>
  )
}

export default function HeroSection() {
  const { profile, projects } = usePortfolio()
  const role = useRotatingWord(roles)

  const scrollTo = useSmoothScroll()

  // Pointer position within the hero (0..1), shared by the spotlight and the 3D card
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 80, damping: 20 })
  const sy = useSpring(py, { stiffness: 80, damping: 20 })
  const spotX = useTransform(sx, (v) => `${v * 100}%`)
  const spotY = useTransform(sy, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgb(124 58 237 / 0.12), transparent 70%)`
  const rotateX = useTransform(sy, [0, 1], [8, -8])
  const rotateY = useTransform(sx, [0, 1], [-10, 10])
  const nearX = useTransform(sx, [0, 1], [-18, 18])
  const nearY = useTransform(sy, [0, 1], [-14, 14])
  const farX = useTransform(sx, [0, 1], [10, -10])
  const farY = useTransform(sy, [0, 1], [8, -8])

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const socials = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile.social.email}`, label: 'Email' },
  ]

  const years = parseInt(profile.yearsOfExperience, 10) || 1
  const stats = [
    { value: years, suffix: '+', label: 'Years experience' },
    { value: projects.length, suffix: '+', label: 'Projects delivered' },
    { value: 20, suffix: '+', label: 'Technologies' },
  ]

  // Client work (live sites on their own domains) for the "trusted by" strip
  const clients = useMemo(
    () =>
      projects
        .filter(
          (p) =>
            p.link &&
            !/github\.io|pythonanywhere/.test(p.link) &&
            !/optimization/i.test(p.title),
        )
        .map((p) => p.title),
    [projects],
  )

  return (
    <section
      id="hero"
      onMouseMove={handleMove}
      className="relative flex min-h-screen flex-col overflow-hidden pt-28 lg:pt-32"
    >
      {/* ---------- Background layers ---------- */}
      <div className="glow-orb top-[-12%] left-[-8%] h-[520px] w-[520px] bg-accent/20 animate-blob" />
      <div className="glow-orb bottom-[-10%] right-[-8%] h-[520px] w-[520px] bg-pink/15 animate-blob [animation-delay:3s]" />
      <div className="glow-orb top-1/4 left-1/2 h-[340px] w-[340px] bg-cyan/15 animate-blob [animation-delay:6s]" />
      {/* Dot grid, faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--c-ink) / 0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent)',
        }}
        aria-hidden="true"
      />
      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
        aria-hidden="true"
      />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: noise }}
        aria-hidden="true"
      />

      {/* ---------- Content ---------- */}
      <div className="container-px relative z-10 flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-7">
            {/* Announcement pill */}
            <motion.button
              onClick={() => scrollTo('#contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-line bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-xs font-medium text-muted backdrop-blur-xl transition-colors hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/25 dark:text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Available
              </span>
              <span className="sm:hidden">Open to new roles</span>
              <span className="hidden sm:inline">Open to freelance & full-time roles</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"
                aria-hidden="true"
              />
            </motion.button>

            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[84px]">
              <RevealWords text="Hi, I'm" delay={0.15} />
              <br />
              <RevealWords text="Dinesh Kumar" delay={0.3} className="gradient-text-animated" />
            </h1>

            {/* Rotating role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="mt-5 flex items-center gap-3 font-grotesk text-xl font-medium text-white sm:text-2xl"
            >
              <span className="h-7 w-1 rounded-full bg-gradient-to-b from-accent to-cyan" aria-hidden="true" />
              <span className="relative inline-flex h-9 items-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={role}
                    initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.5, ease }}
                    className="whitespace-nowrap"
                  >
                    {role}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-faint md:text-lg"
            >
              I design and build fast, scalable web products — secure Django APIs, polished React
              interfaces and WordPress sites that clients can actually manage.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <RippleButton onClick={() => scrollTo('#projects')}>
                  <span className="flex items-center gap-2">
                    <Sparkles size={15} /> View My Work
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
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line py-5"
            >
              {stats.map((s) => (
                <div key={s.label} className="px-4 first:pl-0">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-white md:text-4xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-faint">{s.label}</dd>
                </div>
              ))}
            </motion.dl>

            {/* Socials + location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-7 flex flex-wrap items-center gap-5"
            >
              <div className="flex items-center gap-2.5">
                {socials.map(
                  ({ icon: Icon, href, label }) =>
                    href && (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-faint transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan"
                      >
                        <Icon size={17} />
                      </a>
                    ),
                )}
              </div>
              <p className="flex items-center gap-1.5 text-sm text-faint">
                <MapPin size={14} className="text-cyan" /> {profile.location}
              </p>
            </motion.div>
          </div>

          {/* Right: 3D portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="lg:col-span-5 [perspective:1400px]"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px]"
            >
              {/* Soft colour bloom behind the card */}
              <div
                className="absolute -inset-10 rounded-full opacity-50 blur-[80px]"
                style={{ background: 'conic-gradient(from 0deg, #7C3AED, #EC4899, #06B6D4, #7C3AED)' }}
                aria-hidden="true"
              />

              {/* Card with rotating gradient border */}
              <div className="relative overflow-hidden rounded-[30px] p-[1.5px] shadow-card-lg">
                <div
                  className="absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg, #7C3AED 60deg, #EC4899 120deg, #06B6D4 180deg, transparent 240deg)',
                  }}
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-[28.5px] bg-surface p-2">
                  <div className="relative overflow-hidden rounded-[22px]">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      width={480}
                      height={560}
                      loading="eager"
                      fetchPriority="high"
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-lg font-semibold text-[#fff]">{profile.name}</p>
                        <p className="truncate text-xs text-[#fff]/70">Associate Software Engineer</p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-400/20 px-3 py-1.5 text-[11px] font-semibold text-emerald-200 ring-1 ring-inset ring-emerald-300/40 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Open to Work
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating layers move at different depths with the cursor */}
              <motion.div
                style={{ x: nearX, y: nearY }}
                className="absolute -left-16 bottom-16 hidden md:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.7, ease }}
              >
                <CodeWindow />
              </motion.div>

              <motion.div
                style={{ x: farX, y: farY }}
                className="glass-strong absolute -right-8 top-10 hidden items-center gap-3 rounded-2xl px-4 py-3 md:flex"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7, ease }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-btn">
                  <Sparkles size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Energyforge</p>
                  <p className="text-[11px] text-faint">Currently building</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Trusted by strip ---------- */}
      {clients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="relative z-10 mt-16 border-t border-line py-7"
        >
          <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-faint">
            Trusted by growing businesses
          </p>
          <div className="group/row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-marquee group-hover/row:[animation-play-state:paused] [animation-duration:40s]">
              {[...clients, ...clients].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  aria-hidden={i >= clients.length ? true : undefined}
                  className="flex items-center whitespace-nowrap pr-12 font-display text-lg font-semibold text-faint/70 transition-colors duration-300 hover:text-white"
                >
                  <span className="mr-12 h-1.5 w-1.5 rounded-full bg-accent/40" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
