import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { journey } from '../../lib/data'
import { SectionHeading } from '../animations/Reveal'

export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-78%'])
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="relative">
      {/* Desktop: pinned horizontal scroll */}
      <div ref={trackRef} className="relative hidden h-[320vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-px">
            <SectionHeading
              eyebrow="Journey"
              title="Five years, one obsession."
              description="From first line of code to shipping full experiences — the road so far."
            />
          </div>

          {/* progress line */}
          <div className="relative z-10 mx-auto mt-16 h-px w-full max-w-6xl bg-ink/10" aria-hidden="true">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-pink to-cyan"
              style={{ scaleX: lineScale, transformOrigin: 'left', width: '100%' }}
            />
          </div>

          <motion.div style={{ x }} className="relative mt-10 flex w-max items-stretch gap-8 pl-[max(2rem,calc((100vw-1300px)/2+2rem))] pr-24">
            {journey.map((j, i) => (
              <div key={j.year} className="relative w-[400px] shrink-0">
                {/* node above card */}
                <div className="absolute -top-11 left-10 flex items-center gap-3">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.05 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-glow"
                  >
                    {j.year.slice(2)}
                  </motion.span>
                  <span className="font-display text-[15px] font-bold text-ink">{j.year}</span>
                </div>

                <div
                  data-cursor="explore"
                  className="mt-14 flex h-full flex-col rounded-3xl border border-ink/10 bg-panel/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-30px_rgb(var(--accent)/0.4)]"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">milestone_{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">{j.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{j.blurb}</p>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {j.title.split(' ')[0].toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* end cap */}
            <div className="flex w-[180px] shrink-0 flex-col items-start justify-center pl-4">
              <span className="font-display text-xl font-bold gradient-text">and beyond</span>
              <span className="mt-2 font-mono text-xs text-faint">next_milestone()</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="container-px py-24 md:hidden">
        <SectionHeading
          eyebrow="Journey"
          title="Five years, one obsession."
          description="From first line of code to shipping full experiences — the road so far."
        />
        <div className="relative mt-12 border-l border-ink/10 pl-8">
          {journey.map((j, i) => (
            <motion.div
              key={j.year}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[45px] flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-panel/80 text-xs font-bold text-ink shadow-lg backdrop-blur-lg">
                {j.year.slice(2)}
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">Year {j.year}</p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{j.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{j.blurb}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}