import { motion } from 'motion/react'
import { services, type Service } from '../../lib/data'
import { SectionHeading, Stagger, StaggerItem } from '../animations/Reveal'
import Tilt from '../ui/Tilt'
import { cn } from '../../lib/utils'

const ACCENT_TEXT: Record<Service['accent'], string> = {
  accent: 'text-accent',
  pink: 'text-pink',
  cyan: 'text-cyan',
}

const ACCENT_BG: Record<Service['accent'], string> = {
  accent: 'bg-accent/12 group-hover:bg-accent',
  pink: 'bg-pink/12 group-hover:bg-pink',
  cyan: 'bg-cyan/12 group-hover:bg-cyan',
}

const ACCENT_BORDER: Record<Service['accent'], string> = {
  accent: 'group-hover:border-accent/40',
  pink: 'group-hover:border-pink/40',
  cyan: 'group-hover:border-cyan/40',
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <StaggerItem className="h-full">
      <Tilt max={10} scale={1.015} className="h-full">
        <article
          data-cursor="explore"
          className={cn(
            'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-panel/50 p-7 backdrop-blur-md transition-colors duration-500 dark:bg-panel/40',
            ACCENT_BORDER[service.accent],
          )}
        >
          {/* big ghost index */}
          <span className="pointer-events-none absolute -right-2 top-2 select-none font-display text-7xl font-extrabold text-ink/[0.05] dark:text-ink/[0.07]">
            {service.index}
          </span>

          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: -6, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-2xl text-xl transition-colors duration-500',
              ACCENT_BG[service.accent],
            )}
          >
            <Icon size={24} className={cn('transition-colors duration-500 group-hover:text-white', ACCENT_TEXT[service.accent])} />
          </motion.div>

          <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-ink">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

          <div className="mt-6 flex items-center gap-2 border-t border-ink/8 pt-5">
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-transform duration-500 group-hover:scale-150',
                ACCENT_TEXT[service.accent],
              )}
              style={{ backgroundColor: 'currentColor' }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              service_{service.index}
            </span>
          </div>
        </article>
      </Tilt>
    </StaggerItem>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative section-pad">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="glow-orb left-[15%] bottom-[0%] h-[400px] w-[400px] bg-cyan/8 dark:bg-cyan/6" />
      </div>

      <div className="container-px relative">
        <SectionHeading
          eyebrow="Services"
          title="Everything you need, end to end."
          description="From the idea in your head to the product in front of your users — design, code and motion under one roof."
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.08}>
          {services.map((s) => (
            <ServiceCard key={s.index} service={s} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}