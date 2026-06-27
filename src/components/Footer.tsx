import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const portfolio = usePortfolio()
  const { profile } = portfolio
  const currentYear = new Date().getFullYear()

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">{profile.shortName}</h3>
            <p className="text-slate-400">{profile.specialization}</p>
            <p className="text-slate-400 text-sm mt-2">{profile.location}</p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Connect</h4>
            <SocialLinks darkBg />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Designed & Built with React, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
