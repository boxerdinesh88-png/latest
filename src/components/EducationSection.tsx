import { motion } from 'framer-motion'
import { Calendar, GraduationCap, BookOpen } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const instituteIcons: Record<string, string> = {
  'DUCAT Institute, Noida-63': '/ducat.webp',
  'GMSBV Shahdara, Delhi': '/g.webp',
  'SFCS Loni Rampark': '/slide-1-1.jpg',
}

export default function EducationSection() {
  const portfolio = usePortfolio()
  const { education } = portfolio

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#070A13]">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-green-500/5 dark:bg-green-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.03, 0.26, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/60 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-semibold tracking-wider uppercase border border-green-200/50 dark:border-green-500/20 mb-5">
            <BookOpen size={12} />
            Academic Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-5" />
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Academic background and professional training that built the foundation for my engineering career.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          {education.map((edu, index) => {
            const isDucat = edu.institution.startsWith('DUCAT')
            const imgSrc = instituteIcons[edu.institution]
            const isLast = index === education.length - 1

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 0.03, 0.26, 1] }}
                viewport={{ once: true, margin: '-60px' }}
                className="group relative"
              >
                {/* Timeline connector */}
                {!isLast && (
                  <div className="hidden md:block absolute left-12 top-28 bottom-0 w-px bg-gradient-to-b from-green-400/40 via-green-400/20 to-transparent" />
                )}

                <div className={`relative flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 lg:p-10 rounded-3xl border transition-all duration-500 ${
                  isDucat
                    ? 'bg-white dark:bg-green-950/10 border-green-200/60 dark:border-green-500/15 shadow-[0_4px_30px_rgba(34,197,94,0.06)] dark:shadow-[0_4px_30px_rgba(34,197,94,0.06)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.12)] dark:hover:shadow-[0_12px_40px_rgba(34,197,94,0.12)]'
                    : 'bg-white dark:bg-white/[0.03] border-slate-200/60 dark:border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
                }`}>
                  {/* Image / Icon Column */}
                  <div className="flex-shrink-0">
                    {imgSrc ? (
                      <div className="relative w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border border-green-200/30 dark:border-green-500/10 bg-green-50 dark:bg-green-950/20">
                        <motion.img
                          src={imgSrc}
                          alt={edu.institution}
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/15 dark:to-emerald-500/15 border border-green-200/50 dark:border-green-500/15 flex items-center justify-center">
                        <GraduationCap size={28} className="text-green-600 dark:text-green-400" />
                      </div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="space-y-1">
                        <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tight ${
                          isDucat
                            ? 'text-green-800 dark:text-green-300'
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {edu.degree}
                        </h3>
                        <p className={`text-sm md:text-base font-semibold ${
                          isDucat
                            ? 'text-green-600 dark:text-green-400/80'
                            : 'text-green-600 dark:text-green-400/60'
                        }`}>
                          {edu.institution}
                        </p>
                      </div>
                      <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase ${
                        isDucat
                          ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-500/15'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]'
                      }`}>
                        <Calendar size={11} />
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400/80 text-sm md:text-base mb-4 leading-relaxed">
                      {edu.field}
                    </p>

                    {/* Skills pills for DUCAT */}
                    {isDucat && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 mt-4"
                      >
                        {['Python', 'Django', 'React', 'MySQL', 'REST APIs'].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-lg bg-green-50 dark:bg-green-500/8 text-green-600 dark:text-green-400/70 border border-green-200/50 dark:border-green-500/15"
                          >
                            {skill}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
