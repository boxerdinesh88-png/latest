import { motion } from 'framer-motion'
import { Monitor, Server, Database, Layout, Wrench, Clock, type LucideIcon } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'
import { TechIconGrid } from '../ui/TechIcon'

const ease = [0.16, 1, 0.3, 1] as const

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  Databases: Database,
  'CMS & Page Builders': Layout,
  'Tools & DevOps': Wrench,
}

const levelPercent: Record<string, number> = {
  Expert: 95,
  Advanced: 78,
  Intermediate: 58,
  Beginner: 35,
}

const levelYears: Record<string, string> = {
  Expert: '2+ yrs',
  Advanced: '1+ yr',
  Intermediate: '<1 yr',
  Beginner: 'Learning',
}

const techList = [
  { name: 'Python', color: '#3776AB' },
  { name: 'Django', color: '#44A833' },
  { name: 'React', color: '#61DAFB' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Bootstrap', color: '#7952B3' },
  { name: 'WordPress', color: '#21759B' },
  { name: 'Elementor', color: '#92003B' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'Node.js', color: '#339933' },
  { name: 'REST APIs', color: '#F7DF1E' },
  { name: 'Git', color: '#F05032' },
  { name: 'GitHub', color: '#ffffff' },
  { name: 'PythonAnywhere', color: '#2D6BB4' },
  { name: 'GSAP', color: '#88CE02' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Framer', color: '#0055FF' },
  { name: 'AI Integration', color: '#8B5CF6' },
  { name: 'Prompt Engineering', color: '#EC4899' },
]

function SkillBar({ name, level, delay }: { name: string; level: string; delay: number }) {
  const percent = levelPercent[level] ?? 40
  const years = levelYears[level] ?? ''
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="flex items-center gap-2 text-[11px] text-faint">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-cyan" /> {years}
          </span>
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-muted">
            {level}
          </span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-accent via-pink to-cyan"
          initial={{ width: '0%' }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, delay, ease }}
        >
          <span
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan shadow-glow-cyan"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const { skills } = usePortfolio()

  return (
    <section id="skills" className="relative section-padding">
      <div className="glow-orb right-[-10%] top-0 h-[400px] w-[400px] bg-pink/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Skills"
          title="Technologies & Expertise"
          subtitle="A comprehensive toolkit for building modern, scalable web applications — from pixel-perfect frontends to secure backends."
        />

        {/* Category cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((category, i) => {
            const Icon = categoryIcons[category.category] ?? Wrench
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="glass-card group relative overflow-hidden p-7 card-hover"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 15% 0%, rgba(124,58,237,0.12), transparent 55%)',
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-cyan transition-all duration-500 group-hover:bg-gradient-primary group-hover:text-white group-hover:shadow-btn">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs text-faint">
                      {String(category.skills.length).padStart(2, '0')} skills
                    </span>
                  </div>
                  <h3 className="mb-6 font-display text-lg font-semibold text-white">
                    {category.category}
                  </h3>
                  <div className="space-y-5">
                    {category.skills.map((skill, j) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={j * 0.08} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Stats mini card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="glass-card relative flex flex-col items-center justify-center overflow-hidden p-8 text-center"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'conic-gradient(from 210deg, rgba(124,58,237,0.16), rgba(236,72,153,0.14), rgba(6,182,212,0.16), rgba(124,58,237,0.16))',
              }}
              aria-hidden="true"
            />
            <p className="relative font-display text-6xl font-bold gradient-text">2+</p>
            <p className="relative mt-2 font-display text-lg font-semibold text-white">
              Years of Experience
            </p>
            <p className="relative mt-3 max-w-[220px] text-sm leading-relaxed text-faint">
              Continuously shipping production-ready features across the full stack.
            </p>
          </motion.div>
        </div>

        {/* Tech grid */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-faint">
              Technologies I work with
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {techList.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              >
                <TechIconGrid name={tech.name} color={tech.color} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
