import { useEffect, useRef } from 'react'

interface Props {
  className?: string
}

/** Lightweight fixed canvas of drifting particles, honoring reduced motion. */
export default function Particles({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const ctx = context

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let raf = 0

    let particles: { x: number; y: number; r: number; s: number; o: number }[] = []

    const populate = () => {
      const count = Math.floor((width * height) / 16000)
      particles = Array.from({ length: Math.min(count, 70) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        s: Math.random() * 0.25 + 0.06,
        o: Math.random() * 0.5 + 0.15,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      populate()
    }

    // static render when reduced motion is requested
    const draw = reduced ? () => render() : () => {
      for (const p of particles) {
        p.y -= p.s
        p.x += Math.sin(p.y * 0.004 + p.r) * 0.05
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
      }
      render()
    }

    function render() {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${p.o})`
        ctx.fill()
      }
    }

    const tick = () => {
      draw()
      if (!reduced) raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`pointer-events-none fixed inset-0 ${className ?? ''}`} aria-hidden="true" />
}