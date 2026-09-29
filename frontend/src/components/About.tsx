import { Briefcase, Check, MapPin, Plane } from 'lucide-react'
import type { Profile } from '../types'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function About({ profile }: { profile: Profile | null }) {
  if (!profile) return null

  const facts = [
    { icon: MapPin, label: 'Localisation', value: profile.location },
    { icon: Plane, label: 'Mobilité', value: profile.mobility },
    { icon: Briefcase, label: 'Recherche', value: 'CDI — Développement IA, Backend Python, Full-stack IA' },
  ]

  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="À propos" title="Un profil backend orienté IA" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-700">{profile.about}</p>

            <h3 className="mt-10 mb-4 text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Domaines d’expertise
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {profile.focus_areas.map((area) => (
                <li key={area} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="space-y-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-200 hover:bg-white hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-0.5 font-semibold text-slate-900">{value}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
