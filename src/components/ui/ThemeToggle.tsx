import { motion } from 'motion/react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../lib/theme'
import { cn } from '../../lib/utils'

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300',
        'border-ink/10 text-ink hover:border-ink/25',
        className,
      )}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        key={theme}
        initial={{ y: isDark ? 14 : -14, opacity: 0, rotate: isDark ? -60 : 60 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </motion.span>
    </motion.button>
  )
}