import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-white/[0.04] text-white transition-all duration-300 hover:border-accent/40 hover:shadow-btn ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? <Sun size={17} className="text-amber-300" /> : <Moon size={17} className="text-accent" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
