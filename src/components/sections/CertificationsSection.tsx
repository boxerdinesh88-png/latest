import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import SectionHeader from '../ui/SectionHeader'

const ease = [0.16, 1, 0.3, 1] as const

export default function CertificationsSection() {
  const { certifications } = usePortfolio()

  return (
    <section id="certifications" className="relative section-padding">
      <div className="glow-orb left-[-8%] bottom-0 h-[340px] w-[340px] bg-pink/10" aria-hidden="true" />
      <div className="container-px relative">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials & Awards"
          subtitle="Professional certifications that validate my expertise in full-stack development."
        />

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="glass-card group relative overflow-hidden card-hover"
            >
              {/* Certificate visual */}
              <div className="relative m-4 mb-0 overflow-hidden rounded-2xl border border-line">
                <img
                  src="/certificate.jpg"
                  alt={`${cert.name} certificate`}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-btn">
                  <Award size={17} />
                </span>
              </div>

              <div className="p-7">
                <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-cyan">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-faint">{cert.issuer}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-faint">
                    <Calendar size={12} className="text-cyan" /> {cert.date}
                  </span>
                  <a
                    href="/certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan transition-all hover:text-white"
                  >
                    View Certificate <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
