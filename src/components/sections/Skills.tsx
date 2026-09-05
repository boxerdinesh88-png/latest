import { motion } from 'motion/react'
import { useState } from 'react'
import { skillGroups, type SkillGroup } from '../../lib/data'
import { SectionHeading, Stagger, StaggerItem } from '../animations/Reveal'
import Tilt from '../ui/Tilt'
import { cn } from '../../lib/utils'

const GLOW: Record<SkillGroup['accent'], string> = {
  accent: 'hover:shadow-[0_16px_50px_-12px_rgb(var(--accent)/0.4)]',
  pink: 'hover:shadow-[0_16px_50px_-12px_rgb(var(--pink)/0.4)]',
  cyan: 'hover:shadow-[0_16px_50px_-12px_rgb(var(--cyan)/0.4)]',
}

const TEXT: Record<SkillGroup['accent'], string> = {
  accent: 'text-accent',
  pink: 'text-pink',
  cyan: 'text-cyan',
}

function SkillCard({ name, note, accent }: { name: string; note: string; accent: SkillGroup['accent'] }) {
  return (
    <Tilt max={12} scale={1.04} glare={false} className="h-full">
      <div
        data-cursor="explore"
        className={cn(
          'group relative h-full rounded-2xl border border-ink/10 bg-panel/50 p-5 backdrop-blur-md transition-all duration-500 hover:border-ink/20 dark:bg-panel/40',
          GLOW[accent],
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-bold text-ink">{name}</p>
          <span className={cn('mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full', TEXT[accent])} />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-faint">{note}</p>
        <div className="mt-4 h-px w-full bg-ink/8" aria-hidden="true" />
        <p className={cn('mt-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100', TEXT[accent])}>
          hover • {name}
        </p>
      </div>
    </Tilt>
  )
}

export default function Skills() {
  const [activeId, setActiveId] = useState<string>(skillGroups[0].id)
  const activeGroup = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0]

  return (
    <section id="skills" className="relative section-pad">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="glow-orb right-[-10%] top-[20%] h-[380px] w-[380px] bg-accent/10 dark:bg-accent/8" />
      </div>

      <div className="container-px relative">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit that spans both worlds."
          description="Code on one side, craft on the other. Hover a card to explore what each skill brings to the table."
        />

        {/* Orbit / discipline selector */}
        <div className="mt-12 flex flex-wrap items-center gap-3" role="tablist" aria-label="Skill disciplines">
          {skillGroups.map((g) => {
            const isActive = activeId === g.id
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(g.id)}
                className={cn(
                  'relative flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300',
                  isActive ? 'text-ink' : 'text-faint hover:text-ink',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full border border-ink/15 bg-ink/[0.04] dark:bg-line/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `rgb(var(--${g.accent}))` }} />
                  {g.label}
                </span>
              </button>
            )
          })}
          <motion.span
            key={activeGroup.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.25em] text-faint sm:block"
          >
            {activeGroup.skills.length} skills
          </motion.span>
        </div>

        {/* Floating skill cards */}
        <motion.div
          key={activeGroup.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" amount={0.08}>
            {activeGroup.skills.map((skill) => (
              <StaggerItem key={skill.name}>
                <SkillCard name={skill.name} note={skill.note} accent={activeGroup.accent} />
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>
      </div>
    </section>
  )
}