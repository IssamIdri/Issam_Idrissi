import Reveal from './Reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  dark?: boolean
}

export default function SectionHeader({ eyebrow, title, description, dark = false }: SectionHeaderProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 font-mono text-sm font-medium tracking-wider text-indigo-500 uppercase">
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-slate-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
