import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, profile } from '../../lib/data'
import ThemeToggle from '../ui/ThemeToggle'
import { cn } from '../../lib/utils'

const FLARES = ['#7c3aed', '#ec4899', '#22d3ee']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    if (href === '#home' && window.scrollY < 10) return
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      {/* scroll progress */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #7c3aed, #ec4899, #22d3ee)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-6xl sm:mt-5">
        <nav
          className={cn(
            'relative flex h-14 items-center justify-between rounded-full border px-4 pl-5 transition-all duration-500 sm:px-5',
            scrolled
              ? 'border-ink/10 bg-panel/70 shadow-lg shadow-ink/5 backdrop-blur-2xl dark:bg-panel/60'
              : 'border-transparent bg-transparent',
          )}
          aria-label="Primary"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <motion.span
              whileHover={{ rotate: 8, scale: 1.06 }}
              className="flex h-8 w-8 items-center justify-center rounded-full font-display text-[13px] font-bold text-white"
              style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)' }}
            >
              D
            </motion.span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink sm:block">
              Dinesh<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-ink' : 'text-faint hover:text-ink',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06] ring-1 ring-inset ring-ink/5"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 blur-[2px]"
                        style={{ background: FLARES[i % FLARES.length] }}
                      />
                    </motion.span>
                  )}
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#contact')
              }}
              className="group hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white md:inline-flex"
              style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)' }}
            >
              Let's Talk
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(64px+0.75rem)] overflow-hidden rounded-3xl border border-ink/10 bg-panel/90 p-3 shadow-2xl shadow-ink/10 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.slice(1)
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.href)
                      }}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors',
                        isActive ? 'bg-ink/[0.06] text-ink' : 'text-faint hover:text-ink',
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                        {link.label}
                      </span>
                      <span
                        className={cn('h-1.5 w-1.5 rounded-full', isActive ? 'bg-accent' : 'bg-ink/15')}
                      />
                    </motion.a>
                  )
                })}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo('#contact')
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)' }}
                >
                  {profile.name} — Let's Work Together <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}