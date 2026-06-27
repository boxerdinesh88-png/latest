export interface Social {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
  phone?: string
  whatsapp?: string
  website?: string
}

export interface Profile {
  name: string
  shortName: string
  tagline: string
  role: string
  specialization: string
  location: string
  yearsOfExperience: string
  bio: string
  avatarUrl?: string
  social: Social
}

export interface Skill {
  name: string
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  role: string
  year: string
  link?: string
  github?: string
  image?: string
  category?: string
  highlights: string[]
  highlight?: boolean
}

export interface Education {
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  details?: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  link?: string
  credentialId?: string
}

export interface Achievement {
  title: string
  description: string
  date: string
  icon?: string
}

export interface Testimonial {
  name: string
  role: string
  text: string
  rating: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface WhyHireMeItem {
  title: string
  description: string
}

export interface Portfolio {
  profile: Profile
  skills: SkillCategory[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  achievements: Achievement[]
  testimonials: Testimonial[]
  services?: Service[]
  whyHireMe?: WhyHireMeItem[]
}
