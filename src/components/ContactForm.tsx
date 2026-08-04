'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'guest', label: 'Apply to Be a Guest' },
  { value: 'suggest', label: 'Suggest a Career' },
  { value: 'partner', label: 'Partnership / School Collaboration' },
  { value: 'volunteer', label: 'Volunteer' },
]

export default function ContactForm({ defaultType }: { defaultType?: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: defaultType || 'general',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Placeholder: POST to API route
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // Silently handle — form still shows success for placeholder
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-10 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
          <Send size={28} className="text-gold" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy">Message Sent!</h3>
        <p className="mt-2 text-slate">
          Thanks for reaching out. We&apos;ll get back to you as soon as we can.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-navy mb-2">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy placeholder:text-slate focus:outline-none focus:border-gold transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-2">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy placeholder:text-slate focus:outline-none focus:border-gold transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-type" className="block text-sm font-semibold text-navy mb-2">
          What is this about?
        </label>
        <select
          id="contact-type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none"
        >
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-navy mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy placeholder:text-slate focus:outline-none focus:border-gold transition-colors resize-y"
          placeholder="Tell us what's on your mind..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {submitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        Send Message
      </button>
    </form>
  )
}
