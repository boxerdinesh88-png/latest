import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, ChevronRight, Filter } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const CATEGORIES = ['All', 'Full Stack', 'Django', 'WordPress'] as const
type Category = (typeof CATEGORIES)[number]

const FILTER_ACCENT: Record<Category, string> = {
  'All': 'from-purple-600 to-cyan-400',
  'Full Stack': 'from-emerald-500 to-teal-400',
  'Django': 'from-green-500 to-emerald-400',
  'WordPress': 'from-blue-500 to-indigo-400',
}

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/60 dark:bg-slate-900/40 animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-14" />
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 0.03, 0.26, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0F172A] border border-white/20 dark:border-slate-700/50 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md text-white hover:bg-black/40 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Image */}
        {project.image && (
          <div className="relative w-full h-56 sm:h-72 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0F172A] to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Role + Year */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-purple-500/20 text-purple-600 dark:text-purple-300 bg-purple-500/10">
              {project.role}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.year}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-5">
            {project.subtitle}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <ChevronRight size={14} className="text-purple-500" />
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <ChevronRight size={14} className="text-cyan-500" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Github size={15} />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(!project.image)
  const targetRef = useRef({ x: 0, y: 0 })

  const isDesktop =
    typeof window !== 'undefined' &&
    !('ontouchstart' in window) &&
    window.matchMedia('(pointer: fine)').matches

  useEffect(() => {
    if (!isDesktop) return
    let frameId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      setTilt(prev => ({
        x: lerp(prev.x, targetRef.current.x, 0.1),
        y: lerp(prev.y, targetRef.current.y, 0.1),
      }))
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isDesktop])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ox = (e.clientX - rect.left) / rect.width - 0.5
    const oy = (e.clientY - rect.top) / rect.height - 0.5
    targetRef.current = { x: -oy * 10, y: ox * 10 }
  }

  const staggerDelay = (index % 3) * 0.08

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5, delay: staggerDelay, ease: [0.22, 0.03, 0.26, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); targetRef.current = { x: 0, y: 0 }; setTilt({ x: 0, y: 0 }) }}
        style={isDesktop ? {
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'box-shadow 0.4s ease',
        } : undefined}
        className={`group relative rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/30 shadow-sm transition-all duration-500 ${
          hovered
            ? 'shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20 -translate-y-2 border-purple-400/30 dark:border-purple-500/40'
            : 'shadow-sm'
        }`}
      >
        {/* Animated border glow */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.3), 0 0 30px rgba(139,92,246,0.15)',
          }}
        />

        {/* Image section - tall preview with scroll on hover */}
        <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
          )}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover object-top transition-[object-position] duration-[5s] ease-out ${
                hovered ? 'object-bottom' : 'object-top'
              } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: hovered ? '0.15s' : '0s' }}
            />
          )}

          {/* Dark overlay */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              hovered
                ? 'opacity-100 bg-black/40'
                : 'opacity-0 bg-black/0'
            }`}
          />

          {/* Info slide up */}
          <div
            className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 ease-out ${
              hovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
            <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Role + Year */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-purple-500/20 text-purple-600 dark:text-purple-300 bg-purple-500/10">
              {project.role}
            </span>
            <span className="text-[10px] font-mono text-slate-400">{project.year}</span>
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
            {project.title}
          </h4>
          <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-3 line-clamp-1">
            {project.subtitle}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-0.5 text-[9px] font-mono text-slate-400 dark:text-slate-500">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Buttons - stopPropagation so card click doesn't open modal */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-[10px] tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <ExternalLink size={12} />
                Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium text-[10px] tracking-wide transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Github size={12} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const portfolio = usePortfolio()
  const { projects } = portfolio
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const openModal = useCallback((project: any) => {
    setSelectedProject(project)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-[#070A13] transition-colors duration-300 scroll-mt-20"
    >
      {/* Background */}
      <div className="absolute top-1/4 left-[5%] w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Featured <span className="bg-gradient-to-r from-purple-600 to-cyan-400 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Creations</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full mx-auto md:mx-0" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl text-sm md:text-base">
            A selective gallery of dynamic full-stack systems, automated business APIs, and visual interactive frontend applications.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center md:justify-start gap-2 mb-10"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white shadow-lg'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${FILTER_ACCENT[cat]}`}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat === 'All' && <Filter size={12} />}
                {cat}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => openModal(project)}
                  className="cursor-pointer"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
