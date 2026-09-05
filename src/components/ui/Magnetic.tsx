import { useRef, useState, type ReactNode, type CSSProperties } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'a' | 'button' | 'div'
  href?: string
  style?: CSSProperties
  onClick?: () => void
}

/**
 * Magnetic wrapper — the child drifts toward the cursor, springs back on leave.
 * Disabled automatically on touch/coarse pointers.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.35,
  as = 'button',
  href,
  style,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null)
  const [coarse] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : true,
  )

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || coarse || !(el instanceof HTMLElement)) return
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

  const shared = {
    ref: ref as React.Ref<never>,
    className,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
  }

  if (as === 'a') {
    return (
      <a href={href} {...shared} className={className}>
        {children}
      </a>
    )
  }
  if (as === 'div') {
    return (
      <div {...shared} className={className}>
        {children}
      </div>
    )
  }
  return (
    <button type="button" {...shared} className={className}>
      {children}
    </button>
  )
}