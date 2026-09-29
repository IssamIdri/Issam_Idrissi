import {
  Brain,
  ClipboardList,
  Cloud,
  Code,
  Database,
  Monitor,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useApi } from '../hooks/useApi'
import { api } from '../services/api'
import AsyncState from './AsyncState'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  languages: Code,
  backend: Server,
  frontend: Monitor,
  llm: Sparkles,
  data: Brain,
  databases: Database,
  devops: Cloud,
  automation: Workflow,
  methods: ClipboardList,
}

export default function Skills() {
  const { data: categories, loading, error, retry } = useApi(api.getSkills)

  return (
    <section id="skills" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Compétences"
          title="Stack technique"
          description="Du modèle LLM à la mise en production : les technologies que j’utilise pour concevoir des applications IA fiables."
        />

        {categories ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = CATEGORY_ICONS[category.id] ?? Code
              return (
                <Reveal key={category.id} delay={(index % 3) * 100}>
                  <article className="group h-full rounded-xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="font-semibold text-slate-900">{category.name}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              )
            })}
          </div>
        ) : (
          <AsyncState loading={loading} error={error} onRetry={retry} />
        )}
      </div>
    </section>
  )
}
