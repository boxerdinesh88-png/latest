import { Github, Linkedin, Mail } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

interface SocialLinksProps {
  darkBg?: boolean
}

export default function SocialLinks({ darkBg = false }: SocialLinksProps) {
  const portfolio = usePortfolio()
  const { social } = portfolio.profile

  const links = [
    { icon: Github, url: social.github, label: 'GitHub' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${social.email}`, label: 'Email' },
  ].filter(link => link.url && link.url !== 'mailto:')

  return (
    <div className="flex gap-4 justify-center">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              darkBg
                ? "p-3 rounded-full bg-slate-800/80 hover:bg-purple-600/30 text-slate-200 hover:text-purple-300 border border-slate-700/50 backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
                : "p-3 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-purple-100 dark:hover:bg-purple-900 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 transform hover:scale-110"
            }
            aria-label={link.label}
          >
            <Icon size={20} />
          </a>
        )
      })}
    </div>
  )
}
