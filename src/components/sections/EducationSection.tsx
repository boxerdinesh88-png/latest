import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, Calendar, Landmark, BadgeCheck, Award, BookOpen, School } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'
import type { Education } from '../../types/portfolio'

const ease = [0.16, 1, 0.3, 1] as const

// Short label + icon for the kind of qualification, derived from the degree text
function qualification(edu: Education): { label: string; Icon: LucideIcon } {
  const d = edu.degree.toLowerCase()
  if (/\bba\b|bachelor|degree/.test(d))
    return { label: 'Undergraduate', Icon: GraduationCap }
  if (edu.field.toLowerCase().includes('certification'))
    return { label: 'Professional Certification', Icon: Award }
  if (d.includes('xii') || d.includes('intermediate'))
    return { label: 'Senior Secondary', Icon: BookOpen }
  return { label: 'Secondary', Icon: School }
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const ongoing = /present/i.test(edu.period)
  const { label, Icon } = qualification(edu)

  return (
    <div className="relative pl-14 md:pl-20">
      {/* Timeline node. The in-view trigger sits on this unscaled wrapper: an
          element that starts at scale(0) has no area, so it may never register
          as "in view" and would stay hidden. */}
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-80px 0px' }}
        className="absolute left-0 top-6 z-10 h-11 w-11 md:left-[14px]"
      >
        <motion.div
          variants={{ hidden: { scale: 0, rotate: -45 }, shown: { scale: 1, rotate: 0 } }}
          transition={{ duration: 0.6, ease }}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-cyan shadow-card"
        >
          {ongoing && (
            <span
              className="absolute inset-0 animate-ping rounded-2xl bg-cyan/20"
              aria-hidden="true"
            />
          )}
          <Icon size={19} />
        </motion.div>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px 0px' }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
        className="glass-card group relative overflow-hidden transition-all duration-500 hover:border-white/[0.16] hover:shadow-card-lg"
      >
        <div className="grid md:grid-cols-[220px_1fr]">
          {/* Institution photo */}
          {edu.image && (
            <div className="relative h-44 overflow-hidden md:h-full">
              <img
                src={edu.image}
                alt={edu.institution}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-primary/60"
                aria-hidden="true"
              />
              <span className="absolute bottom-3 left-3 font-mono text-[11px] font-semibold tracking-widest text-white/80">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Details */}
          <div className="relative p-6 md:p-7">
            {/* Accent line grows on hover */}
            <span
              className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-cyan via-accent to-pink transition-transform duration-700 group-hover:scale-y-100"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {label}
              </span>
              {ongoing ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 px-3 py-1 text-[11px] font-semibold text-cyan ring-1 ring-inset ring-cyan/30">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> In Progress
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/25 dark:text-emerald-300">
                  <BadgeCheck size={12} /> Completed
                </span>
              )}
            </div>

            <h3 className="mt-4 font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan">
              {edu.degree}
            </h3>
            <p className="mt-2 flex items-start gap-2 text-sm font-medium text-muted">
              <Landmark size={15} className="mt-0.5 shrink-0 text-cyan" />
              {edu.institution}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-faint">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={13} className="text-accent" /> {edu.field}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} className="text-pink" /> {edu.period}
              </span>
              {edu.gpa && <span className="font-mono text-white/70">GPA {edu.gpa}</span>}
            </div>

            {edu.details && edu.details.length > 0 && (
              <ul className="mt-4 space-y-2">
                {edu.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function EducationSection() {
  const { education } = usePortfolio()
  const timelineRef = useRef<HTMLDivElement>(null)

  // Timeline line fills as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="education" className="relative section-padding">
      <div className="glow-orb right-[-8%] bottom-0 h-[380px] w-[380px] bg-cyan/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Education"
          title="Academic Background"
          subtitle="Formal education and industry-focused training that built my foundation in software engineering."
        />

        <div ref={timelineRef} className="relative mx-auto max-w-4xl">
          {/* Track + animated fill */}
          <div
            className="absolute bottom-6 left-[21px] top-6 w-px bg-white/[0.08] md:left-[35px]"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-6 left-[21px] top-6 w-px origin-top bg-gradient-to-b from-cyan via-accent to-pink md:left-[35px]"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <EducationCard key={`${edu.institution}-${edu.period}`} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
