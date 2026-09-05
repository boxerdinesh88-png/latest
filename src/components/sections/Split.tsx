import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { buildSide, designSide } from '../../lib/data'
import { SectionHeading, Stagger, StaggerItem } from '../animations/Reveal'

const PHASES = ['CODE', 'DESIGN', 'MOTION']

const FlowingDivider = lazy(() => import('../effects/FlowingDivider'))

function SplitSide({
  side,
  align,
}: {
  side: typeof buildSide
  align: 'left' | 'right'
}) {
  const Icon = side.icon
  return (
    <StaggerItem className="relative">
      <motion.div
        initial={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`relative overflow-hidden rounded-[28px] border p-8 sm:p-10 ${
          align === 'left'
            ? 'border-accent/20 bg-gradient-to-br from-accent/10 via-panel/50 to-transparent dark:from-accent/10'
            : 'border-pink/20 bg-gradient-to-br from-pink/10 via-panel/50 to-transparent dark:from-pink/10'
        } backdrop-blur-md`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              align === 'left' ? 'bg-accent/15 text-accent' : 'bg-pink/15 text-pink'
            }`}
          >
            <Icon size={22} />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">Side {align === 'left' ? 'A' : 'B'}</p>
            <h3 className="mt-0.5 font-display text-lg font-bold tracking-tight text-ink">{side.title}</h3>
          </div>
        </div>

        <ul className="mt-8 space-y-3">
          {side.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-3 rounded-xl border border-ink/8 bg-panel/40 px-4 py-3 transition-colors duration-300 hover:border-ink/20 dark:bg-line/5"
            >
              <span
                className={`font-mono text-xs ${align === 'left' ? 'text-accent' : 'text-pink'}`}
                style={{ minWidth: 22 }}
              >
                0{i + 1}
              </span>
              <span className="text-sm font-medium text-ink">{item}</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ink/15 transition-colors duration-300 group-hover:bg-accent" aria-hidden="true" />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </StaggerItem>
  )
}

function SplitDivider() {
  const [gpu, setGpu] = useState(false)

  useEffect(() => {
    setGpu(typeof window !== 'undefined' && 'gpu' in navigator)
  }, [])

  return (
    <div className="relative mt-16 overflow-hidden rounded-full border border-ink/10 bg-panel/40 py-4 backdrop-blur-md">
      {gpu && (
        <Suspense fallback={null}>
          <FlowingDivider />
        </Suspense>
      )}

      <div className="relative z-10 flex w-max animate-marquee items-center gap-10 px-6" style={{ animationDuration: '26s' }}>
        {[...Array(3)].flatMap((_, block) =>
          PHASES.flatMap((phase, i) => (
            <span key={`${block}-${phase}`} className="flex items-center gap-10">
              <span
                className={`font-display text-xl font-bold tracking-widest ${
                  i === 0 ? 'text-accent' : i === 1 ? 'text-pink' : 'text-cyan'
                }`}
              >
                {phase}
              </span>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                {[...Array(3)].map((_, d) => (
                  <span key={d} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                ))}
              </span>
            </span>
          )),
        )}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" aria-hidden="true" />
    </div>
  )
}

export default function Split() {
  return (
    <section id="split" className="relative section-pad">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="glow-orb left-[5%] top-[30%] h-[360px] w-[360px] bg-pink/10 dark:bg-pink/8" />
        <div className="glow-orb right-[5%] top-[10%] h-[360px] w-[360px] bg-cyan/10 dark:bg-cyan/8" />
      </div>

      <div className="container-px relative">
        <SectionHeading
          eyebrow="Two worlds, one maker"
          title="Where the build meets the aesthetic."
          description="Full-stack on one side, full-design on the other — one person holding both hands steady."
          align="center"
          className="mx-auto text-center"
        />

        <Stagger className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-10" amount={0.1}>
          <SplitSide side={buildSide} align="left" />
          <SplitSide side={designSide} align="right" />
        </Stagger>

        {/* Animated divider: CODE → DESIGN → MOTION */}
        <SplitDivider />
      </div>
    </section>
  )
}