import { usePortfolio } from '../../lib/usePortfolio'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const { profile } = usePortfolio()
  const social = profile.social

  const socials = [
    { icon: Github, href: social.github, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${social.email}`, label: 'Email' },
  ]

  return (
    <footer className="relative border-t border-white/[0.05] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold gradient-text">
              DK<span className="text-white/30">.</span>
            </span>
            <p className="text-white/30 text-sm mt-1">
              Full Stack Python Developer
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ) : null
            )}
          </div>

          <p className="text-white/20 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Made with <Heart size={12} className="text-red-400" /> by Dinesh Kumar
          </p>
        </div>
      </div>
    </footer>
  )
}
