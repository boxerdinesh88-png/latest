import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    let dotShown = false

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!dotShown) {
        dotShown = true
        setVisible(true)
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      if (target) {
        setLabel(target.dataset.cursor || '')
        document.documentElement.classList.add('cursor-labeled')
      } else {
        setLabel('')
        document.documentElement.classList.remove('cursor-labeled')
      }
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] hidden md:block" aria-hidden="true">
      {/* dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />

      {/* ring */}
      <motion.div
        className={`absolute flex items-center justify-center rounded-full border border-ink/30 transition-[width,height,opacity] duration-300 ${
          pressed ? 'border-ink' : ''
        }`}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: label ? 76 : pressed ? 44 : 36,
          height: label ? 76 : pressed ? 44 : 36,
          opacity: visible ? 1 : 0,
        }}
      >
        {label && (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-ink">{label}</span>
        )}
      </motion.div>
    </div>
  )
}