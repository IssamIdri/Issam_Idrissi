import type {
  AssistantQuestion,
  AssistantResponse,
  ContactMessage,
  ContactResponse,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from '../types'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '')

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })

  if (!response.ok) {
    let detail: string | undefined
    try {
      const body = await response.json()
      if (typeof body?.detail === 'string') detail = body.detail
    } catch {
      // Réponse sans corps JSON
    }
    throw new ApiError(detail ?? `Erreur serveur (${response.status})`, response.status)
  }

  return response.json() as Promise<T>
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.status === 422
      ? 'Certaines données envoyées sont invalides.'
      : error.message
  }
  if (error instanceof TypeError) {
    return 'Impossible de joindre l’API. Elle est peut-être en cours de démarrage, réessayez dans quelques secondes.'
  }
  return 'Une erreur inattendue est survenue.'
}

export const api = {
  getProfile: () => request<Profile>('/api/profile'),
  getSkills: () => request<SkillCategory[]>('/api/skills'),
  getExperiences: () => request<Experience[]>('/api/experiences'),
  getProjects: () => request<Project[]>('/api/projects'),
  getAssistantSuggestions: () => request<string[]>('/api/assistant/suggestions'),

  sendContactMessage: (message: ContactMessage) =>
    request<ContactResponse>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    }),

  askAssistant: (payload: AssistantQuestion) =>
    request<AssistantResponse>('/api/assistant/ask', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
