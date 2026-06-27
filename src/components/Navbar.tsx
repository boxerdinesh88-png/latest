import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 z-40 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold gradient-text select-none cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Dinesh Kumar
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Premium Sliding Pill Theme Toggle (Desktop) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className="relative w-14 h-8 rounded-full p-1 bg-slate-200 dark:bg-slate-800 transition-colors duration-300 flex items-center justify-between cursor-pointer focus:outline-none shadow-inner border border-slate-300/30 dark:border-slate-700/50"
              aria-label="Toggle theme"
            >
              {/* Sliding Thumb */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute w-6 h-6 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center shadow-md z-10"
                style={{ left: isDark ? 'calc(100% - 1.75rem)' : '0.25rem' }}
              >
                {isDark ? (
                  <Sun size={12} className="text-amber-500 fill-amber-500 animate-spin-slow" />
                ) : (
                  <Moon size={12} className="text-purple-500 fill-purple-500" />
                )}
              </motion.div>
              
              {/* Icons inside the pill track */}
              <Sun size={14} className="text-slate-400 ml-1.5 dark:text-slate-600" />
              <Moon size={14} className="text-slate-600 mr-1.5 dark:text-slate-400" />
            </motion.button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-4">
            {/* Premium Sliding Pill Theme Toggle (Mobile) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className="relative w-14 h-8 rounded-full p-1 bg-slate-200 dark:bg-slate-800 transition-colors duration-300 flex items-center justify-between cursor-pointer focus:outline-none shadow-inner border border-slate-300/30 dark:border-slate-700/50"
              aria-label="Toggle theme"
            >
              {/* Sliding Thumb */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute w-6 h-6 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center shadow-md z-10"
                style={{ left: isDark ? 'calc(100% - 1.75rem)' : '0.25rem' }}
              >
                {isDark ? (
                  <Sun size={12} className="text-amber-500 fill-amber-500" />
                ) : (
                  <Moon size={12} className="text-purple-500 fill-purple-500" />
                )}
              </motion.div>
              
              <Sun size={14} className="text-slate-400 ml-1.5 dark:text-slate-600" />
              <Moon size={14} className="text-slate-600 mr-1.5 dark:text-slate-400" />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
            >
              <div className="flex flex-col gap-1 pt-2 pb-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                      setTimeout(() => {
                        const el = document.querySelector(item.href)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }, 250)
                    }}
                    className="block w-full py-2.5 px-3 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
