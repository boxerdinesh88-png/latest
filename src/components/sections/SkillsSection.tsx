import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'
import { TechIconMarquee, TechIconGrid } from '../ui/TechIcon'

const techIcons = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Django', color: '#092E20' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'Git', color: '#F05032' },
  { name: 'GSAP', color: '#88CE02' },
  { name: 'Framer', color: '#0055FF' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'WordPress', color: '#21759B' },
  { name: 'Elementor', color: '#92003B' },
]

function SkillBar({ name, level, delay }: { name: string; level: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const levelPercent =
    level === 'Expert' ? 95 : level === 'Advanced' ? 80 : level === 'Intermediate' ? 60 : 40

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-foreground/80">{name}</span>
        <span className="text-foreground/40">{level}</span>
      </div>
      <div className="h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${levelPercent}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const { skills } = usePortfolio()

  const marqueeItems = [...techIcons, ...techIcons]

  return (
    <section id="skills" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Skills</span>
          </div>
          <SplitText text="Technologies & Expertise" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            A comprehensive toolkit for building modern, scalable web applications.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {skills.map((category, i) => (
            <ScrollReveal key={category.category} delay={i * 0.1}>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-accent mb-6">{category.category}</h3>
                {category.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={j * 0.05}
                  />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tech Icons Marquee */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-8 overflow-hidden">
            <h3 className="text-sm font-mono tracking-widest text-foreground/30 mb-8 text-center uppercase">
              Technologies I work with
            </h3>
            <div className="relative flex overflow-hidden">
              <motion.div
                className="flex gap-12 items-center shrink-0"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {marqueeItems.map((tech, i) => (
                  <TechIconMarquee key={i} name={tech.name} color={tech.color} />
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Floating Tech Icons Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-12">
          {techIcons.map((tech, i) => (
            <ScrollReveal key={tech.name} delay={i * 0.03}>
              <TechIconGrid name={tech.name} color={tech.color} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
