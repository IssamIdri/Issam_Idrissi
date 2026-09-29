import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Bot, LoaderCircle, Send, User } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import { api, getErrorMessage } from '../services/api'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 0,
  role: 'assistant',
  content:
    'Bonjour ! Je suis l’assistant du portfolio. Posez-moi une question sur le profil, les compétences, les expériences ou les projets d’Issam.',
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const { data: initialSuggestions } = useApi(api.getAssistantSuggestions)
  const [suggestions, setSuggestions] = useState<string[] | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, pending])

  const ask = async (question: string) => {
    const trimmed = question.trim()
    if (trimmed.length < 2 || pending) return

    setMessages((prev) => [...prev, { id: nextId.current++, role: 'user', content: trimmed }])
    setInput('')
    setPending(true)

    try {
      const response = await api.askAssistant({ question: trimmed })
      setMessages((prev) => [...prev, { id: nextId.current++, role: 'assistant', content: response.answer }])
      setSuggestions(response.suggestions)
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: 'assistant', content: getErrorMessage(error), isError: true },
      ])
    } finally {
      setPending(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void ask(input)
  }

  const visibleSuggestions = suggestions ?? initialSuggestions ?? []

  return (
    <section id="assistant" className="relative overflow-hidden bg-night-950 py-24 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Assistant IA"
          title="Interrogez mon profil"
          description="Posez une question : le backend FastAPI analyse l’intention et répond à partir des données du portfolio."
          dark
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-night-900 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-500 text-white">
                <Bot className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-white">Assistant du portfolio</p>
                <p className="font-mono text-xs text-slate-500">POST /api/assistant/ask</p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-[380px] space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
              aria-live="polite"
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {pending && (
                <div className="flex items-center gap-2 pl-11 text-sm text-slate-400">
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                  L’assistant rédige sa réponse…
                </div>
              )}
            </div>

            {visibleSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 pt-4 sm:px-5">
                {visibleSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void ask(suggestion)}
                    disabled={pending}
                    className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-left text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/20 disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3 p-4 sm:p-5">
              <label htmlFor="assistant-question" className="sr-only">
                Votre question
              </label>
              <input
                id="assistant-question"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ex. : As-tu déjà travaillé avec des LLM ?"
                maxLength={500}
                autoComplete="off"
                className="flex-1 rounded-lg border border-white/10 bg-night-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={pending || input.trim().length < 2}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </form>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Réponses générées à partir des données du portfolio, sans appel à un modèle externe.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-slate-700 text-slate-200' : 'bg-indigo-600/20 text-indigo-300'
        }`}
        aria-hidden
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? 'rounded-tr-sm bg-indigo-600 text-white'
            : message.isError
              ? 'rounded-tl-sm border border-red-500/30 bg-red-500/10 text-red-200'
              : 'rounded-tl-sm bg-night-800 text-slate-200'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
