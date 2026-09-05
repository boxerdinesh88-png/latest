import { motion, useInView, type HTMLMotionProps, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_SPRING = { type: 'spring', stiffness: 120, damping: 22 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: (i: number = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: i * 0.1 },
  }),
}

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'className'> {
  children: ReactNode
  variant?: Variants
  delay?: number
  amount?: number
  once?: boolean
  className?: string
}

/** Fades content up when scrolled into view. */
export function Reveal({
  children,
  variant = fadeUp,
  delay = 0,
  amount = 0.3,
  once = true,
  className,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      custom={delay}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
}

/** Container that staggers its children (which should use fadeUp etc.). */
export function Stagger({ children, className, delay = 0, amount = 0.2 }: StaggerProps) {
  return (
    <motion.div
      custom={delay}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  variant?: Variants
}

export function StaggerItem({ children, className, variant = fadeUp }: StaggerItemProps) {
  return (
    <motion.div variants={variant} className={className}>
      {children}
    </motion.div>
  )
}

interface SplitTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  once?: boolean
  amount?: number
}

/** Reveals text word-by-word with a staggered mask lift. */
export function SplitText({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  once = true,
  amount = 0.4,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as unknown as React.RefObject<Element>, { once, amount })
  const words = text.split(' ')

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={cn('overflow-hidden', className)}>
      <span className="inline-block">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-top" style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.045 }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, className, align = 'left' }: SectionHeadingProps) {
  return (
    <Stagger className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <StaggerItem>
        <span className="eyebrow">
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </span>
      </StaggerItem>
      <StaggerItem>
        <SplitText as="h2" text={title} amount={0.6} className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl" />
      </StaggerItem>
      {description && (
        <StaggerItem>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
        </StaggerItem>
      )}
    </Stagger>
  )
}