import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'
import MagneticButton from '../ui/MagneticButton'

export default function ContactSection() {
  const { profile } = usePortfolio()
  const social = profile.social
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 3000)
    }
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: social.email, href: `mailto:${social.email}` },
    { icon: Phone, label: 'Phone', value: social.phone, href: `tel:${social.phone}` },
    { icon: MapPin, label: 'Location', value: profile.location },
  ]

  const socials = [
    { icon: Github, href: social.github, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
  ]

  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Contact</span>
          </div>
          <SplitText text="Let's Work Together" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            Have a project in mind? Let's build something great together.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 h-fit">
              <h3 className="text-xl font-semibold mb-2">Get in touch</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-4 mb-8">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-start gap-4 group"
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-white/30 text-xs">{label}</p>
                          <p className="text-white/70 text-sm group-hover:text-white transition-colors">{value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-white/30 text-xs">{label}</p>
                          <p className="text-white/70 text-sm">{value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {socials.map(
                  ({ icon: Icon, href, label }) =>
                    href && (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full glass glass-hover flex items-center justify-center text-white/50 hover:text-accent transition-all"
                        aria-label={label}
                      >
                        <Icon size={18} />
                      </a>
                    )
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40 text-center">
                    Thank you! I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent border border-white/[0.08] rounded-xl px-4 pt-6 pb-2 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors peer"
                        required
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-4 transition-all duration-200 text-white/30 ${
                          focused === 'name' || formData.name
                            ? 'top-2 text-xs text-accent'
                            : 'top-4 text-sm'
                        }`}
                      >
                        Your Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent border border-white/[0.08] rounded-xl px-4 pt-6 pb-2 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors peer"
                        required
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-200 text-white/30 ${
                          focused === 'email' || formData.email
                            ? 'top-2 text-xs text-accent'
                            : 'top-4 text-sm'
                        }`}
                      >
                        Your Email
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border border-white/[0.08] rounded-xl px-4 pt-6 pb-2 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none peer"
                      required
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-200 text-white/30 ${
                        focused === 'message' || formData.message
                          ? 'top-2 text-xs text-accent'
                          : 'top-4 text-sm'
                      }`}
                    >
                      Your Message
                    </label>
                  </div>
                  <MagneticButton className="w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      <Send size={16} /> Send Message
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
