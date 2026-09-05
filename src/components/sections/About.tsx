import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { disciplines, type Discipline } from '../../lib/data'
import { SectionHeading, Stagger, StaggerItem } from '../animations/Reveal'
import { cn } from '../../lib/utils'

const ACCENTS: Record<Discipline['accent'], string> = {
  accent: 'text-accent border-accent/30 bg-accent/10',
  pink: 'text-pink border-pink/30 bg-pink/10',
  cyan: 'text-cyan border-cyan/30 bg-cyan/10',
}

const GLOW: Record<Discipline['accent'], string> = {
  accent: 'group-hover:shadow-[0_20px_60px_-15px_rgb(var(--accent)/0.45)]',
  pink: 'group-hover:shadow-[0_20px_60px_-15px_rgb(var(--pink)/0.45)]',
  cyan: 'group-hover:shadow-[0_20px_60px_-15px_rgb(var(--cyan)/0.45)]',
}

function DisciplineCard({ d, index }: { d: Discipline; index: number }) {
  return (
    <StaggerItem className="h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        data-cursor="explore"
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-panel/50 p-7 backdrop-blur-md transition-all duration-500 hover:border-ink/20 dark:bg-panel/40',
          GLOW[d.accent],
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px 200px at ${index % 2 === 0 ? '20%' : '80%'} 0%, rgb(var(--${d.accent}) / 0.1), transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div className="flex items-start justify-between">
          <span className="font-mono text-sm text-faint">/{d.index}</span>
          <span className="h-px flex-1 mx-4 mt-3 bg-gradient-to-r from-ink/15 to-transparent" aria-hidden="true" />
          <span className={cn('rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]', ACCENTS[d.accent])}>
            Discipline
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {d.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{d.blurb}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {d.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/8 bg-ink/[0.03] px-3 py-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-ink/15 dark:bg-line/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </StaggerItem>
  )
}

/** Animated "currently creating" indicator with cycling phrases. */
function CurrentlyCreating() {
  const phrases = [
    'a Django REST API for bookings',
    'an animated brand identity',
    'a 3D product experience',
    'pixel-perfect UI systems',
  ]
  const [i, setI] = useState(0)
  const [typing, setTyping] = useState('')

  useEffect(() => {
    const phrase = phrases[i]
    let char = 0
    const interval = setInterval(() => {
      char += 1
      setTyping(phrase.slice(0, char))
      if (char >= phrase.length) {
        clearInterval(interval)
        setTimeout(() => setI((v) => (v + 1) % phrases.length), 2400)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [i])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-panel/50 px-5 py-4 backdrop-blur-md"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Currently creating</span>
      <span className="font-mono text-sm font-medium text-ink">
        {typing}
        <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-accent align-middle" aria-hidden="true" />
      </span>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="About"
          title="One creator. Three crafts."
          description="I don't just write code or make designs — I build complete experiences, from the architecture under the hood to the pixels and motion on top."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" amount={0.15}>
          {disciplines.map((d, i) => (
            <DisciplineCard key={d.index} d={d} index={i} />
          ))}
        </Stagger>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <CurrentlyCreating />
          <p className="max-w-md text-sm leading-relaxed text-muted">
            I approach every project as a mix of <span className="font-semibold text-ink">engineering</span> and{' '}
            <span className="font-semibold text-ink">art direction</span> — fast on the backend,
            obsessive about the frontend.
          </p>
        </div>

        {/* services marquee strip */}
        <div className="relative mt-20 overflow-hidden border-y border-ink/10 py-5" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
            {[...Array(2)].flatMap((_, copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-12">
                {['FULL-STACK DEVELOPMENT', 'GRAPHIC DESIGN', 'MOTION & 3D', 'UI/UX', 'BRAND IDENTITY', 'INTERACTIVE EXPERIENCES'].map((t) => (
                  <span key={`${copy}-${t}`} className="flex items-center gap-12 font-display text-lg font-semibold uppercase tracking-wide text-faint">
                    {t}
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}