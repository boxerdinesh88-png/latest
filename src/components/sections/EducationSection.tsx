import { GraduationCap } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'

const eduImages = [
  {
    label: 'University',
    pattern: [
      'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'M12 2v20M2 7v10M22 7v10',
    ],
  },
  {
    label: 'Code',
    pattern: [
      'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3',
      'M12 8v8M8 12h8',
    ],
  },
  {
    label: 'Retro',
    pattern: [
      'M4 6h16M4 10h16M4 14h16M4 18h16',
      'M6 4v16M10 4v16M14 4v16M18 4v16',
    ],
  },
  {
    label: 'Vintage',
    pattern: [
      'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
      'M9 9h6v6H9z',
    ],
  },
]

function RetroTechBg({ index }: { index: number }) {
  const img = eduImages[index % eduImages.length]
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.04] pointer-events-none">
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {img.pattern.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/10" />
    </div>
  )
}

export default function EducationSection() {
  const { education } = usePortfolio()

  return (
    <section id="education" className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Education</span>
          </div>
          <SplitText text="Academic Background" className="section-title mb-6" />
          <p className="section-subtitle mb-16">
            Formal education and professional training.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {education.length === 0 ? (
            <div className="col-span-full glass rounded-2xl p-12 text-center">
              <GraduationCap size={40} className="text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/40">Education details coming soon.</p>
            </div>
          ) : (
            education.map((edu, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 glass-hover group relative overflow-hidden">
                  <RetroTechBg index={i} />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 ring-1 ring-amber-500/10 group-hover:ring-amber-500/30 transition-all duration-500">
                      <GraduationCap size={24} className="text-amber-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-accent text-sm mb-1">{edu.institution}</p>
                    <p className="text-foreground/40 text-xs">{edu.field}</p>
                    <div className="mt-3 pt-3 border-t border-foreground/[0.06]">
                      <span className="text-foreground/30 text-xs">{edu.period}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
