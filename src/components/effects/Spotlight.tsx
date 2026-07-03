import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      el.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(139, 92, 246, 0.06), transparent 80%)`
    }

    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500"
    />
  )
}
