import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react'
import { useState } from 'react'
import { profile, socials } from '../../lib/data'
import { SplitText, Stagger, StaggerItem } from '../animations/Reveal'
import Magnetic from '../ui/Magnetic'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="contact" className="relative section-pad">
      {/* big centered glow */}
      <div
        className="glow-orb absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-50 dark:opacity-80"
        style={{ background: 'radial-gradient(circle, #7c3aed44, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-px relative text-center">
        <Stagger className="mx-auto max-w-3xl">
          <StaggerItem>
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              Contact
              <span className="h-px w-8 bg-current" aria-hidden="true" />
            </span>
          </StaggerItem>
          <StaggerItem>
            <SplitText
              as="h2"
              text="Have an idea? Let's turn it into something real."
              amount={0.5}
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
            />
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              From the first pixel to the final API, I build digital experiences that look great
              and actually work.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.25} as="a" href={`mailto:${profile.email}?subject=Project%20Inquiry`}>
                <span className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-glow transition-transform duration-300 active:scale-95" style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)' }}>
                  Start a Project
                  <ArrowUpRight size={16} />
                </span>
              </Magnetic>
              <Magnetic strength={0.25} as="button" onClick={copyEmail}>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-panel/40 px-8 py-4 text-sm font-semibold text-ink backdrop-blur-xl transition-colors duration-300 hover:border-ink/30">
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Mail size={16} />}
                  {copied ? 'Copied!' : 'Send Me a Message'}
                </span>
              </Magnetic>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 flex items-center justify-center gap-2 font-mono text-sm text-faint">
              <span className="font-semibold text-ink">{profile.email}</span>
              <button onClick={copyEmail} aria-label="Copy email" className="rounded-full p-1.5 text-faint transition-colors hover:text-accent">
                <Copy size={13} />
              </button>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-12 flex items-center justify-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-panel/40 text-faint backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}