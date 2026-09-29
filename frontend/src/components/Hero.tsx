import type { ReactNode } from 'react'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import heroBackground from '../assets/hero-bg.jpg'
import type { Profile } from '../types'
import AsyncState from './AsyncState'

interface HeroProps {
  profile: Profile | null
  loading: boolean
  error: string | null
  onRetry: () => void
}

export default function Hero({ profile, loading, error, onRetry }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden bg-night-950 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:min-h-[680px]"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]" aria-hidden>
        <img
          src={heroBackground}
          alt=""
          className="h-full w-full object-cover object-[center_30%] opacity-35 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-night-950/40 lg:bg-linear-to-r lg:from-night-950 lg:via-night-950/30 lg:via-30% lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-night-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-night-950 to-transparent" />
      </div>
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[720px] rounded-full bg-indigo-600/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {!profile ? (
          <AsyncState loading={loading} error={error} onRetry={onRetry} dark />
        ) : (
          <div className="max-w-xl">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
                Disponible pour un CDI
              </p>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-4 bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
                {profile.title}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{profile.subtitle}</p>

              <p className="mt-5 flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-indigo-400" aria-hidden />
                {profile.location} · {profile.mobility}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
                >
                  Voir mes projets
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Me contacter
                </a>
                <a
                  href={profile.cv_url}
                  download="CV_Issam_Aissaoui_Idrissi.pdf"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Télécharger mon CV
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <SocialLink href={profile.linkedin} label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </SocialLink>
                <SocialLink href={profile.github} label="GitHub">
                  <Github className="h-5 w-5" />
                </SocialLink>
                <SocialLink href={`mailto:${profile.email}`} label="Email">
                  <Mail className="h-5 w-5" />
                </SocialLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:border-indigo-400/50 hover:text-white"
    >
      {children}
    </a>
  )
}