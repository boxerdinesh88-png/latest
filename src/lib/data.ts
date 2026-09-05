import { Github, Linkedin, Instagram, Mail, Braces, Palette, Clapperboard, Rocket, PenTool, Layers, MousePointerClick, Workflow, Globe, MonitorSmartphone, Building2, Wand2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const profile = {
  name: 'Dinesh',
  fullName: 'Dinesh Kumar',
  role: 'Full-Stack Developer × Graphic Designer',
  email: 'boxerdinesh88@gmail.com',
  location: 'Delhi, India',
  available: true,
}

export const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/boxerdinesh88-png/boxerdinesh88-png' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dinesh-kumar-6a6b9530b' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:boxerdinesh88@gmail.com' },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

/* ------------------------------ About ------------------------------ */

export interface Discipline {
  index: string
  title: string
  blurb: string
  tags: string[]
  accent: 'accent' | 'pink' | 'cyan'
}

export const disciplines: Discipline[] = [
  {
    index: '01',
    title: 'Full-Stack Development',
    blurb: 'Systems that are fast, secure and built to scale — from database to deployment.',
    tags: ['Python', 'Django', 'REST APIs', 'React', 'JavaScript', 'PostgreSQL', 'APIs', 'Deployment'],
    accent: 'accent',
  },
  {
    index: '02',
    title: 'Graphic Design',
    blurb: 'Identities and interfaces with intent — every pixel earns its place.',
    tags: ['Brand Identity', 'UI/UX', 'Social Media', 'Marketing Graphics', 'Typography', 'Visual Systems'],
    accent: 'pink',
  },
  {
    index: '03',
    title: 'Motion & 3D',
    blurb: 'Movement that tells the story — animated with purpose, never noise.',
    tags: ['Motion Graphics', '3D Concepts', 'Interactive Experiences', 'Animation'],
    accent: 'cyan',
  },
]

/* ------------------------------ Skills ------------------------------ */

export interface SkillGroup {
  id: string
  label: string
  accent: 'accent' | 'pink' | 'cyan'
  skills: { name: string; note: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'development',
    label: 'Development',
    accent: 'accent',
    skills: [
      { name: 'Python', note: 'Backend logic, scripting & automation' },
      { name: 'Django', note: 'Full-stack web framework' },
      { name: 'Django REST Framework', note: 'Secure, typed APIs' },
      { name: 'React', note: 'Interactive component UIs' },
      { name: 'JavaScript', note: 'The language of the web' },
      { name: 'HTML', note: 'Semantic, accessible structure' },
      { name: 'CSS', note: 'Layouts, design systems' },
      { name: 'PostgreSQL', note: 'Relational data at scale' },
      { name: 'REST APIs', note: 'Client-server communication' },
      { name: 'Git', note: 'Version control & collaboration' },
      { name: 'Deployment', note: 'Ship to production safely' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    accent: 'pink',
    skills: [
      { name: 'Figma', note: 'Product design & prototyping' },
      { name: 'Adobe Photoshop', note: 'Image & retouch craft' },
      { name: 'Illustrator', note: 'Vector & brand artwork' },
      { name: 'Brand Design', note: 'Identities that last' },
      { name: 'UI/UX', note: 'Interfaces people love' },
      { name: 'Typography', note: 'Type as voice' },
      { name: 'Visual Design', note: 'Composition, color, hierarchy' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative',
    accent: 'cyan',
    skills: [
      { name: 'Motion Graphics', note: 'Kinetic storytelling' },
      { name: '3D Design', note: 'Depth, light & form' },
      { name: 'Animation', note: 'Motion with intent' },
      { name: 'Creative Direction', note: 'The vision behind the work' },
    ],
  },
]

/* ------------------------------ Projects ------------------------------ */

export interface Project {
  id: string
  index: string
  title: string
  category: string
  description: string
  stack: string[]
  image: string
  link: string
  github?: string
  accent: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'gemological',
    index: '01',
    title: 'Gemological Certification System',
    category: 'Full-Stack Web App',
    description:
      'End-to-end certification platform with secure certificate generation, gemstone records and a live admin dashboard.',
    stack: ['Django', 'DRF', 'React', 'PostgreSQL', 'PythonAnywhere'],
    image: '/project%20image/img_3.png',
    link: 'https://gtlrc.com',
    accent: '#7c3aed',
    featured: true,
  },
  {
    id: 'event-directory',
    index: '02',
    title: 'Event Directory',
    category: 'SaaS Dashboard',
    description:
      'Multi-role event management app with OTP + OAuth login, real-time registration tracking and an admin control system.',
    stack: ['Django', 'MySQL', 'OAuth', 'Bootstrap', 'PythonAnywhere'],
    image: '/project%20image/screencapture-eventdirectory-pythonanywhere-auth-login-2026-06-27-10_38_18.png',
    link: 'https://eventdirectory.pythonanywhere.com/auth/login/',
    accent: '#ec4899',
  },
  {
    id: 'booking-platform',
    index: '03',
    title: 'Business Booking Platform',
    category: 'E-Commerce Platform',
    description:
      'Service platform with dynamic content management, secure contact pipelines and a 40% faster caching strategy.',
    stack: ['Python', 'Django', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    image: '/project%20image/screencapture-boxerdinesh88-png-github-io-Shi-ning-services-2026-06-27-10_43_48.png',
    link: 'https://boxerdinesh88-png.github.io/Shi-ning-services/',
    github: 'https://github.com/boxerdinesh88-png/Shi-ning-services',
    accent: '#22d3ee',
  },
  {
    id: 'luxury-brand',
    index: '04',
    title: 'Luxury Salon & Academy',
    category: 'Brand Identity',
    description:
      'Ultra-premium brand showcase for a salon and academy — refined identity, service menus and fluid luxury UI.',
    stack: ['Figma', 'HTML5', 'CSS3', 'JavaScript', 'Google Maps'],
    image: '/project%20image/screencapture-boxerdinesh88-png-github-io-makeupforever-2026-06-27-10_38_51.png',
    link: 'https://boxerdinesh88-png.github.io/makeupforever/',
    github: 'https://github.com/boxerdinesh88-png/makeupforever',
    accent: '#f59e0b',
  },
  {
    id: 'hospitality',
    index: '05',
    title: 'Luxury Hospitality',
    category: 'Creative Landing Page',
    description:
      'Premium hospitality destination with animated grid UI, hover transitions and scoped CSS for Elementor.',
    stack: ['WordPress', 'Elementor', 'JavaScript', 'CSS3'],
    image: '/project%20image/screencapture-silversandstonehospitality-2026-06-27-10_44_34.png',
    link: 'https://silversandstonehospitality.com',
    accent: '#0ea5e9',
  },
  {
    id: 'creative-portfolio',
    index: '06',
    title: 'Creative Developer Portfolio',
    category: 'Interactive / 3D Experience',
    description:
      'Immersive scroll-driven portfolio with GSAP sequences, dual-circle cursor tracking and 60fps marquees.',
    stack: ['JavaScript', 'GSAP', 'Scroll Scrub', 'Custom Cursor'],
    image: '/project%20image/screencapture-boxerdinesh88-png-github-io-portfolio-2026-06-27-10_40_07.png',
    link: 'https://boxerdinesh88-png.github.io/portfolio-/',
    github: 'https://github.com/boxerdinesh88-png/portfolio-',
    accent: '#8b5cf6',
  },
]

/* ------------------------------ Split ------------------------------ */

export interface SplitItem {
  title: string
  items: string[]
  icon: LucideIcon
}

export const buildSide: SplitItem = {
  title: 'I Build the Experience',
  items: ['Architecture', 'Backend', 'APIs', 'Database', 'Authentication', 'Frontend', 'Deployment'],
  icon: Braces,
}

export const designSide: SplitItem = {
  title: 'I Design the Experience',
  items: ['Branding', 'UI', 'Visual systems', 'Motion', 'Typography', 'Interaction'],
  icon: Palette,
}

/* ------------------------------ Journey ------------------------------ */

export const journey = [
  { year: '2022', title: 'Started Building', blurb: 'First line of code. The curiosity became a craft.' },
  { year: '2023', title: 'Full-Stack Development', blurb: 'Python, Django, databases — building real products end to end.' },
  { year: '2024', title: 'Creative Design & UI/UX', blurb: 'Design systems, typography and interfaces with intent.' },
  { year: '2025', title: 'Advanced Projects', blurb: 'International clients, SaaS platforms and premium brands.' },
  { year: '2026', title: 'Digital Experiences', blurb: 'Where code, design and motion become one experience.' },
]

/* ------------------------------ Services ------------------------------ */

export interface Service {
  index: string
  title: string
  description: string
  icon: LucideIcon
  accent: 'accent' | 'pink' | 'cyan'
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Full-Stack Development',
    description: 'End-to-end web applications — Django + React, clean architecture, production ready.',
    icon: Braces,
    accent: 'accent',
  },
  {
    index: '02',
    title: 'Web Application Development',
    description: 'Complex platforms, dashboards and workflows that are fast and reliable.',
    icon: Globe,
    accent: 'pink',
  },
  {
    index: '03',
    title: 'UI/UX Design',
    description: 'Interfaces that feel obvious to use and beautiful to look at.',
    icon: MonitorSmartphone,
    accent: 'cyan',
  },
  {
    index: '04',
    title: 'Brand & Graphic Design',
    description: 'Logos, social content, marketing graphics and visual systems.',
    icon: Building2,
    accent: 'pink',
  },
  {
    index: '05',
    title: 'Motion Graphics',
    description: 'Kinetic identities, animated content and scroll-driven storytelling.',
    icon: Clapperboard,
    accent: 'cyan',
  },
  {
    index: '06',
    title: 'Interactive 3D Websites',
    description: 'Immersive scenes built with WebGL — optimized, fast, unforgettable.',
    icon: Wand2,
    accent: 'accent',
  },
]

/* ------------------------------ Process ------------------------------ */

export const process = [
  { index: '01', name: 'Discover', detail: 'Understand the problem.', icon: Workflow },
  { index: '02', name: 'Design', detail: 'Create the visual direction.', icon: PenTool },
  { index: '03', name: 'Build', detail: 'Turn the concept into a functional product.', icon: Layers },
  { index: '04', name: 'Animate', detail: 'Add motion and interaction.', icon: MousePointerClick },
  { index: '05', name: 'Launch', detail: 'Deploy and optimize.', icon: Rocket },
]

/* ------------------------------ Stats ------------------------------ */

export const stats = [
  { value: '2+', label: 'Years Crafting' },
  { value: '15+', label: 'Projects Shipped' },
  { value: '20+', label: 'Technologies' },
  { value: '6+', label: 'Live Products' },
]

export const techMarquee = [
  'Python',
  'Django',
  'DRF',
  'React',
  'JavaScript',
  'PostgreSQL',
  'REST APIs',
  'Figma',
  'Illustrator',
  'Motion',
  '3D',
  'TypeScript',
  'Tailwind',
  'Git',
]