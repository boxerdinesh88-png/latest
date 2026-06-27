import { motion } from 'framer-motion'
import { FolderGit, Clock, Layers, ShieldCheck } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    {
      icon: FolderGit,
      value: "10+",
      label: "Projects Shipped",
      desc: "Robust deployed web apps",
      glow: "neon-border-purple"
    },
    {
      icon: Clock,
      value: "1000+",
      label: "Hours Coding",
      desc: "Writing efficient solutions",
      glow: "neon-border-cyan"
    },
    {
      icon: Layers,
      value: "Full Stack",
      label: "Development",
      desc: "React.js + Python Django",
      glow: "neon-border-purple"
    },
    {
      icon: ShieldCheck,
      value: "Secure API",
      label: "Architectures",
      desc: "DRF + JWT Token Security",
      glow: "neon-border-cyan"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-950/40 relative overflow-hidden transition-colors duration-300">
      {/* Background glow sparks */}
      <div className="absolute right-10 top-10 w-96 h-96 rounded-full glow-bg-cyan opacity-10 dark:opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-96 h-96 rounded-full glow-bg-purple opacity-10 dark:opacity-20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-effect p-6 rounded-2xl border text-center luxury-card ${stat.glow} flex flex-col justify-between bg-white/80 dark:bg-slate-900/40`}
              >
                <div className="mx-auto p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/50 mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center">
                  <Icon size={28} className="text-purple-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.desc}
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
