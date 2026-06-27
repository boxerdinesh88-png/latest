import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function TestimonialsSection() {
  const portfolio = usePortfolio()
  const testimonials = portfolio.testimonials || [
    {
      name: "Alex Mercer",
      role: "Product Architect at DevScale",
      text: "Dinesh is an exceptional Full-Stack Engineer. He took our legacy Python backend, completely modularized it into REST APIs, and built a lightning-fast React dashboard that increased user retention. Highly recommended!",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Operations Manager at Shining Services",
      text: "The business booking platform Dinesh created has completely streamlined our operational workflow. It's fast, elegant, and extremely robust under heavy database request volumes. Five-star engineering!",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50 dark:bg-slate-900/10">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full glow-bg-purple opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Feedback</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto md:mx-0" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl">
            Read positive feedback from recruiters, project managers, and business clients regarding operational and deployment successes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => {
            const glowClass = idx % 2 === 0 ? 'neon-border-purple' : 'neon-border-cyan'
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-8 rounded-2xl glass-effect border border-slate-200 dark:border-slate-800 luxury-card ${glowClass} bg-white dark:bg-slate-900/30 relative flex flex-col justify-between`}
              >
                <div className="absolute top-6 right-8 text-slate-200 dark:text-slate-800 opacity-20 dark:opacity-40">
                  <Quote size={56} />
                </div>
                <div className="space-y-6">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed relative z-10 text-base">
                    "{item.text}"
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 border-t border-slate-200/50 dark:border-slate-800/85 pt-6">
                  {/* Initial Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      {item.role}
                    </p>
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
