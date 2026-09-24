import { useEffect, useRef } from 'react'

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let time = 0

    // The blobs are soft gradients, so render at a quarter of the resolution
    // and let CSS scale the canvas up: looks the same, ~16x fewer pixels to paint.
    const SCALE = 0.25
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth * SCALE)
      canvas.height = Math.ceil(window.innerHeight * SCALE)
    }

    const colors = [
      { r: 124, g: 58, b: 237 },
      { r: 236, g: 72, b: 153 },
      { r: 6, g: 182, b: 212 },
      { r: 167, g: 139, b: 250 },
    ]

    const blobs = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * window.innerWidth * SCALE,
      y: Math.random() * window.innerHeight * SCALE,
      vx: (Math.random() - 0.5) * 0.3 * SCALE,
      vy: (Math.random() - 0.5) * 0.3 * SCALE,
      radius: (200 + Math.random() * 300) * SCALE,
      color: colors[i],
      phase: Math.random() * Math.PI * 2,
    }))

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let last = 0

    const draw = (now = 0) => {
      animationId = requestAnimationFrame(draw)
      // ~30fps is plenty for slow drifting colour; skip frames when the tab is hidden
      if (document.hidden || now - last < 33) return
      last = now
      time += 0.004
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob) => {
        blob.x += blob.vx + Math.sin(time + blob.phase) * 0.2 * SCALE
        blob.y += blob.vy + Math.cos(time + blob.phase) * 0.2 * SCALE

        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        )
        const alpha = 0.08 + Math.sin(time + blob.phase) * 0.03
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(
          blob.x - blob.radius,
          blob.y - blob.radius,
          blob.radius * 2,
          blob.radius * 2
        )
      })
    }

    resize()
    if (reducedMotion) {
      // Paint a single still frame
      last = -Infinity
      draw()
      cancelAnimationFrame(animationId)
    } else {
      draw()
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full dark:mix-blend-screen"
      aria-hidden="true"
    />
  )
}
