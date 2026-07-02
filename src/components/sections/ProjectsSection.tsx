import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Star, Code2, Database, Server, Globe } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'
import MagneticButton from '../ui/MagneticButton'

function ProjectCard({
  project,
  index,
  isActive,
  onSelect,
}: {
  project: any
  index: number
  isActive: boolean
  onSelect: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const tiltRef = useRef({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    tiltRef.current = { x: x * 8, y: y * -8 }
    setTilt(tiltRef.current)
  }

  const onMouseLeave = () => {
    tiltRef.current = { x: 0, y: 0 }
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const getCategoryIcon = (cat?: string) => {
    switch (cat?.toLowerCase()) {
      case 'django': return Server
      case 'full stack': return Globe
      case 'wordpress': return Code2
      default: return Database
    }
  }
  const CategoryIcon = getCategoryIcon(project.category)

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer ${
        isActive ? 'ring-2 ring-accent/30 shadow-xl shadow-purple-500/10' : ''
      }`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Project Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10" />
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <CategoryIcon size={48} className="text-foreground/20" />
          </div>
        )}

        {/* Project Number */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-4xl md:text-5xl font-bold text-foreground/5">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Category Badge */}
        {project.category && (
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 rounded-full glass text-xs text-foreground/60">
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-foreground">{project.title}</h3>
        <p className="text-foreground/40 text-sm mb-4">{project.subtitle}</p>
        <p className="text-foreground/50 text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech: string, i: number) => (
            <motion.span
              key={tech}
              className="px-3 py-1 rounded-full bg-foreground/[0.04] text-foreground/40 text-xs border border-foreground/[0.06]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-accent transition-colors"
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-accent transition-colors"
              >
                <Github size={14} /> Code
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 text-foreground/30 text-xs">
            <Star size={12} className="fill-accent/30 text-accent/30" />
            {project.role}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { projects } = usePortfolio()
  const [activeIndex, setActiveIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 400
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section id="projects" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Projects</span>
          </div>
          <SplitText text="Featured Case Studies" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            A collection of premium web applications I've designed and developed.
          </p>
        </ScrollReveal>

        {/* Active Project Detail */}
        {activeIndex >= 0 && projects[activeIndex] && (
          <motion.div
            className="glass rounded-2xl p-6 md:p-10 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {projects[activeIndex].title}
                </h3>
                <p className="text-foreground/40">{projects[activeIndex].subtitle}</p>
              </div>
              <div className="flex gap-3">
                <MagneticButton>
                  {projects[activeIndex].link && (
                    <a
                      href={projects[activeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </MagneticButton>
                {projects[activeIndex].github && (
                  <MagneticButton>
                    <a
                      href={projects[activeIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full glass glass-hover text-foreground/80 text-sm flex items-center gap-2 transition-all"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>
            <p className="text-foreground/50 leading-relaxed mb-6">{projects[activeIndex].description}</p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects[activeIndex].highlights?.map((h: string, i: number) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-xl bg-foreground/[0.02]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-foreground/40 text-sm">{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Horizontal Scrollable Grid */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, i) => (
              <div key={project.id} className="min-w-[340px] md:min-w-[420px] lg:min-w-[480px] snap-start">
                <ProjectCard
                  project={project}
                  index={i}
                  isActive={activeIndex === i}
                  onSelect={() => setActiveIndex(activeIndex === i ? -1 : i)}
                />
              </div>
            ))}
          </div>

          {/* Scroll Controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center text-foreground/60 hover:text-foreground transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center text-foreground/60 hover:text-foreground transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
