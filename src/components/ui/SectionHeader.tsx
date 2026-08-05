import { motion } from 'framer-motion'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: Props) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <motion.div
      className={`flex flex-col ${alignCls} mb-16`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="eyebrow">
        <span className="h-px w-8 bg-cyan/60" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-8 bg-cyan/60" aria-hidden="true" />
      </span>
      <h2 className="section-title mt-5 font-display text-white">
        <span className="gradient-text-animated">{title}</span>
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </motion.div>
  )
}
