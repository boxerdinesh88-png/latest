import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, Sparkles } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'

const ease = [0.16, 1, 0.3, 1] as const

const companyStack: Record<string, string[]> = {
  'Creative Squadz': ['WordPress', 'Elementor', 'Django', 'React JS', 'MySQL'],
  'ProAce International Inc.': ['Python', 'Django', 'React JS', 'MySQL', 'WordPress', 'Elementor'],
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function TimelineItem({
  item,
  index,
}: {
  item: { company: string; role: string; period: string; location: string; summary: string; highlights: string[] }
  index: number
}) {
  const isLeft = index % 2 === 0
  const stack = companyStack[item.company] ?? []

  return (
    <div className="relative pl-14 md:pl-0">
      {/* Dot */}
      <div className="absolute left-[22px] top-1.5 z-10 md:left-1/2 md:-translate-x-1/2">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease }}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary font-display text-sm font-bold text-white shadow-btn md:h-12 md:w-12"
        >
          {initials(item.company)}
        </motion.span>
        <span className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-accent/40" aria-hidden="true" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease }}
        className={`glass-card group relative mb-10 p-7 card-hover md:mb-16 md:w-[calc(50%-3.5rem)] ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <div
          className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at 100% 0%, rgba(236,72,153,0.1), transparent 55%)',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-light ring-1 ring-inset ring-accent/20">
                <Briefcase size={11} /> {item.role}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-white">{item.company}</h3>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-faint">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-cyan" /> {item.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-cyan" /> {item.location}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-faint">{item.summary}</p>

          <ul className="mt-5 space-y-2.5">
            {item.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="flex items-start gap-2.5 text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-cyan" />
                {h}
              </motion.li>
            ))}
          </ul>

          {stack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
              {stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center gap-1.5 text-xs text-cyan">
            <Sparkles size={13} /> Achievement-driven development
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const { experience } = usePortfolio()

  return (
    <section id="experience" className="relative section-padding">
      <div className="glow-orb left-1/4 top-1/4 h-[360px] w-[360px] bg-cyan/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've Worked"
          subtitle="Professional experience building and shipping production applications for clients worldwide."
        />

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute bottom-0 left-[22px] top-0 w-px bg-gradient-to-b from-accent via-pink/60 to-cyan/40 md:left-1/2"
            aria-hidden="true"
          />
          <div className="space-y-0">
            {experience.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
