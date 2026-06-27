import { motion } from 'framer-motion'
import { Code, Server, Laptop, Shield } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const iconMap: Record<string, any> = {
  Code: Code,
  Server: Server,
  Laptop: Laptop,
  Shield: Shield
}

export default function ServicesSection() {
  const portfolio = usePortfolio()
  const services = portfolio.services || [
    {
      id: "full-stack",
      title: "Full Stack Development",
      description: "Building modern, end-to-end web applications with React.js on the frontend and Django/Python on the backend.",
      icon: "Code"
    },
    {
      id: "backend-api",
      title: "Backend API Development",
      description: "Designing high-performance, secure RESTful APIs using Django REST Framework with strict token-based authentication.",
      icon: "Server"
    },
    {
      id: "responsive-design",
      title: "Responsive Web Design",
      description: "Crafting premium, fluid user interfaces that deliver consistent pixel-perfect layout renderings across all form factors.",
      icon: "Laptop"
    },
    {
      id: "auth-systems",
      title: "Authentication Systems",
      description: "Implementing absolute military-grade security with JWT, custom OTP, multi-factor logins, and Google OAuth.",
      icon: "Shield"
    }
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50 dark:bg-slate-900/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-bg-purple opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Deliver</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto md:mx-0" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl">
            Providing high-end full-stack software solutions engineered for peak speed, rock-solid security, and responsive layouts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Code
            const borderGlow = idx % 2 === 0 ? 'hover:border-purple-500/50' : 'hover:border-cyan-500/50'
            const textGlow = idx % 2 === 0 ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-8 rounded-2xl glass-effect border border-slate-200 dark:border-slate-800 luxury-card ${borderGlow} bg-white dark:bg-slate-900/30 flex flex-col justify-between`}
              >
                <div>
                  <div className={`p-4 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit mb-6 ${textGlow}`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
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
