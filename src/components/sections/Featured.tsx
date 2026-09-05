import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Github, Sparkles } from 'lucide-react'
import { projects } from '../../lib/data'

export default function Featured() {
  const featured = projects.find((p) => p.featured) ?? projects[0]
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  // background tint fades in as you enter
  const bgOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0])
  // parallax layers at different speeds
  const screenY = useTransform(scrollYProgress, [0, 1], [120, -120])
  const glowY = useTransform(scrollYProgress, [0, 1], [40, -60])
  const badgeX = useTransform(scrollYProgress, [0, 1], [80, -80])

  const featuredText = featured.title
  const words = featuredText.split(' ')

  return (
    <section ref={sectionRef} id="featured" className="relative overflow-hidden py-28 md:py-40">
      {/* Immersive fading background */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: bgOpacity,
          background: `radial-gradient(900px 500px at 60% 40%, ${featured.accent}30, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* slow glow drift */}
      <motion.div
        className="glow-orb absolute left-[8%] top-[10%] h-[420px] w-[420px]"
        style={{
          y: glowY,
          background: `radial-gradient(circle, ${featured.accent}55, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="container-px relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ----- text / copy ----- */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/50 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles size={13} className="text-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Featured project</span>
            </motion.div>

            {/* character reveal */}
            <h2 className="mt-7 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[44px]">
              {featured.title.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-top" style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  >
                    {word}
                    {i < words.length - 1 ? ' ' : ''}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block" style={{ color: featured.accent }}>
                {' '}Case Study
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted"
            >
              {featured.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {featured.stack.map((t) => (
                <span key={t} className="rounded-full border border-ink/10 bg-panel/40 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                style={{ background: `linear-gradient(120deg, ${featured.accent}, #ec4899)` }}
              >
                View Live Project
                <ArrowUpRight size={15} />
              </a>
              {featured.github && (
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-panel/40 px-6 py-3 text-sm font-semibold text-ink backdrop-blur-md transition-colors duration-300 hover:border-ink/30"
                >
                  <Github size={15} /> Source
                </a>
              )}
            </motion.div>
          </div>

          {/* ----- mockup with 3D depth ----- */}
          <motion.div style={{ y: screenY }} className="relative" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            {/* window mockup */}
            <div className="relative mx-auto max-w-lg [perspective:1200px]">
              <motion.div
                initial={{ rotateY: 12, rotateX: 4 }}
                whileInView={{ rotateY: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-ink/10 bg-panel/80 shadow-2xl shadow-ink/20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-1.5 border-b border-ink/8 px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/70" />
                  <div className="ml-3 h-5 flex-1 rounded-md bg-ink/[0.04] px-3 font-mono text-[10px] leading-5 text-faint">
                    {featured.link.replace('https://', '')}
                  </div>
                </div>
                <img
                  src={featured.image}
                  alt={`${featured.title} interface`}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-b-3xl object-cover"
                />
              </motion.div>

              {/* front UI panel — floating ahead */}
              <motion.div
                style={{ x: badgeX }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -left-6 w-40 rounded-2xl border border-ink/10 bg-panel/90 p-4 shadow-xl shadow-ink/15 backdrop-blur-xl sm:-left-10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-faint">Status</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-2 font-display text-sm font-bold text-ink">200 OK</p>
                <p className="font-mono text-[10px] text-faint">api/v1/certificates</p>
              </motion.div>

              {/* back UI panel — floating behind */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-4 top-14 w-36 rounded-2xl border border-ink/10 bg-panel/90 p-4 shadow-xl shadow-ink/15 backdrop-blur-xl sm:-right-10"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-pink">Records</span>
                <p className="mt-2 font-display text-2xl font-bold text-ink">1,2k+</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                  <div className="h-full w-3/4 rounded-full" style={{ background: `linear-gradient(90deg, ${featured.accent}, #ec4899)` }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}