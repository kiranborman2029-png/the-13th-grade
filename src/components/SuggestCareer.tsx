'use client'

import { useState } from 'react'
import { ThumbsUp, Plus, Loader2 } from 'lucide-react'

type Suggestion = {
  id: string
  career: string
  votes: number
  votedByUser: boolean
}

const initialSuggestions: Suggestion[] = [
  { id: '1', career: 'Architect', votes: 24, votedByUser: false },
  { id: '2', career: 'Physical Therapist', votes: 19, votedByUser: false },
  { id: '3', career: 'Marine Biologist', votes: 17, votedByUser: false },
  { id: '4', career: 'Paramedic / EMT', votes: 15, votedByUser: false },
  { id: '5', career: 'Video Game Developer', votes: 14, votedByUser: false },
  { id: '6', career: 'Chef / Restaurant Owner', votes: 11, votedByUser: false },
]

export default function SuggestCareer() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions)
  const [newCareer, setNewCareer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleVote = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === id && !s.votedByUser
          ? { ...s, votes: s.votes + 1, votedByUser: true }
          : s
      ).sort((a, b) => b.votes - a.votes)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCareer.trim()) return
    setSubmitting(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 500))

    const suggestion: Suggestion = {
      id: Date.now().toString(),
      career: newCareer.trim(),
      votes: 1,
      votedByUser: true,
    }
    setSuggestions((prev) => [suggestion, ...prev].sort((a, b) => b.votes - a.votes))
    setNewCareer('')
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      {/* Submit form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <label htmlFor="career-suggestion" className="sr-only">Suggest a career</label>
        <input
          id="career-suggestion"
          type="text"
          placeholder="Suggest a career (e.g., Pilot, Dentist, Journalist...)"
          value={newCareer}
          onChange={(e) => setNewCareer(e.target.value)}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-slate focus:outline-none focus:border-gold transition-colors"
          maxLength={60}
        />
        <button
          type="submit"
          disabled={submitting || !newCareer.trim()}
          className="px-5 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Submit
        </button>
      </form>

      {submitted && (
        <p className="text-sm text-gold font-medium mb-4">
          Thanks! Your suggestion has been added.
        </p>
      )}

      {/* Suggestion list */}
      <div className="space-y-3">
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white"
          >
            <button
              onClick={() => handleVote(s.id)}
              disabled={s.votedByUser}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                s.votedByUser
                  ? 'bg-gold/10 text-gold cursor-default'
                  : 'bg-navy/5 text-navy hover:bg-gold/10 hover:text-gold'
              }`}
              aria-label={`Vote for ${s.career}`}
            >
              <ThumbsUp size={14} />
              {s.votes}
            </button>
            <span className="text-sm font-medium text-navy">{s.career}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
