import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, X, ExternalLink, Calendar } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'

export default function CertificationsSection() {
  const { certifications } = usePortfolio()
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  return (
    <section id="certifications" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Certifications</span>
          </div>
          <SplitText text="Credentials & Awards" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            Professional certifications and achievements.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.length === 0 ? (
            <div className="col-span-full glass rounded-2xl p-12 text-center">
              <Award size={40} className="text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/40">Certifications coming soon.</p>
            </div>
          ) : (
            certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  className="glass rounded-2xl p-6 glass-hover group relative overflow-hidden cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => setSelectedCert(i)}
                >
                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-full top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent group-hover:translate-x-full transition-transform duration-700" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Award size={24} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{cert.name}</h3>
                    <p className="text-foreground/40 text-sm mb-3">{cert.issuer}</p>
                    <div className="flex items-center gap-2 text-foreground/30 text-xs">
                      <Calendar size={12} /> {cert.date}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert !== null && certifications[selectedCert] && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative glass rounded-2xl p-8 max-w-lg w-full"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-foreground/60 hover:text-foreground"
              >
                <X size={16} />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <Award size={28} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {certifications[selectedCert].name}
              </h3>
              <p className="text-foreground/50 mb-4">{certifications[selectedCert].issuer}</p>
              <div className="flex items-center gap-2 text-foreground/30 text-sm mb-6">
                <Calendar size={14} /> {certifications[selectedCert].date}
              </div>
              {certifications[selectedCert].link && (
                <a
                  href={certifications[selectedCert].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent text-sm hover:text-accent-light transition-colors"
                >
                  <ExternalLink size={14} /> Verify Credential
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
