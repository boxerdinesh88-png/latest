import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Linkedin, MessageSquare, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'

export default function ContactSection() {
  const portfolio = usePortfolio()
  const { profile } = portfolio
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      console.log('Message saved:', data)
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50 dark:bg-[#070A13] transition-colors duration-300 scroll-mt-20">
      {/* Background neon sparks */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full glow-bg-purple opacity-10 dark:opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full glow-bg-cyan opacity-10 dark:opacity-25 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-slate-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get In <span className="bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base mb-4">
            Have a project in mind, an exciting role to discuss, or just want to say hi? Let's connect and build something phenomenal.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email */}
            {profile.social.email && (
              <a
                href={`mailto:${profile.social.email}`}
                className="flex gap-4 p-5 rounded-2xl glass-effect border luxury-card neon-border-purple bg-white/80 dark:bg-slate-900/30 transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">{profile.social.email}</p>
                </div>
              </a>
            )}

            {/* WhatsApp */}
            {profile.social.whatsapp && (
              <a
                href={profile.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-5 rounded-2xl glass-effect border luxury-card neon-border-cyan bg-white/80 dark:bg-slate-900/30 transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 transition-colors">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">WhatsApp</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">{profile.social.phone} (Quick Reply)</p>
                </div>
              </a>
            )}

            {/* LinkedIn */}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-5 rounded-2xl glass-effect border luxury-card neon-border-purple bg-white/80 dark:bg-slate-900/30 transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-colors">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">LinkedIn</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">dinesh-kumar-6a6b9530b ↗</p>
                </div>
              </a>
            )}

            {/* Location */}
            <div className="flex gap-4 p-5 rounded-2xl glass-effect border luxury-card neon-border-cyan bg-white/80 dark:bg-slate-900/30">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1">Location</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{profile.location}</p>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-4 text-center lg:text-left">
              <h4 className="text-sm font-bold tracking-wider uppercase text-slate-500 mb-4">Connect Directly</h4>
              <SocialLinks darkBg={false} />
            </div>
          </motion.div>

          {/* Luxury Glowing Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 md:p-10 rounded-3xl glass-effect border border-slate-200 dark:border-purple-500/20 bg-white/80 dark:bg-slate-900/25 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative duration-300"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                placeholder="Dinesh's future partner/client"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                placeholder="you@corporate.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 resize-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                placeholder="Let's build an awesome E-commerce engine..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 disabled:opacity-70 text-white font-bold tracking-wider uppercase text-xs transition-all duration-300 transform hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <><Loader size={16} className="animate-spin" /> Sending...</>
              ) : status === 'success' ? (
                <><CheckCircle size={16} /> Message Sent!</>
              ) : status === 'error' ? (
                <><AlertCircle size={16} /> Failed - Try Again</>
              ) : (
                <><Send size={16} /> Transmit Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
