import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'

function TimelineItem({
  item,
}: {
  item: { company: string; role: string; period: string; location: string; summary: string; highlights: string[] }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="relative pl-8 md:pl-12 pb-12 last:pb-0">
      {/* Line */}
      <motion.div
        className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Dot */}
      <motion.div
        className="absolute left-0 md:left-1 top-1 w-[15px] h-[15px] md:w-[23px] md:h-[23px] rounded-full bg-primary border-2 border-accent flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="glass rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">{item.role}</h3>
            <div className="flex items-center gap-2 text-accent text-sm mt-1">
              <Briefcase size={14} />
              {item.company}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-foreground/40 text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {item.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {item.location}
            </span>
          </div>
        </div>

        <p className="text-foreground/50 text-sm leading-relaxed mb-4">{item.summary}</p>

        <div className="grid sm:grid-cols-2 gap-2">
          {item.highlights.map((h, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-2 text-foreground/40 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
            >
              <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
              {h}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const { experience } = usePortfolio()

  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Experience</span>
          </div>
          <SplitText text="Where I've Worked" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            Professional experience building production applications.
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {experience.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <Briefcase size={40} className="text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/40">Experience details coming soon.</p>
            </div>
          ) : (
            experience.map((item, i) => (
                <TimelineItem key={i} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
