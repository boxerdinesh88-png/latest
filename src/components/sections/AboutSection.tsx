import { motion } from 'framer-motion'
import { MapPin, Briefcase, Download, BadgeCheck, Zap, Code2 } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'
import CountUp from '../ui/CountUp'
import MagneticButton from '../ui/MagneticButton'

const ease = [0.16, 1, 0.3, 1] as const

const stats = [
  { value: 2, suffix: '+', label: 'Years Experience', icon: Zap },
  { value: 15, suffix: '+', label: 'Projects Delivered', icon: Code2 },
  { value: 20, suffix: '+', label: 'Technologies', icon: BadgeCheck },
  { value: 100, suffix: '%', label: 'Client Satisfaction', icon: Zap },
]

const terminalLines = [
  { prompt: true, text: 'dinesh@portfolio:~$ whoami' },
  { indent: 1, text: 'Full Stack Developer · WordPress & Elementor Expert' },
  { prompt: true, text: 'dinesh@portfolio:~$ cat stack.json' },
  { indent: 1, text: '{ "languages": ["Python", "JS", "TS"],' },
  { indent: 1, text: '  "frameworks": ["Django", "React"],' },
  { indent: 1, text: '  "cms": ["WordPress", "Elementor"],' },
  { indent: 1, text: '  "database": "MySQL" }' },
  { prompt: true, text: 'dinesh@portfolio:~$ deploy --production' },
  { indent: 1, text: '✓ Build succeeded — 15+ projects shipped ✓' },
]

export default function AboutSection() {
  const { profile, education } = usePortfolio()

  return (
    <section id="about" className="relative section-padding">
      <div className="glow-orb left-[-10%] top-1/3 h-[380px] w-[380px] bg-accent/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="About Me"
          title="Crafting Digital Excellence"
          subtitle="Building high-performance web applications with clean code, modern architecture and a recruiter-ready track record."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="glass-card group relative overflow-hidden p-8 md:p-10"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-cyan/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  <div
                    className="absolute -inset-1.5 animate-spin-slow rounded-[26px] opacity-70"
                    style={{
                      background: 'conic-gradient(from 180deg, #7C3AED, #06B6D4, #EC4899, #7C3AED)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative h-28 w-28 overflow-hidden rounded-[20px] border-4 border-primary">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      width={112}
                      height={112}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{profile.name}</h3>
                  <p className="mt-1 text-sm text-faint">{profile.role}</p>
                  <span className="badge-gradient mt-3">
                    <BadgeCheck size={14} className="text-emerald-300" /> Available for hire
                  </span>
                </div>
              </div>

              <p className="mt-7 text-sm leading-relaxed text-faint md:text-base">
                {profile.bio}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-white/[0.02] p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-faint">
                    <MapPin size={13} className="text-cyan" /> Location
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white">{profile.location}</p>
                </div>
                <div className="rounded-xl border border-line bg-white/[0.02] p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-faint">
                    <Briefcase size={13} className="text-cyan" /> Experience
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white">
                    {profile.yearsOfExperience} years · {education.length} credentials
                  </p>
                </div>
              </div>

              <MagneticButton className="mt-8 w-full sm:w-auto">
                <a
                  href={profile.resumeUrl || '/DINESH-RESUME.pdf'}
                  download="Dinesh_Kumar_Resume.pdf"
                  className="btn-primary w-full"
                >
                  <Download size={15} /> Download CV
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Animated terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col"
          >
            <div className="glass-card flex-1 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-surface/60 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-mono text-xs text-faint">developer@portfolio: ~</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed md:text-sm">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                  >
                    {line.prompt ? (
                      <span className="block text-white">
                        <span className="text-cyan">➜</span> <span className="text-white">{line.text}</span>
                      </span>
                    ) : (
                      <span
                        className="block"
                        style={{ paddingLeft: `${line.indent || 0}rem` }}
                      >
                        <span className="text-accent-light">{line.text}</span>
                      </span>
                    )}
                  </motion.div>
                ))}
                <motion.span
                  className="mt-2 inline-block h-4 w-2 animate-pulse bg-cyan"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 }}
                  aria-hidden="true"
                />
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="glass-card group relative overflow-hidden p-7 text-center card-hover"
              >
                <div
                  className="absolute inset-0 rounded-[20px] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899, #06B6D4)',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-btn transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={20} />
                  </div>
                  <p className="font-display text-3xl font-bold md:text-4xl">
                    <CountUp value={stat.value} suffix={stat.suffix} className="gradient-text" />
                  </p>
                  <p className="mt-1.5 text-xs text-faint md:text-sm">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
