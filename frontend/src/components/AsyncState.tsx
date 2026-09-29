import { CircleAlert, LoaderCircle, RefreshCw } from 'lucide-react'

interface AsyncStateProps {
  loading: boolean
  error: string | null
  onRetry: () => void
  dark?: boolean
}

export default function AsyncState({ loading, error, onRetry, dark = false }: AsyncStateProps) {
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center gap-3 py-16 ${dark ? 'text-slate-400' : 'text-slate-500'}`}
        role="status"
      >
        <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />
        <span>Chargement des données depuis l’API…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`mx-auto flex max-w-lg flex-col items-center gap-4 rounded-xl border p-6 text-center ${
          dark ? 'border-red-500/30 bg-red-500/10 text-red-200' : 'border-red-200 bg-red-50 text-red-700'
        }`}
        role="alert"
      >
        <div className="flex items-center gap-2">
          <CircleAlert className="h-5 w-5 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Réessayer
        </button>
      </div>
    )
  }

  return null
}
