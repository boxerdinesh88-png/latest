import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const circumference = 2 * Math.PI * 25

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setProgress(pct)
      setVisible(scrollTop > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const springProgress = useSpring(progress, { stiffness: 50, damping: 15 })
  const dashOffset = useTransform(springProgress, [0, 1], [circumference, 0])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.3, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 0.03, 0.26, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_35px_rgba(34,197,94,0.12)] dark:hover:shadow-[0_8px_35px_rgba(34,197,94,0.15)] flex items-center justify-center cursor-pointer group transition-shadow duration-500"
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-200/50 dark:text-slate-800" />
            <motion.circle
              cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashOffset }}
              className="text-green-500 dark:text-green-400"
            />
          </svg>

          {/* Arrow Icon */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <ArrowUp size={16} className="text-slate-500 dark:text-slate-400 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300" />
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
