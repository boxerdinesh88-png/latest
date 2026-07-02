import { useRef, useState, ReactNode, ButtonHTMLAttributes } from 'react'

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

export default function RippleButton({ children, className = '', variant = 'primary', onClick: externalOnClick, ...props }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = idRef.current++
    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
    externalOnClick?.(e)
  }

  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25',
    secondary: 'glass glass-hover text-foreground',
    ghost: 'text-foreground/80 hover:text-foreground hover:bg-foreground/5',
  }

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-full px-6 py-3 font-medium transition-all duration-300 ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-foreground/30 animate-ripple"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </button>
  )
}
