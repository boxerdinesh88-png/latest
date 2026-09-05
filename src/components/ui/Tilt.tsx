import { useRef, type ReactNode, type MouseEvent } from 'react'

interface TiltProps {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
  glare?: boolean
}

/** Cursor-following 3D tilt card with optional glare highlight. */
export default function Tilt({ children, className, max = 8, scale = 1.015, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max
    const ry = (px - 0.5) * max

    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, 1)`

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgb(var(--accent) / 0.18), transparent 55%)`
      glareRef.current.style.opacity = '1'
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative will-change-transform ${className ?? ''}`}
      style={{ transition: 'transform 0.25s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}