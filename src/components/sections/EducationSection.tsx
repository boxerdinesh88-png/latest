import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Landmark } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'

const ease = [0.16, 1, 0.3, 1] as const

export default function EducationSection() {
  const { education } = usePortfolio()

  return (
    <section id="education" className="relative section-padding">
      <div className="glow-orb right-[-8%] bottom-0 h-[380px] w-[380px] bg-cyan/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Education"
          title="Academic Background"
          subtitle="Formal education and professional training that shaped my engineering foundation."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Line */}
          <div
            className="absolute bottom-0 left-[21px] top-0 w-px bg-gradient-to-b from-cyan via-accent/60 to-pink/40"
            aria-hidden="true"
          />
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i} className="relative pl-16">
                {/* Icon */}
                <div className="absolute left-0 top-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease }}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-cyan shadow-card"
                  >
                    <GraduationCap size={19} />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="glass-card group relative overflow-hidden p-6 card-hover md:p-7"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-cyan/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">{edu.degree}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-cyan">
                          <Landmark size={13} /> {edu.institution}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-muted ring-1 ring-inset ring-white/10">
                        <Calendar size={11} className="text-cyan" /> {edu.period}
                      </span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-wider text-faint">{edu.field}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
