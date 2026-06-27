import { motion } from 'framer-motion'
import { Sparkles, BrainCircuit, ShieldAlert, Zap } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const iconMap = [Sparkles, BrainCircuit, ShieldAlert, Zap]

export default function WhyHireMeSection() {
  const portfolio = usePortfolio()
  const whyHireMe = portfolio.whyHireMe || [
    {
      title: "Clean & Modular Code",
      description: "Strict adherence to PEP 8 standards, modular component design, and well-documented API structures for future developers."
    },
    {
      title: "Analytical Problem Solving",
      description: "Strong logical foundation from high-performance Django architectures, complex SQL database schema design, and algorithm optimization."
    },
    {
      title: "Secure-First Backend",
      description: "Always protecting API gateways with JWT authentication, custom OTP validation pipelines, password hashing, and CORS policies."
    },
    {
      title: "Scalable Infrastructure",
      description: "Designing caching layers, decoupled REST integrations, optimized database indices, and high-performance server deployments."
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-slate-900/10">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] glow-bg-cyan opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Hire Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto md:mx-0" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl">
            Bringing strict software engineering standards, security-first mentalities, and elegant clean structures to every business system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyHireMe.map((item, idx) => {
            const Icon = iconMap[idx % iconMap.length]
            const glowClass = idx % 2 === 0 ? 'neon-border-purple hover:shadow-purple-500/10' : 'neon-border-cyan hover:shadow-cyan-500/10'
            const iconGlow = idx % 2 === 0 ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl glass-effect border text-left luxury-card ${glowClass} bg-white dark:bg-slate-900/20 flex flex-col justify-between`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800 w-fit mb-5 ${iconGlow}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
