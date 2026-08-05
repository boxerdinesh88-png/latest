import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      cursor.style.transform = `translate(${cursorX - 12}px, ${cursorY - 12}px)`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    animate()

    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 border border-purple-400/30 rounded-full pointer-events-none z-[9999] hidden lg:block transition-colors duration-300"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={dotRef}
        className="fixed w-1.5 h-1.5 bg-purple-400 rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
