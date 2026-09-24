import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Monitor,
  Server,
  Database,
  Layout,
  Wrench,
  Clock,
  Layers,
  Rocket,
  CalendarCheck,
  type LucideIcon,
} from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'
import CountUp from '../ui/CountUp'
import { getTechIconPath } from '../ui/TechIcon'

const ease = [0.16, 1, 0.3, 1] as const

const categoryMeta: Record<string, { Icon: LucideIcon; tagline: string; tint: string }> = {
  Frontend: { Icon: Monitor, tagline: 'Fast, polished and accessible interfaces', tint: '124 58 237' },
  Backend: { Icon: Server, tagline: 'Secure APIs and solid business logic', tint: '6 182 212' },
  Databases: { Icon: Database, tagline: 'Reliable data models and queries', tint: '16 185 129' },
  'CMS & Page Builders': { Icon: Layout, tagline: 'Client-ready sites teams can manage', tint: '236 72 153' },
  'Tools & DevOps': { Icon: Wrench, tagline: 'Shipping, collaboration and AI workflow', tint: '245 158 11' },
}

// Bento placement on large screens: Frontend is the tall anchor card
const categoryLayout: Record<string, string> = {
  Frontend: 'lg:row-span-2',
}

const levelScore: Record<string, number> = {
  Expert: 5,
  Advanced: 4,
  Intermediate: 3,
  Beginner: 2,
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
  { name: 'GitHub', color: '#8B949E' },
  { name: 'PythonAnywhere', color: '#2D6BB4' },
  { name: 'GSAP', color: '#88CE02' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Framer', color: '#0055FF' },
  { name: 'AI Integration', color: '#8B5CF6' },
  { name: 'Prompt Engineering', color: '#EC4899' },
]

const techRows = [
  techList.slice(0, Math.ceil(techList.length / 2)),
  techList.slice(Math.ceil(techList.length / 2)),
]

type Tech = (typeof techList)[number]

function TechPill({ name, color }: Tech) {
  const pathData = getTechIconPath(name)
  return (
    <div
      className="group/pill relative flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-line bg-white/[0.03] py-3 pl-3 pr-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand)] hover:bg-white/[0.06] hover:shadow-[0_10px_40px_-10px_var(--brand)]"
      style={{ '--brand': `${color}99` } as React.CSSProperties}
    >
      {/* Shine sweep on hover */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover/pill:animate-shine group-hover/pill:opacity-100"
        aria-hidden="true"
      />
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover/pill:-rotate-6 group-hover/pill:scale-110"
        style={{ backgroundColor: `${color}1a`, color }}
      >
        {pathData ? (
          <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden="true">
            <path d={pathData} />
          </svg>
        ) : (
          <span className="text-xs font-bold">{name.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-muted transition-colors duration-300 group-hover/pill:text-white">
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Tech[]
  direction: 'left' | 'right'
  duration: number
}) {
  // Two identical halves so translating by -50% loops seamlessly
  const half = [...items, ...items]
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px 0px' }}
      transition={{ duration: 0.9, ease }}
      className="group/row relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div
        className={`flex w-max group-hover/row:[animation-play-state:paused] ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee2'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Spacing via padding (not gap) keeps both halves exactly 50% wide */}
        {[...half, ...half].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="pr-4"
            aria-hidden={i >= items.length ? true : undefined}
          >
            <TechPill {...tech} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Five-segment proficiency meter; segments fill one after another on reveal
function LevelMeter({ level, tint, delay }: { level: string; tint: string; delay: number }) {
  const score = levelScore[level] ?? 2
  return (
    <motion.div
      className="flex gap-1"
      role="img"
      aria-label={`${level}: ${score} of 5`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-40px 0px' }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="relative h-1.5 w-5 overflow-hidden rounded-full bg-white/[0.08]">
          {i < score && (
            <motion.span
              className="absolute inset-0 origin-left rounded-full"
              style={{ backgroundColor: `rgb(${tint})` }}
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
              transition={{ duration: 0.35, delay: delay + i * 0.07, ease }}
            />
          )}
        </span>
      ))}
    </motion.div>
  )
}

function SkillRow({
  name,
  level,
  tint,
  delay,
}: {
  name: string
  level: string
  tint: string
  delay: number
}) {
  const pathData = getTechIconPath(name)
  return (
    <li className="group/row flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover/row:scale-110"
        style={{ backgroundColor: `rgb(${tint} / 0.1)`, color: `rgb(${tint})` }}
      >
        {pathData ? (
          <svg viewBox="0 0 24 24" width={17} height={17} fill="currentColor" aria-hidden="true">
            <path d={pathData} />
          </svg>
        ) : (
          <span className="text-[11px] font-bold">{name.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-white">{name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-faint">
          <Clock size={10} /> {levelYears[level] ?? ''}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{level}</span>
        <LevelMeter level={level} tint={tint} delay={delay} />
      </div>
    </li>
  )
}

// Cursor-following spotlight: writes the pointer position into CSS variables
function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function SkillsSection() {
  const { skills, projects, profile } = usePortfolio()

  const stats = [
    {
      Icon: CalendarCheck,
      value: parseInt(profile.yearsOfExperience, 10) || 1,
      suffix: '+',
      label: 'Years building for the web',
    },
    { Icon: Layers, value: techList.length, suffix: '+', label: 'Technologies in daily use' },
    { Icon: Rocket, value: projects.length, suffix: '+', label: 'Projects shipped to production' },
  ]

  return (
    <section id="skills" className="relative section-padding">
      <div className="glow-orb right-[-10%] top-0 h-[400px] w-[400px] bg-pink/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Skills"
          title="Technologies & Expertise"
          subtitle="A comprehensive toolkit for building modern, scalable web applications — from pixel-perfect frontends to secure backends."
        />

        {/* At a glance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px 0px' }}
          transition={{ duration: 0.6, ease }}
          className="glass-card mb-8 grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {stats.map(({ Icon, value, suffix, label }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-5 md:px-8 md:py-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-btn">
                <Icon size={19} />
              </span>
              <div>
                <p className="font-display text-3xl font-bold leading-none text-white">
                  <CountUp value={value} suffix={suffix} />
                </p>
                <p className="mt-1.5 text-xs text-faint">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bento of categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, i) => {
            const meta = categoryMeta[category.category] ?? {
              Icon: Wrench,
              tagline: '',
              tint: '124 58 237',
            }
            const { Icon, tagline, tint } = meta
            return (
              <motion.article
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                onMouseMove={trackSpotlight}
                className={`glass-card group relative overflow-hidden p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-card-lg md:p-7 ${
                  categoryLayout[category.category] ?? ''
                }`}
                style={{ '--tint': tint } as React.CSSProperties}
              >
                {/* Spotlight + tinted top edge */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgb(var(--tint) / 0.1), transparent 65%)',
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, rgb(${tint}), transparent)` }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <header className="mb-5 flex items-start gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
                      style={{ backgroundColor: `rgb(${tint} / 0.12)`, color: `rgb(${tint})` }}
                    >
                      <Icon size={21} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {category.category}
                        </h3>
                        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-faint">
                          {String(category.skills.length).padStart(2, '0')}
                        </span>
                      </div>
                      {tagline && <p className="mt-1 text-xs text-faint">{tagline}</p>}
                    </div>
                  </header>

                  <ul className="-mx-2 divide-y divide-line">
                    {category.skills.map((skill, j) => (
                      <SkillRow
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        tint={tint}
                        delay={0.15 + j * 0.06}
                      />
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Tech marquee */}
        <div className="mt-24">
          <motion.div
            initial="hidden"
            whileInView="shown"
            variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
            viewport={{ once: true, margin: '-40px 0px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 flex items-center justify-center gap-4"
          >
            <motion.span
              className="hidden h-px w-16 origin-right bg-gradient-to-r from-transparent to-accent sm:block sm:w-24"
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              aria-hidden="true"
            />
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-faint sm:tracking-[0.35em]">
              Technologies I work with
              <span className="ml-3 rounded-full border border-line bg-white/[0.03] px-2 py-0.5 text-[10px] tracking-normal text-cyan">
                {techList.length}+
              </span>
            </p>
            <motion.span
              className="hidden h-px w-16 origin-left bg-gradient-to-l from-transparent to-cyan sm:block sm:w-24"
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Animated rows (hidden when the user prefers reduced motion) */}
          <div className="space-y-5 motion-reduce:hidden">
            <MarqueeRow items={techRows[0]} direction="left" duration={45} />
            <MarqueeRow items={techRows[1]} direction="right" duration={50} />
          </div>

          {/* Static fallback for reduced motion */}
          <div className="hidden flex-wrap justify-center gap-3 motion-reduce:flex">
            {techList.map((tech) => (
              <TechPill key={tech.name} {...tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
