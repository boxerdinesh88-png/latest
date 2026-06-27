import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function ExperienceSection() {
  const portfolio = usePortfolio()
  const { experience } = portfolio

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border-l-4 border-purple-600 bg-white dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-200"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-3">
                  {exp.company}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-4">{exp.summary}</p>

              <div className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1">•</span>
                    <p className="text-slate-600 dark:text-slate-400">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
