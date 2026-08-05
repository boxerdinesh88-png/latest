import { useMemo, useState, useCallback } from 'react'
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
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
                className="glass-card group relative flex flex-col overflow-hidden card-hover"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden sm:h-60">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      width={720}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"
                    aria-hidden="true"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-transparent to-cyan/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {/* Badges */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-line bg-primary/70 px-3 py-1 text-[11px] font-semibold text-cyan backdrop-blur-xl">
                      {project.category || 'Frontend'}
                    </span>
                    {project.highlight && (
                      <span className="flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-semibold text-white shadow-btn">
                        <Star size={11} className="fill-white" /> Featured
                      </span>
                    )}
                  </div>
                  <span className="absolute right-4 top-4 font-mono text-xs text-white/50">
                    {project.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-cyan">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-faint">{project.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-5">
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
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted transition-all hover:border-cyan/40 hover:text-white"
                      >
                        <Github size={13} /> GitHub
                      </a>
                    )}
                    <button
                      onClick={() => openModal(project)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted transition-all hover:border-pink/40 hover:text-white"
                    >
                      <BookOpen size={13} /> Case Study
                    </button>
                  </div>
                </div>
              </motion.article>
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
