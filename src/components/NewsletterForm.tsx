'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'footer' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: wire to newsletter service later
    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <p className={`text-sm font-medium ${variant === 'footer' ? 'text-gold' : 'text-navy'}`}>
        You&apos;re in! We&apos;ll keep you posted.
      </p>
    )
  }

  const isFooter = variant === 'footer'

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor={`email-${variant}`} className="sr-only">Email address</label>
      <input
        id={`email-${variant}`}
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm transition-colors ${
          isFooter
            ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-gold focus:outline-none'
            : 'bg-white border border-border text-navy placeholder:text-slate focus:border-gold focus:outline-none'
        }`}
      />
      <button
        type="submit"
        className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
          isFooter
            ? 'bg-gold text-navy hover:bg-gold-light'
            : 'bg-navy text-white hover:bg-navy-light'
        }`}
      >
        <Send size={14} />
        <span className="hidden sm:inline">Subscribe</span>
      </button>
    </form>
  )
}
