import { motion } from 'framer-motion'

const icons: Record<string, string> = {
  React: 'M12 2.5a18.5 18.5 0 0 1 9.5 3.3 18.5 18.5 0 0 1 0 12.4A18.5 18.5 0 0 1 12 21.5a18.5 18.5 0 0 1-9.5-3.3 18.5 18.5 0 0 1 0-12.4A18.5 18.5 0 0 1 12 2.5zm0 2.9c-2.7 0-5.2.6-7.3 1.7a13.1 13.1 0 0 0 .7 8.2 13.1 13.1 0 0 0 13.2 0 13.1 13.1 0 0 0 .7-8.2A13.1 13.1 0 0 0 12 5.4zm-3.2 8.3c.4 1.2 1 2.3 1.8 3.3a13 13 0 0 1-3.6-1.2 13 13 0 0 1 1.8-2.1zm6.4 0c.7.7 1.3 1.4 1.8 2.1a13 13 0 0 1-3.6 1.2 13 13 0 0 0 1.8-3.3zm-3.2 1.3a6.5 6.5 0 0 0-2.2 1.5c.7.2 1.4.4 2.2.4a6.5 6.5 0 0 0 2.2-.4 6.5 6.5 0 0 0-2.2-1.5z',
  Python: 'M11.9 2C8.7 2 7 3.3 7 4.9v3.6c0 1.6 1.5 2.5 3.3 2.5h3.4c2 0 3.3.8 3.3 2.6v2.5c0 1.6-1.4 3.1-3.3 3.3l-3.4.1c-2 0-3.3.8-3.3 2.5v2.5c0 1.6 1.5 2.4 3.3 2.4h3.4c2 0 2.9-1.3 3.3-2.5.4-1.1.1-2.4.1-4.1 0-1.7-1.2-2.5-3.1-2.5h-3.4c-2.1 0-3.4-.7-3.4-2.6V4.9C7 3.3 7.8 2 11.9 2zm-1.1 3.6c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1a1.1 1.1 0 0 0-1.1 1.1c0 .6.5 1.1 1.1 1.1z',
  Django: 'M12 2a10 10 0 1 0 10 10h-8V6.4A5.4 5.4 0 0 0 12 2zM9.5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
  JavaScript: 'M2 2h20v20H2V2zm6.8 15.6c.3.6.7 1 1.4 1.3.6.3 1.3.5 2.1.5 1 0 1.8-.3 2.4-.8.6-.5 1-1.2 1-2 0-.6-.2-1.1-.5-1.5-.4-.4-.8-.7-1.4-1-.3-.2-.6-.4-.8-.5-.3-.2-.5-.3-.7-.5-.2-.2-.3-.4-.3-.6 0-.3.2-.6.5-.8.3-.2.7-.3 1.2-.3.5 0 .9.1 1.2.3.3.2.5.4.7.7l1.5-1c-.4-.6-1-1-1.8-1.4-.7-.3-1.5-.5-2.4-.5-.9 0-1.7.2-2.4.6-.6.4-1 1-1 1.7 0 .6.2 1 .5 1.4.4.3.8.6 1.3.9l.7.4c.3.2.6.4.8.6.3.2.4.5.4.8 0 .4-.2.7-.6 1-.4.2-.9.4-1.5.4-.7 0-1.3-.2-1.7-.5-.4-.3-.7-.7-1-1.2l-1.6 1zm5.4-5.4h2.2l.2 2.4h1.5v-2.4h2.2v7.5h-2.2v-3.2h-1.5v3.2h-2.2V12.2z',
  TypeScript: 'M2 2h20v20H2V2zm17.2 12c-.2-.6-.5-1-1.1-1.4-.5-.4-1.2-.7-2-.9-.7-.2-1.3-.4-1.7-.6-.4-.2-.6-.4-.7-.7 0-.3 0-.5.2-.7.2-.2.5-.3.9-.3.5 0 .9.2 1.2.5.3.3.5.6.6 1l1.6-.9c-.3-.7-.8-1.2-1.4-1.6-.7-.4-1.5-.6-2.4-.6-.8 0-1.5.2-2.1.5-.6.3-1 .8-1.3 1.4-.3.6-.4 1.2-.4 1.9 0 .7.2 1.3.5 1.8.4.5.8.9 1.5 1.2l1.7.8c.5.2.8.4 1 .6.2.3.3.6.3 1 0 .5-.2.9-.6 1.2-.4.3-1 .5-1.7.5-.8 0-1.4-.2-1.8-.6a2.8 2.8 0 0 1-.8-1.5l-1.7.8c.2.8.6 1.4 1.3 2 .7.5 1.5.8 2.6.8.9 0 1.7-.2 2.4-.6.7-.4 1.2-1 1.5-1.6.4-.7.5-1.4.5-2.3 0-.7-.1-1.3-.4-1.8zm-4.8-2.1h-2.5v7.5H11v-7.5H8.5V10h5.9v2.1z',
  Tailwind: 'M12 2C7.8 2 5 4.4 5 7.2c0 2 1.5 3.7 3.6 4.3-.6.3-1.2.5-1.6.9-.5.4-.8 1-.8 1.7 0 1.2.8 2.2 2 2.5l-.1.1c-.5.7-.6 1.5-.6 2.3V20c0 1.3 1.1 2 2.5 2s2.5-.7 2.5-2l.2-2.5c0-1.2.5-2 1.7-2.7l.3-.2c1.4-.8 2.2-2.2 2.2-3.8 0-2.9-3-5.3-7.2-5.3z',
  'Node.js': 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 15.5c0 .8-.7 1.5-1.5 1.5H7.5c-.8 0-1.5-.7-1.5-1.5V9c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5v8.5zm6.5 0c0 .8-.7 1.5-1.5 1.5H14c-.8 0-1.5-.7-1.5-1.5V9c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5v8.5z',
  MySQL: 'M12 2a10 10 0 1 0 10 10h-8V6.4A5.4 5.4 0 0 0 12 2zM8 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm8 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z',
  Git: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-5.3 7.2l4.5-4.5c.4-.4 1-.4 1.4 0l.7.7c.2.2.2.5 0 .7L9.1 11c-.2.2-.5.2-.7 0l-.7-.7c-.2-.2-.2-.5 0-.7zm6.3 6.3c-.2.2-.5.2-.7 0l-.7-.7c-.2-.2-.2-.5 0-.7l4.5-4.5c.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7l-4.5 4.5zm-2-2.4c-.2.2-.5.2-.7 0l-1.8-1.8c-.2-.2-.2-.5 0-.7l.5-.5c.2-.2.5-.2.7 0l1.8 1.8c.2.2.2.5 0 .7l-.5.5z',
  GitHub: 'M12 0a12 12 0 0 0-3.8 23.4c.6.1.82-.26.82-.58v-2.06c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.22 1.83 1.22 1.06 1.82 2.78 1.3 3.46 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.46-2.38 1.22-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.33 3.3 1.22a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.76.84 1.22 1.92 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.42.36.82 1.1.82 2.22v3.28c0 .32.2.7.84.58A12 12 0 0 0 12 0z',
  GSAP: 'M12 2a10 10 0 1 0 10 10h-8V6.4A5.4 5.4 0 0 0 12 2z',
  Framer: 'M12 4V2H2v2h10zm0 8V6H2v6h10zm0 8v-6H2v6h10zm10-8V6H12v6h10zm0 8v-6H12v6h10z',
  Figma: 'M8.5 2a3.5 3.5 0 0 0 0 7H12V2H8.5zm0 8a3.5 3.5 0 0 0 0 7H12v-7H8.5zM12 5.5V2h3.5a3.5 3.5 0 0 1 0 7H12V5.5zm0 3.5h3.5a3.5 3.5 0 0 1 0 7H12V9zm-3.5 7a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  WordPress: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM5.9 7.2c1.5-1.8 3.7-2.9 6.1-2.9 2.6 0 5 1.1 6.5 3l-.4.2c-1.3-.6-2.8-1-4.5-1-4.1 0-7.5 1.8-8.5 4.3l-.7.1c-.1-.4-.2-.9-.2-1.3 0-1 .2-2 .6-2.9zm4.5 2.3c1.8.1 3.4.5 4.7 1.1 1.3.6 2.2 1.3 2.7 2.1.5.8.7 1.6.5 2.5-.2.9-.7 1.6-1.5 2.1-.8.5-1.8.7-3.1.7h-1.2l-1.9 5.6c-.2.1-.5.2-.8.3-.3.1-.6.1-.9.1-1.1 0-2-.3-2.7-.9-.7-.6-1.1-1.4-1.1-2.4 0-.5.1-1 .3-1.5l1.8-5.6c.1-.3.2-.5.3-.7.1-.2.3-.3.5-.4.1-.1.3-.1.4-.1zm-.8 12.1l1.5-4.5h-1.8c-.7 0-1.3-.1-1.7-.3-.4-.2-.7-.5-.8-.8l-1.5 4.5c-.1.4-.2.7-.2 1 0 .6.2 1.1.7 1.5.5.4 1.1.6 1.8.6.6 0 1.3-.1 2-.5zm3.5-6.4c.5 0 .9.2 1.2.5.3.3.4.7.3 1.2l-1.4 4.1c-.1.2-.1.4-.1.5 0 .3.1.5.3.6.2.1.5.2.9.2.3 0 .7-.1 1-.3l.7-.4c-.5 1.1-1.3 1.9-2.4 2.3-.5.2-1.1.3-1.7.3-1.3 0-2.3-.4-2.9-1.2-.6-.8-.8-1.9-.6-3.3.2-1.4.8-2.5 1.8-3.3 1-.8 2.2-1.2 3.5-1.2zm7.3-.6c.1.5.2 1 .2 1.5 0 2.6-1 4.9-2.8 6.7.4-.8.6-1.6.6-2.5 0-1.4-.5-2.6-1.5-3.5s-2.2-1.3-3.7-1.3c-1 0-1.9.2-2.7.7l.5-1.5c.5-.2 1.1-.3 1.7-.3h4.1c.8 0 1.5.1 2.2.2.2.2.4.3.6.6.2.3.3.5.4.7.1.3.2.6.2.8l.2.6v.3z',
  Elementor: 'M3 3h18v18H3V3zm4 4v10h3V7H7zm7 0v10h3V7h-3zm-2 4H9v6h3v-6zm0-4H9v2h3V7z',
  HTML5: 'M3 2l1.8 20.1L12 24l7.2-1.9L21 2H3zm15.2 3.9H8.4l.4 4.3h9.5l-.5 5.5L12 17.3l-5.8-1.6-.4-4.3h2.8l.2 2.2 3.2.9 3.2-.9.3-3.7H6.2L5.7 5.9h12.6l-.1.1z',
  CSS3: 'M3 2l1.8 20.1L12 24l7.2-1.9L21 2H3zm15.7 3.9H8.9l.3 3.9h9.2l-.8 8.7L12 20.5l-5.6-2-.4-4.3h2.7l.2 2.2 3.1 1 3.1-1 .3-3.9H6.1L5.4 5.9h12.6l-.3.1z',
  Bootstrap: 'M11.77 11.24H9.96V8.3h2.15c.98 0 1.52.3 1.52 1.07 0 .77-.55 1.35-1.86 1.35v-.48zm.23 1.03H9.96v3.27h2.17c1.02 0 1.63-.36 1.63-1.28 0-.89-.57-1.99-1.76-1.99zM12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm3.37 15.76c-.55.63-1.36.96-2.46.96H7.61V5.57h4.94c1.32 0 2.24.2 2.8.6.55.4.82.94.82 1.63 0 .68-.27 1.22-.82 1.62-.55.4-1.17.5-1.83.56v.09c.83.07 1.54.32 2.1.78.55.46.83 1.12.83 2a2.9 2.9 0 0 1-1.08 2.91z',
  API: 'M7 9l-5 5 5 5M17 9l5 5-5 5M14 4l-4 16',
  Database: 'M4 6c0 1.1 1.8 2 4 2s4-.9 4-2M4 6v4c0 1.1 1.8 2 4 2s4-.9 4-2V6M4 6c0-1.1 1.8-2 4-2s4 .9 4 2m0 4v4c0 1.1-1.8 2-4 2s-4-.9-4-2v-4',
  Widget: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z',
  Paint: 'M20.7 3.3a1 1 0 0 0-1.4 0L3.7 18.9a1 1 0 0 0-.3.7V21h1.4a1 1 0 0 0 .7-.3L20.7 4.7a1 1 0 0 0 0-1.4zM16 3l5 5M3 21l6-6',
  Cloud: 'M18 10h-1.3A6 6 0 0 0 6.2 10H6a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z',
  Sparkles: 'M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zM4 18l2 2-2 2M20 18l2 2-2 2M12 20l2 2-2 2',
  Responsive: 'M4 5v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zm4 0h8v10H8V5zm0 12h8v2H8v-2z',
  PythonAnywhere: 'm12 2v4m0 0a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4m0-10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4m0 0v4m-6-2h12',
}

const nameMap: Record<string, string> = {
  'React.js': 'React',
  'JavaScript': 'JavaScript',
  'HTML5 / CSS3': 'CSS3',
  'Responsive Design': 'Responsive',
  'GSAP Animations': 'GSAP',
  'Bootstrap 5 & Tailwind CSS': 'Tailwind',
  'Python': 'Python',
  'Django': 'Django',
  'REST APIs': 'API',
  'Node.js': 'Node.js',
  'WordPress': 'WordPress',
  'Elementor': 'Elementor',
  'Custom Widgets': 'Widget',
  'Theme Customization': 'Paint',
  'MySQL': 'MySQL',
  'Database Design': 'Database',
  'Git & GitHub': 'Git',
  'PythonAnywhere': 'PythonAnywhere',
  'Figma': 'Figma',
  'AI Integration': 'Sparkles',
  'Git': 'Git',
  'GitHub': 'GitHub',
  'Bootstrap': 'Bootstrap',
  'HTML5': 'HTML5',
  'CSS3': 'CSS3',
  'Framer': 'Framer',
  'React': 'React',
  'Tailwind': 'Tailwind',
  'TypeScript': 'TypeScript',
  'GSAP': 'GSAP',
}

export function getTechIconPath(name: string): string | undefined {
  const canonical = nameMap[name]
  return canonical ? icons[canonical] : icons[name]
}

export function TechIcon({ name, size = 32 }: { name: string; size?: number }) {
  const pathData = getTechIconPath(name)
  if (!pathData) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="shrink-0">
      <path d={pathData} />
    </svg>
  )
}

export function TechIconMarquee({ name, color }: { name: string; color: string }) {
  const pathData = getTechIconPath(name)
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl glass whitespace-nowrap">
      {pathData ? (
        <svg viewBox="0 0 24 24" width={20} height={20} fill={color} className="shrink-0">
          <path d={pathData} />
        </svg>
      ) : (
        <span className="w-5 h-5 rounded-full" style={{ backgroundColor: color }} />
      )}
      <span className="text-foreground/70 text-sm font-medium">{name}</span>
    </div>
  )
}

export function TechIconGrid({ name, color }: { name: string; color: string }) {
  const pathData = getTechIconPath(name)
  return (
    <motion.div
      className="glass rounded-2xl p-6 flex flex-col items-center gap-3 glass-hover cursor-default group"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {pathData ? (
        <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ color }}>
          <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor">
            <path d={pathData} />
          </svg>
        </div>
      ) : (
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-foreground/60 text-xs text-center">{name}</span>
    </motion.div>
  )
}
