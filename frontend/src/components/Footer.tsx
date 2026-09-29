import { Github, Linkedin, Mail } from 'lucide-react'
import type { Profile } from '../types'

export default function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-night-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 text-sm text-slate-400 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-medium text-slate-200">© {year} {profile?.name ?? 'AISSAOUI IDRISSI ISSAM'}</p>
          <p className="mt-1">Développé avec React, TypeScript, Tailwind CSS et FastAPI.</p>
        </div>

        {profile && (
          <div className="flex items-center gap-2">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="rounded-lg p-2 transition hover:bg-white/5 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="rounded-lg p-2 transition hover:bg-white/5 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email"
              className="rounded-lg p-2 transition hover:bg-white/5 hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}
