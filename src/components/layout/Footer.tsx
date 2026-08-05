import { usePortfolio } from '../../lib/usePortfolio'
import { Github, Linkedin, Mail, Heart, ArrowUp, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { profile } = usePortfolio()
  const social = profile.social

  const socials = [
    { icon: Github, href: social.github, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${social.email}`, label: 'Email' },
  ]

  return (
    <footer className="relative border-t border-line bg-surface/40">
      <div className="divider-gradient absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-white shadow-btn">
                DK
              </span>
              <span className="font-display text-lg font-semibold text-white">
                Dinesh<span className="text-cyan">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-faint">
              Full Stack Developer crafting high-performance web applications with Python,
              Django, React JS, WordPress & Elementor.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-faint">
              <MapPin size={13} className="text-cyan" /> {profile.location}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-faint">Navigate</h3>
            <ul className="mt-5 grid grid-cols-2 gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-faint">Connect</h3>
            <div className="mt-5 flex gap-3">
              {socials.map(
                ({ icon: Icon, href, label }) =>
                  href && (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-faint transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan hover:shadow-glow-cyan"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ),
              )}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-2.5 text-sm text-muted transition-all hover:border-pink/40 hover:text-white"
            >
              Back to top <ArrowUp size={15} className="text-pink" />
            </button>
          </div>
        </div>

        <div className="divider-gradient mt-12" aria-hidden="true" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} Dinesh Kumar. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-faint">
            Crafted with <Heart size={12} className="fill-pink text-pink" /> and a lot of
            <span className="text-cyan">Coffee</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
