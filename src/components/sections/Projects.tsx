import { motion, useMotionValue } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects, type Project } from '../../lib/data'
import { SectionHeading, Stagger, StaggerItem } from '../animations/Reveal'
import { cn } from '../../lib/utils'

/** Alternate across a 12-col grid: wide, then split */
function Section({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)

  const isAlt = Number(project.index) % 2 === 0

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  return (
    <StaggerItem className="lg:col-span-12">
      <div
        ref={ref}
        onMouseMove={onMove}
        data-cursor="view"
        className={cn(
          'group relative overflow-hidden rounded-[28px] border border-ink/10 bg-panel/50 backdrop-blur-xl transition-shadow duration-500',
          'hover:shadow-[0_40px_90px_-30px_rgb(0_0_0/0.45)]',
        )}
      >
        {/* cursor-following gradient */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle at 50% 50%, ${project.accent}22, transparent 62%)`,
          }}
          aria-hidden="true"
        />

        <div className={cn('grid gap-0 lg:grid-cols-12', isAlt && 'lg:[direction:rtl]')}>
          {/* Image side */}
          <div className="relative overflow-hidden lg:col-span-7 lg:[direction:ltr]">
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[440px]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-base/20 opacity-80 transition-opacity duration-500 group-hover:opacity-40" aria-hidden="true" />
              {/* category tag */}
              <div className="absolute left-5 top-5">
                <span className="rounded-full border border-white/20 bg-black/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-xl">
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12 lg:[direction:ltr]">
            <span className="font-mono text-sm text-faint">Project {project.index}</span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs font-medium text-muted transition-all duration-300 group-hover:border-ink/20 dark:bg-line/5"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 active:scale-95"
                style={{ background: `linear-gradient(120deg, ${project.accent}, ${project.accent}bb)` }}
              >
                Live Demo
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-panel/40 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur-md transition-colors duration-300 hover:border-ink/30"
                >
                  <Github size={15} /> GitHub
                </a>
              )}
              {!project.github && project.link && (
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  Case study available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </StaggerItem>
  )
}

export default function Projects() {
  return (
    <section id="work" className="relative section-pad">
      <div className="container-px">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Work"
            title="Selected projects."
            description="A mix of full-stack platforms, brand identities and interactive experiences — each one designed and built end to end."
          />
        </div>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12" amount={0.06}>
          {projects.map((p) => (
            <Section key={p.id} project={p} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}