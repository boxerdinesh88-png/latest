import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'

export default function SkillsSection() {
  const portfolio = usePortfolio()
  const { skills } = portfolio

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const getPercent = (level: string) => {
    switch (level) {
      case 'Expert': return 95
      case 'Advanced': return 85
      case 'Intermediate': return 70
      default: return 55
    }
  }

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50 dark:bg-[#070A13] transition-colors duration-300 scroll-mt-20">
      {/* Background glow filters */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full glow-bg-purple opacity-10 dark:opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full glow-bg-cyan opacity-10 dark:opacity-20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Skills & <span className="bg-gradient-to-r from-purple-600 to-cyan-400 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full mx-auto md:mx-0" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-sm md:text-base">
            Professional breakdown of technologies, methodologies, and frameworks I leverage to design high-performance web systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, idx) => {
            const isPurpleTheme = idx % 2 === 0
            const themeColorClass = isPurpleTheme 
              ? 'from-purple-500 to-indigo-500 shadow-[0_0_8px_rgba(139,92,246,0.15)] dark:shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
              : 'from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.15)] dark:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
            
            const badgeBg = isPurpleTheme
              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20'
              : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20'
            
            const cardGlow = isPurpleTheme ? 'neon-border-purple' : 'neon-border-cyan'

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl glass-effect border luxury-card ${cardGlow} bg-white/80 dark:bg-slate-900/40`}
              >
                <h3 className={`text-2xl font-bold mb-8 ${isPurpleTheme ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                  {category.category}
                </h3>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {category.skills.map((skill) => (
                    <motion.div key={skill.name} variants={itemVariants} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-wide">
                          {skill.name}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${badgeBg}`}>
                          {skill.level}
                        </span>
                      </div>
                      
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden p-[1px] border border-slate-300/30 dark:border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getPercent(skill.level)}%` }}
                          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                          viewport={{ once: true }}
                          className={`h-full rounded-full bg-gradient-to-r ${themeColorClass}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
