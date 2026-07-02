import { GraduationCap, BookOpen } from 'lucide-react'
import { usePortfolio } from '../../lib/usePortfolio'
import ScrollReveal from '../animations/ScrollReveal'
import SplitText from '../animations/SplitText'

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
              <GraduationCap size={40} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Education details coming soon.</p>
            </div>
          ) : (
            education.map((edu, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 glass-hover group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{edu.degree}</h3>
                  <p className="text-accent text-sm mb-1">{edu.institution}</p>
                  <p className="text-white/30 text-xs">{edu.field}</p>
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <span className="text-white/20 text-xs">{edu.period}</span>
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
