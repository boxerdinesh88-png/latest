import type { Portfolio, Project, Certification } from '../types/portfolio'
import rawData from '../data/portfolio.json'

const portfolioData = rawData as unknown as Portfolio

export function usePortfolio(): Portfolio {
  return portfolioData
}

export function useProfile() {
  return portfolioData.profile
}

export function useSkills() {
  return portfolioData.skills
}

export function useProjects(): Project[] {
  return portfolioData.projects
}

export function useExperience() {
  return portfolioData.experience
}

export function useEducation() {
  return portfolioData.education
}

export function useCertifications(): Certification[] {
  return portfolioData.certifications
}

export function useServices() {
  return portfolioData.services || []
}

export function useTestimonials() {
  return portfolioData.testimonials || []
}
