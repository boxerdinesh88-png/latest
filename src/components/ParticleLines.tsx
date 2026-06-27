import { useRef, useEffect } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number; r: number
}

export default function ParticleLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    const isMobile = window.innerWidth < 640
    const count = isMobile ? 30 : 70
    const linkDist = isMobile ? 100 : 130

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    const handleLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouse, { passive: true })
      window.addEventListener('mouseleave', handleLeave)
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 1.8 + 1.2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mx > -9999

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120
            p.vx += (dx / dist) * force * 0.08
            p.vy += (dy / dist) * force * 0.08
          }
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        p.vx *= 0.99
        p.vy *= 0.99
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(80,176,102,${0.18 * (1 - dist / linkDist)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        if (mouseActive && !isMobile) {
          const dx = particles[i].x - mx
          const dy = particles[i].y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mx, my)
            ctx.strokeStyle = `rgba(80,176,102,${0.25 * (1 - dist / 200)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].r * 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(80,176,102,0.06)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(80,176,102,0.45)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none"
    />
  )
}
