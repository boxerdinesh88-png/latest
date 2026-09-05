import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import HeroScene from '../three/HeroScene'
import Magnetic from '../ui/Magnetic'
import { socials } from '../../lib/data'
import { EASE } from '../animations/Reveal'

export default function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const srx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sry = useSpring(my, { stiffness: 60, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window
    mx.set((e.clientX / innerWidth - 0.5) * 12)
    my.set((e.clientY / innerHeight - 0.5) * 12)
  }

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-36"
    >
      {/* Big background typography */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none tracking-tighter text-ink/[0.035] dark:text-ink/[0.045]">
          DINESH
        </span>
      </div>

      <div className="container-px relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* ---------- Left: copy ---------- */}
          <div className="relative z-10 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-panel/50 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Available for selected projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
              className="mt-7 font-display text-[42px] font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-[68px]"
            >
              I Design.
              <br />
              I Build.
              <br />
              <span className="gradient-text">I Animate.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
              className="mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              Full-Stack Developer &amp; Graphic Designer crafting digital experiences where
              code, design and motion come together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.3} as="a" href="#work">
                <span className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white shadow-glow transition-transform duration-300 active:scale-95" style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)' }}>
                  View My Work
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Magnetic>
              <Magnetic strength={0.3} as="a" href="#contact">
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-panel/40 px-7 py-4 text-sm font-semibold text-ink backdrop-blur-xl transition-colors duration-300 hover:border-ink/30 dark:bg-line/10">
                  Let's Build Something
                  <Sparkles size={16} className="text-accent" />
                </span>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-panel/40 text-faint backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:text-accent"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                DESIGN / CODE / MOTION
              </span>
            </motion.div>
          </div>

          {/* ---------- Right: 3D scene ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            style={{ x: srx, y: sry }}
            className="relative lg:col-span-6"
          >
            {/* glow behind scene */}
            <div
              className="glow-orb absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-70"
              style={{ background: 'radial-gradient(circle,#7c3aed66,transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative aspect-square w-full sm:max-w-[520px] sm:mx-auto">
              <HeroScene className="h-full w-full" />

              {/* floating chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
                className="absolute left-1 top-6 flex items-center gap-2 rounded-2xl border border-ink/10 bg-panel/70 px-3.5 py-2.5 shadow-xl shadow-ink/5 backdrop-blur-xl"
                style={{ rotate: -4 }}
              >
                <span className="font-mono text-xs font-bold text-cyan">&gt;_</span>
                <span className="text-xs font-semibold text-ink">Running…</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
                className="absolute right-0 top-1/4 rounded-2xl border border-ink/10 bg-panel/70 px-3.5 py-2.5 shadow-xl shadow-ink/5 backdrop-blur-xl"
                style={{ rotate: 4 }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-pink" /> Design
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7, ease: EASE }}
                className="absolute bottom-10 left-6 rounded-2xl border border-ink/10 bg-panel/70 px-3.5 py-2.5 shadow-xl shadow-ink/5 backdrop-blur-xl"
                style={{ rotate: -2 }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Build
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.7, ease: EASE }}
                className="absolute bottom-4 right-8 rounded-2xl border border-ink/10 bg-panel/70 px-3.5 py-2.5 shadow-xl shadow-ink/5 backdrop-blur-xl"
                style={{ rotate: 3 }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-cyan" /> Motion
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-ink"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={15} className="text-accent" />
        </motion.span>
      </motion.button>
    </section>
  )
}