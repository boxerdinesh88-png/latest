import { useRef, ReactNode, HTMLAttributes } from 'react'

// Wraps an existing button/link and pulls it toward the cursor. Renders a
// <div> so the interactive child is never nested inside another button.
interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className = '', strength = 0.25, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </div>
  )
}
