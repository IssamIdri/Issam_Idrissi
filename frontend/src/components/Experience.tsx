import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import { api } from '../services/api'
import AsyncState from './AsyncState'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Experience() {
  const { data: experiences, loading, error, retry } = useApi(api.getExperiences)

  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Expériences"
          title="Parcours professionnel"
          description="Des projets concrets en entreprise autour de l’IA générative, des LLM, du backend Python et de la data."
        />

        {experiences ? (
          <ol className="relative space-y-10 border-l-2 border-slate-200 pl-8 sm:pl-10">
            {experiences.map((exp, index) => (
              <li key={exp.id} className="relative">
                <span
                  className="absolute top-6 -left-[43px] flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-indigo-600 ring-2 ring-indigo-100 sm:-left-[51px]"
                  aria-hidden
                />
                <Reveal delay={index * 80}>
                  <article className="rounded-xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{exp.title}</h3>
                        <p className="mt-1 font-medium text-indigo-600">{exp.company}</p>
                      </div>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {exp.contract_type}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" aria-hidden />
                        {exp.start_date} – {exp.end_date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {exp.missions.map((mission) => (
                        <li key={mission} className="flex gap-3 leading-relaxed text-slate-700">
                          <Briefcase className="mt-1 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                          <span>{mission}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                      {exp.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          <AsyncState loading={loading} error={error} onRetry={retry} />
        )}
      </div>
    </section>
  )
}
