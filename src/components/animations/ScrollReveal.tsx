import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  once?: boolean
  distance?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  distance = 40,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          ...directionMap[direction],
        }}
        animate={isInView ? {
          opacity: 1,
          x: 0,
          y: 0,
        } : {}}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
