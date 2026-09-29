import { ExternalLink, FolderGit2, Github } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import { api } from '../services/api'
import AsyncState from './AsyncState'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Projects() {
  const { data: projects, loading, error, retry } = useApi(api.getProjects)

  return (
    <section id="projects" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Projets"
          title="Réalisations techniques"
          description="Applications IA et full-stack : NLP, assistants conversationnels et API REST."
        />

        {projects ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 100}>
                <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-500 text-white">
                    <FolderGit2 className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-slate-600">{project.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="rounded-md bg-indigo-50 px-2.5 py-1 font-mono text-xs text-indigo-700">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-night-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-night-700"
                    >
                      <Github className="h-4 w-4" aria-hidden />
                      GitHub
                    </a>
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        Démo
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <AsyncState loading={loading} error={error} onRetry={retry} />
        )}
      </div>
    </section>
  )
}
