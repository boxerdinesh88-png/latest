import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  isLoading: boolean
}

// Keep in sync with the minimum intro time in App.tsx
export const INTRO_MS = 900

const ease = [0.76, 0, 0.24, 1] as const
const NAME = 'DINESH KUMAR'
const RING = 2 * Math.PI * 46 // circumference of the progress ring (r = 46)

// Counts 0 → 100 over INTRO_MS with an ease-out curve (deterministic, no random jumps)
function useIntroProgress(active: boolean) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / INTRO_MS, 1)
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])
  return progress
}

export default function Loader({ isLoading }: Props) {
  const progress = useIntroProgress(isLoading)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] overflow-hidden bg-primary"
          // Curtain lifts away from the bottom edge
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease }}
          aria-hidden="true"
        >
          {/* Ambient glow + dot grid */}
          <div className="glow-orb left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 bg-accent/20" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgb(var(--c-ink) / 0.1) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 60%)',
            }}
          />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center"
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Monogram inside a progress ring */}
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <defs>
                  <linearGradient id="loader-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgb(var(--c-ink) / 0.08)" strokeWidth="1.5" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#loader-ring)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={RING}
                  strokeDashoffset={RING * (1 - progress / 100)}
                />
              </svg>
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-[18px] flex items-center justify-center rounded-[22px] bg-gradient-primary font-display text-2xl font-bold text-white shadow-glow-purple"
              >
                DK
              </motion.div>
            </div>

            {/* Name, letter by letter */}
            <p className="mt-8 flex overflow-hidden font-display text-sm font-semibold tracking-[0.5em] text-white sm:text-base">
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.35em] text-faint"
            >
              Full Stack Developer
            </motion.p>
          </motion.div>

          {/* Corner details */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 sm:px-10 sm:pb-8">
            <p className="font-display text-5xl font-bold tabular-nums leading-none text-white/90 sm:text-7xl">
              {String(progress).padStart(3, '0')}
              <span className="text-2xl text-faint sm:text-3xl">%</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Portfolio © {new Date().getFullYear()}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]">
            <div
              className="h-full origin-left bg-gradient-to-r from-accent via-pink to-cyan"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
