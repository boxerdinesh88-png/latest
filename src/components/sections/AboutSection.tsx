import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Briefcase, Calendar, Download } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'

const counterData = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Projects Delivered' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 12, suffix: '+', label: 'Happy Clients' },
]

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView || display > 0) return
    let current = 0
    const increment = value / 40
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplay(value)
        clearInterval(interval)
      } else {
        setDisplay(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(interval)
  }, [isInView, value, display])

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        {display}{suffix}
      </div>
      <div className="text-foreground/40 text-sm">{label}</div>
    </div>
  )
}

export default function AboutSection() {
  const { profile, experience, education } = usePortfolio()
  const [imgLoaded, setImgLoaded] = useState(false)

  const allHighlights = experience.flatMap((exp) => exp.highlights)

  return (
    <section id="about" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">About</span>
          </div>
          <SplitText text="Crafting Digital Excellence" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            Building high-performance web applications with clean code and modern architecture.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Profile Card */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all duration-500">
                  {profile.avatarUrl && (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImgLoaded(true)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-1">{profile.name}</h3>
                <p className="text-foreground/50 text-center text-sm mb-6">{profile.role}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-foreground/60">
                    <MapPin size={16} className="text-accent shrink-0" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/60">
                    <Briefcase size={16} className="text-accent shrink-0" />
                    {profile.yearsOfExperience} year experience
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/60">
                    <Calendar size={16} className="text-accent shrink-0" />
                    {education[0]?.period}
                  </div>
                </div>

                <a
                  href={profile.resumeUrl || '/Dinesh_Kumar.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full glass glass-hover text-sm flex items-center justify-center gap-2 text-foreground/70 hover:text-foreground transition-all"
                >
                  <Download size={14} /> Download CV
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Bio & Highlights */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 md:p-10">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-foreground/60 leading-relaxed mb-8 text-sm md:text-base">
                {profile.bio}
              </p>

              <h4 className="text-sm font-mono tracking-widest text-accent mb-4 uppercase">Key Highlights</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {allHighlights.slice(0, 6).map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-foreground/[0.02]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-foreground/50 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {counterData.map((counter, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass rounded-2xl">
                <AnimatedCounter {...counter} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
