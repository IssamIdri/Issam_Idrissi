import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { CircleAlert, CircleCheck, Github, Linkedin, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import type { ContactMessage, Profile } from '../types'
import { api, getErrorMessage } from '../services/api'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

type Status = { type: 'idle' } | { type: 'sending' } | { type: 'success' | 'error'; message: string }

const EMPTY_FORM: ContactMessage = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '')
}

function validate(form: ContactMessage): string | null {
  if (form.name.trim().length < 2) return 'Veuillez indiquer votre nom (2 caractères minimum).'
  if (!EMAIL_PATTERN.test(form.email.trim())) return 'Veuillez indiquer une adresse email valide.'
  if (form.message.trim().length < 10) return 'Votre message doit contenir au moins 10 caractères.'
  return null
}

export default function Contact({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState<ContactMessage>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationError = validate(form)
    if (validationError) {
      setStatus({ type: 'error', message: validationError })
      return
    }

    setStatus({ type: 'sending' })
    try {
      const response = await api.sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      setStatus({ type: 'success', message: response.message })
      setForm(EMPTY_FORM)
    } catch (error) {
      setStatus({ type: 'error', message: getErrorMessage(error) })
    }
  }

  const inputClass =
    'mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none'

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Discutons de votre projet"
          description="Vous recrutez un Développeur IA ou Backend Python ? Écrivez-moi, je réponds rapidement."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr]">
          {profile && (
            <Reveal className="min-w-0 space-y-4">
              <ContactItem icon={<Mail className="h-5 w-5" />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactItem
                icon={<Linkedin className="h-5 w-5" />}
                label="LinkedIn"
                value={displayUrl(profile.linkedin)}
                href={profile.linkedin}
              />
              <ContactItem icon={<Github className="h-5 w-5" />} label="GitHub" value={displayUrl(profile.github)} href={profile.github} />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label="Localisation"
                value={`${profile.location} · ${profile.mobility}`}
              />
            </Reveal>
          )}

          <Reveal delay={150} className={profile ? 'min-w-0' : 'min-w-0 lg:col-span-2'}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Nom
                  </label>
                  <input id="name" name="name" type="text" autoComplete="name" required maxLength={100}
                    value={form.name} onChange={handleChange} placeholder="Votre nom" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" required
                    value={form.email} onChange={handleChange} placeholder="vous@entreprise.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea id="message" name="message" rows={6} required maxLength={5000}
                  value={form.message} onChange={handleChange} placeholder="Présentez le poste ou votre besoin…"
                  className={`${inputClass} resize-y`} />
              </div>

              {(status.type === 'success' || status.type === 'error') && (
                <p
                  role={status.type === 'error' ? 'alert' : 'status'}
                  className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                    status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CircleCheck className="h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
                  )}
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={status.type === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status.type === 'sending' ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
                {status.type === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

interface ContactItemProps {
  icon: ReactNode
  label: string
  value: string
  href?: string
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="truncate font-medium text-slate-900">{value}</p>
      </div>
    </>
  )
  const className =
    'group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-md'

  if (!href) return <div className={className}>{content}</div>

  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  )
}
