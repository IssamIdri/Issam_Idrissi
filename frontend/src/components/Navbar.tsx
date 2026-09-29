import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import avatar from '../assets/avatar.jpg'

const NAV_LINKS = [
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expériences' },
  { id: 'projects', label: 'Projets' },
  { id: 'assistant', label: 'Assistant IA' },
]

function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

const SECTION_IDS = [...NAV_LINKS.map((link) => link.id), 'contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Navigation principale"
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4 ${
          scrolled || open
            ? 'border-white/10 bg-night-900/75 shadow-xl shadow-black/30 backdrop-blur-xl'
            : 'border-white/5 bg-night-900/30 backdrop-blur-md'
        }`}
      >
        <a href="#top" onClick={close} className="group flex items-center gap-3">
          <span className="relative">
            <img
              src={avatar}
              alt="Photo d’Issam Aissaoui Idrissi"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/60 transition group-hover:ring-indigo-400"
            />
            <span
              className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-night-900 bg-emerald-400"
              aria-hidden
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">Issam Idrissi</span>
            <span className="block text-xs text-slate-400">Développeur IA · Backend Python</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-xl border border-white/5 bg-white/[0.03] p-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`block rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  active === link.id
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:brightness-110 sm:inline-flex"
          >
            Me contacter
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-200 transition hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-night-900/95 p-2 shadow-xl shadow-black/30 backdrop-blur-xl lg:hidden"
        >
          <ul className="space-y-1">
            {[...NAV_LINKS, { id: 'contact', label: 'Contact' }].map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={close}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition ${
                    active === link.id ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
