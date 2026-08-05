import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'

const ease = [0.16, 1, 0.3, 1] as const

type FormState = {
  name: string
  email: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = { name: '', email: '', message: '' }

const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://latest-vhqh.onrender.com'

export default function ContactSection() {
  const { profile } = usePortfolio()
  const social = profile.social
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const validate = (f: FormState): Errors => {
    const errs: Errors = {}
    if (!f.name.trim()) errs.name = 'Please enter your name'
    else if (f.name.trim().length < 2) errs.name = 'Name is too short'
    if (!f.email.trim()) errs.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Enter a valid email address'
    if (!f.message.trim()) errs.message = 'Please write a message'
    else if (f.message.trim().length < 10) errs.message = 'Message should be at least 10 characters'
    return errs
  }

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...form, [key]: e.target.value }
    setForm(next)
    if (errors[key]) setErrors({ ...errors, [key]: undefined })
    void next
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
    setTimeout(() => {
      setStatus('idle')
      setForm(initialForm)
    }, 4000)
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: social.email, href: `mailto:${social.email}` },
    { icon: Phone, label: 'Phone', value: social.phone, href: `tel:${social.phone?.replace(/[^+\d]/g, '')}` },
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: MessageSquare, label: 'Availability', value: 'Open to freelance & full-time' },
  ]

  const socials = [
    { icon: Github, href: social.github, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${social.email}`, label: 'Email' },
  ]

  return (
    <section id="contact" className="relative section-padding">
      <div className="glow-orb left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 bg-accent/15" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or an opportunity to discuss? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="glass-card relative overflow-hidden p-8 lg:col-span-2"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-cyan/10"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="font-display text-xl font-bold text-white">Get in touch</h3>
              <p className="mt-3 text-sm leading-relaxed text-faint">
                I'm always open to discussing new projects, creative ideas, or opportunities to be
                part of your vision.
              </p>

              <div className="mt-8 space-y-5">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="group flex items-center gap-4"
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-cyan transition-all duration-300 group-hover:bg-gradient-primary group-hover:text-white group-hover:shadow-btn">
                          <Icon size={18} />
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-wider text-faint">{label}</span>
                          <span className="block text-sm font-medium text-white">{value}</span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-cyan">
                          <Icon size={18} />
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-wider text-faint">{label}</span>
                          <span className="block text-sm font-medium text-white">{value}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex items-center gap-3 border-t border-line pt-7">
                {socials.map(
                  ({ icon: Icon, href, label }) =>
                    href && (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-faint transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan hover:shadow-glow-cyan"
                      >
                        <Icon size={18} />
                      </a>
                    ),
                )}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="glass-card p-8 md:p-10 lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/30"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-faint">
                    Thanks for reaching out — I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink/10 text-pink ring-1 ring-inset ring-pink/30">
                    <Send size={36} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Something went wrong</h3>
                  <p className="mt-2 max-w-sm text-sm text-faint">
                    Please email me directly at{' '}
                    <a href={`mailto:${social.email}`} className="text-cyan underline">
                      {social.email}
                    </a>
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange('name')}
                          placeholder="Your Name"
                          aria-invalid={!!errors.name}
                          className={`input-glass ${errors.name ? 'border-pink/60 focus:border-pink/60 focus:ring-pink/20' : ''}`}
                        />
                        <label
                          htmlFor="name"
                          className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                            form.name ? 'top-2 text-[11px] text-cyan' : 'top-4 text-sm text-faint'
                          }`}
                        >
                          Your Name
                        </label>
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-pink" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange('email')}
                          placeholder="Your Email"
                          aria-invalid={!!errors.email}
                          className={`input-glass ${errors.email ? 'border-pink/60 focus:border-pink/60 focus:ring-pink/20' : ''}`}
                        />
                        <label
                          htmlFor="email"
                          className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                            form.email ? 'top-2 text-[11px] text-cyan' : 'top-4 text-sm text-faint'
                          }`}
                        >
                          Your Email
                        </label>
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-pink" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange('message')}
                        placeholder="Your Message"
                        aria-invalid={!!errors.message}
                        className={`input-glass resize-none ${errors.message ? 'border-pink/60 focus:border-pink/60 focus:ring-pink/20' : ''}`}
                      />
                      <label
                        htmlFor="message"
                        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                          form.message ? 'top-2 text-[11px] text-cyan' : 'top-4 text-sm text-faint'
                        }`}
                      >
                        Your Message
                      </label>
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-pink" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
