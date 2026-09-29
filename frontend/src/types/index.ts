export interface Profile {
  name: string
  title: string
  subtitle: string
  location: string
  mobility: string
  availability: string
  about: string
  email: string
  linkedin: string
  github: string
  cv_url: string
  focus_areas: string[]
  strengths: string[]
}

export interface SkillCategory {
  id: string
  name: string
  skills: string[]
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  contract_type: string
  start_date: string
  end_date: string
  missions: string[]
  technologies: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url: string
  demo_url: string | null
}

export interface ContactMessage {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export interface AssistantQuestion {
  question: string
}

export interface AssistantResponse {
  answer: string
  topic: string | null
  suggestions: string[]
}
