import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

interface Props {
  isLoading: boolean
  themeKey?: string
}

export default function Loader({ isLoading, themeKey }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 18
      })
    }, 160)
    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <motion.div className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div
              key={themeKey}
              initial={{ rotate: -8, scale: 0.94 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white shadow-glow"
              style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)' }}
            >
              D
            </motion.div>
            <div className="h-1 w-52 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899,#22d3ee)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-5 flex w-52 items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-faint">{Math.min(Math.round(progress), 100)}%</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">loading</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}