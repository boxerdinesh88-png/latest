import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Copy,
  Check,
  MessageCircle,
  Clock,
} from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import { useSmoothScroll } from '../../lib/useSmoothScroll'

const ease = [0.16, 1, 0.3, 1] as const

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

// Live clock in the developer's own timezone
function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone,
    }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [timeZone]) // format only depends on timeZone
  return time
}

export default function Footer() {
  const { profile, projects } = usePortfolio()
  const social = profile.social
  const scrollTo = useSmoothScroll()
  const time = useLocalTime('Asia/Kolkata')
  const [copied, setCopied] = useState(false)

  const socials = [
    { icon: Github, href: social.github, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: social.whatsapp, label: 'WhatsApp' },
    { icon: Mail, href: social.email && `mailto:${social.email}`, label: 'Email' },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href))

  // Highlighted client work, linked to the live sites
  const featured = projects.filter((p) => p.highlight && p.link).slice(0, 4)

  const copyEmail = async () => {
    if (!social.email) return
    try {
      await navigator.clipboard.writeText(social.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${social.email}`
    }
  }

  const onNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href)
  }

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="glow-orb bottom-[-30%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 bg-accent/10" aria-hidden="true" />

      <div className="container-px relative">
        {/* ---------- CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start justify-between gap-10 border-b border-line py-20 lg:flex-row lg:items-end"
        >
          <div>
            <p className="eyebrow">
              <span className="h-px w-8 bg-cyan" aria-hidden="true" /> Have a project in mind?
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              Let's build something <span className="gradient-text-animated">great together.</span>
            </h2>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <button
              onClick={copyEmail}
              className="group inline-flex items-center justify-between gap-4 rounded-full border border-line bg-white/[0.04] py-2 pl-6 pr-2 text-sm font-medium text-white backdrop-blur-xl transition-all hover:border-accent/40"
              aria-live="polite"
            >
              <span className="truncate">{copied ? 'Email copied!' : social.email}</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white shadow-btn">
                {copied ? <Check size={16} /> : <Copy size={15} />}
              </span>
            </button>
            {social.whatsapp && (
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-between whitespace-nowrap"
              >
                Start a conversation <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </motion.div>

        {/* ---------- Columns ---------- */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <button onClick={() => scrollTo('#top')} className="flex items-center gap-2.5" aria-label="Back to top">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-white shadow-btn">
                DK
              </span>
              <span className="font-display text-xl font-semibold text-white">
                Dinesh<span className="text-cyan">.</span>
              </span>
            </button>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-faint">
              Full stack developer building fast, scalable products with Python, Django, React
              and WordPress.
            </p>
            <div className="mt-6 space-y-2.5 text-xs text-faint">
              <p className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for new projects
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={13} className="text-cyan" /> {profile.location}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={13} className="text-cyan" /> {time} IST
              </p>
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => onNav(e, link.href)}
                    className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-cyan transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Selected work */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">Selected Work</h3>
            <ul className="mt-5 space-y-3">
              {featured.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
                  >
                    {p.title}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">Connect</h3>
            <ul className="mt-5 space-y-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2 -mx-3 text-sm text-muted transition-all hover:border-line hover:bg-white/[0.03] hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} className="text-faint transition-colors group-hover:text-cyan" />
                      {label}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Oversized wordmark ---------- */}
      <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden="true">
        <motion.p
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.8] tracking-[-0.05em] text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgb(var(--c-ink) / 0.12) 0%, rgb(var(--c-ink) / 0.02) 90%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          DINESH
        </motion.p>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="relative border-t border-line">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-xs text-faint md:flex-row">
          <p>© {new Date().getFullYear()} Dinesh Kumar. All rights reserved.</p>
          <p className="hidden md:block">Designed & built with React, Tailwind CSS & Framer Motion</p>
          <button
            onClick={() => scrollTo('#top')}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-muted transition-all hover:border-accent/40 hover:text-white"
          >
            Back to top
            <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
