import { useMemo, useState, useCallback, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, X, BookOpen } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'

const ease = [0.16, 1, 0.3, 1] as const

export default function ProjectsSection() {
  const { projects } = usePortfolio()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null)

  const categories = useMemo(() => {
    const set = new Set<string>(['All'])
    projects.forEach((p) => set.add(p.category || 'Frontend'))
    return Array.from(set)
  }, [projects])

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => (p.category || 'Frontend') === filter),
    [projects, filter],
  )

  const lockScroll = useCallback((locked: boolean) => {
    document.body.style.overflow = locked ? 'hidden' : ''
  }, [])

  const openModal = (project: (typeof projects)[number]) => {
    setSelected(project)
    lockScroll(true)
  }
  const closeModal = () => {
    setSelected(null)
    lockScroll(false)
  }

  return (
    <section id="projects" className="relative section-padding">
      <div className="glow-orb left-[-8%] top-1/3 h-[400px] w-[400px] bg-accent/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Case Studies"
          subtitle="A collection of production web applications I've designed and developed — from Django backends to WordPress platforms."
        />

        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-primary text-white shadow-btn'
                  : 'border border-line bg-white/[0.03] text-faint hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-7 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={() => openModal(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} case study`}
          >
            <div className="absolute inset-0 bg-primary/90 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[24px] border border-line bg-surface shadow-card-lg"
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-primary/70 text-white backdrop-blur-xl transition-all hover:border-pink/40"
                aria-label="Close case study"
              >
                <X size={18} />
              </button>

              {selected.image && (
                <div className="relative h-56 overflow-hidden sm:h-72">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </div>
              )}

              <div className="p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-gradient">
                    {selected.category || 'Frontend'}
                  </span>
                  {selected.highlight && (
                    <span className="flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-white">
                      <Star size={11} className="fill-white" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                  {selected.title}
                </h3>
                <p className="mt-1 text-sm text-faint">{selected.subtitle}</p>

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {selected.description}
                </p>

                <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
                  Key Highlights
                </h4>
                <ul className="mt-4 space-y-3">
                  {selected.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-cyan" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {selected.stack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      <Github size={15} /> View Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

type Project = ReturnType<typeof usePortfolio>['projects'][number]

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: () => void
}

// Same hover as creativesquadz.com/portfolio: fixed-height frame (360px on desktop),
// screenshot slides from top:0 to top:-100% in 1s ease.
const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, index, onOpen },
  ref,
) {
  // How far the screenshot may slide on hover. Same as the reference (one frame
  // height) but never past the image's bottom, so short screenshots don't leave
  // an empty black frame. Screenshots shorter than the frame don't scroll at all.
  const [scroll, setScroll] = useState<number | null>(null)
  const measure = (img: HTMLImageElement) => {
    const frame = img.parentElement?.clientHeight ?? 0
    setScroll(Math.max(0, Math.min(frame, img.offsetHeight - frame)))
  }
  const isShort = scroll === 0

  const preview = (
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      onLoad={(e) => measure(e.currentTarget)}
      style={{ '--scroll': `-${scroll ?? 0}px` } as React.CSSProperties}
      className={
        isShort
          ? 'absolute inset-0 block h-full w-full object-cover object-top'
          : 'absolute left-0 top-0 block h-auto w-full transition-[top] duration-1000 ease-[ease] group-hover/frame:top-[var(--scroll)]'
      }
    />
  )

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease }}
      className="glass-card group flex flex-col overflow-hidden"
    >
      {/* Screenshot frame */}
      {project.image &&
        (project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="group/frame relative block h-[240px] overflow-hidden sm:h-[300px] lg:h-[360px]"
          >
            {preview}
          </a>
        ) : (
          <button
            onClick={onOpen}
            aria-label={`${project.title} case study`}
            className="group/frame relative block h-[240px] w-full overflow-hidden sm:h-[300px] lg:h-[360px]"
          >
            {preview}
          </button>
        ))}

      {/* Title + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-5">
        <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-cyan">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-muted transition-all hover:border-cyan/40 hover:text-white"
            >
              <Github size={15} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-white shadow-btn transition-all hover:brightness-110"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted transition-all hover:border-pink/40 hover:text-white"
          >
            <BookOpen size={13} /> Case Study
          </button>
        </div>
      </div>
    </motion.article>
  )
})
