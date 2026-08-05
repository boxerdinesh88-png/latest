import { useRef, useState, ReactNode, ButtonHTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  x: number
  y: number
  id: number
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function RippleButton({
  children,
  className = '',
  variant = 'primary',
  onClick: externalOnClick,
  ...props
}: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = idRef.current++
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650)
    }
    externalOnClick?.(e)
  }

  const variantStyles = {
    primary: 'bg-gradient-primary text-white shadow-btn hover:shadow-glow-purple',
    secondary: 'glass text-muted hover:text-white',
    ghost: 'text-faint hover:text-white hover:bg-white/[0.05]',
  }

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:brightness-110 active:scale-95 ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-white/25"
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              left: ripple.x - 150,
              top: ripple.y - 150,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}
