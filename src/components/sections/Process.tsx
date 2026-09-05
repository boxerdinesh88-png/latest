import { motion } from 'motion/react'
import { process } from '../../lib/data'
import { SectionHeading } from '../animations/Reveal'

export default function Process() {
  return (
    <section id="process" className="relative section-pad">
      <div className="container-px">
        <SectionHeading
          eyebrow="Process"
          title="From spark to launch."
          description="A deliberate, cinematic path — every project moves through five movements."
          align="center"
          className="mx-auto text-center"
        />

        <div className="relative mt-20">
          {/* connecting gradient line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent via-pink to-cyan opacity-40 md:left-1/2 md:h-px md:w-full md:-translate-x-1/2 md:bg-gradient-to-r" aria-hidden="true" />

          <div className="flex flex-col gap-12 md:gap-0">
            {process.map((step, i) => {
              const Icon = step.icon
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex md:w-1/2 ${
                    isEven ? 'md:pr-16' : 'md:ml-auto md:pl-16'
                  }`}
                >
                  {/* node */}
                  <div
                    className={`absolute top-0 z-10 flex items-center justify-center ${
                      isEven
                        ? '-left-[46px] md:left-auto md:-right-[29px]'
                        : '-left-[46px] md:left-auto md:-left-[29px]'
                    }`}
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.2 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-panel/90 shadow-xl shadow-ink/10 backdrop-blur-xl dark:bg-panel/80"
                    >
                      <Icon size={20} className="text-accent" />
                    </motion.span>
                  </div>

                  <div
                    data-cursor="explore"
                    className="flex-1 rounded-3xl border border-ink/10 bg-panel/50 p-7 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgb(var(--accent)/0.3)] sm:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-4xl font-extrabold tracking-tight text-ink/10 dark:text-ink/15">
                        {step.index}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
                        {String(i + 1).padStart(2, '0')} / {String(process.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">{step.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}