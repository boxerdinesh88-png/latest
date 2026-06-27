import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'

export default function AboutSection() {
  const portfolio = usePortfolio()
  const { profile, projects } = portfolio

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Column 1: Sleek Avatar Card */}
          {profile.avatarUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden aspect-square bg-gradient-to-tr from-purple-600 via-pink-600 to-red-600 p-[3px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] max-w-sm mx-auto lg:max-w-none w-full"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-white font-bold text-xl">{profile.name}</span>
                  <span className="text-purple-300 text-sm font-medium">{profile.role}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Column 2: Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {profile.bio}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              I believe in writing clean, maintainable code and creating solutions that scale. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or focusing on high-quality engineering.
            </p>
          </motion.div>

          {/* Column 3: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-200">
              <div className="text-3xl font-bold gradient-text mb-2">{profile.yearsOfExperience}</div>
              <p className="text-slate-600 dark:text-slate-400">Years of Experience</p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-200">
              <div className="text-3xl font-bold gradient-text mb-2">{projects.length}+</div>
              <p className="text-slate-600 dark:text-slate-400">Projects Completed</p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-200">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <p className="text-slate-600 dark:text-slate-400">Lines of Code</p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-200">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <p className="text-slate-600 dark:text-slate-400">Commitment & Quality</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
