import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function CertificationsSection() {
  const portfolio = usePortfolio()
  const { certifications } = portfolio

  if (!certifications || certifications.length === 0) return null

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Credentials</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="text-purple-600 dark:text-purple-400" size={24} />
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {cert.name}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">
                {cert.issuer}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Issued: {cert.date}
              </p>

              {cert.credentialId && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
                  ID: {cert.credentialId}
                </p>
              )}

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  <ExternalLink size={14} />
                  View Credential
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
