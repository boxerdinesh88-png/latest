import { motion } from 'motion/react'

const BLOBS = [
  { top: '-12%', left: '-6%', size: 480, color: '#7c3aed', delay: 0 },
  { top: '30%', left: '60%', size: 420, color: '#ec4899', delay: 1.4 },
  { bottom: '-6%', left: '18%', size: 460, color: '#22d3ee', delay: 2.6 },
]

export default function GradientMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            bottom: b.bottom,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color}28, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.12, 0.96, 1],
          }}
          transition={{
            duration: 18 + i * 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: b.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base/60" />
    </div>
  )
}