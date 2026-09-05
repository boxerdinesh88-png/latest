import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { profile, socials } from '../../lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 pt-20">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-10 pb-14 md:flex-row md:items-end">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl"
            >
              {profile.name}
              <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-faint"
            >
              Full-Stack Developer × Graphic Designer
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-11 items-center gap-2 rounded-full border border-ink/10 bg-panel/40 px-4 text-sm font-medium text-faint backdrop-blur-md transition-all duration-300 hover:border-ink/25 hover:text-ink"
              >
                <Icon size={15} className="transition-transform duration-300 group-hover:scale-110" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 py-7 sm:flex-row">
          <p className="font-mono text-xs text-faint">
            © {year} {profile.fullName}. Designed, coded &amp; animated with obsession.
          </p>

          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Available for selected projects
            </span>
          </div>

          <a href="#home" className="group inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-ink">
            Back to top
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden bg-gradient-to-b from-transparent to-ink/[0.03] pb-4 text-center" aria-hidden="true">
        <span className="block whitespace-nowrap font-display text-[16vw] font-extrabold leading-[0.8] tracking-tighter text-ink/[0.04] dark:text-ink/[0.05]">
          DINESH
        </span>
      </div>
    </footer>
  )
}