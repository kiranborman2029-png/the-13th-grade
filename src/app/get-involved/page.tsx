import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Mic, Users, Building2, ArrowRight } from 'lucide-react'
import SuggestCareer from '@/components/SuggestCareer'

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Support The 13th Grade — donate, volunteer, partner, be interviewed, or suggest and vote on the next career we should cover.',
}

export default function GetInvolvedPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Get Involved
          </h1>
          <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">
            The 13th Grade is a community project. Here&apos;s how you can help us help more
            students explore their futures.
          </p>
        </div>

        {/* Ways to help */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Heart size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy">Donate</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Your donation helps us produce episodes, maintain the website, and keep
              everything free for students. Every dollar goes directly to content and outreach.
            </p>
            <button
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm"
              aria-label="Donate (coming soon)"
            >
              Donate (Coming Soon)
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Mic size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy">Be a Guest</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Are you a professional who loves what you do? Share your career story with
              the next generation. We&apos;re always looking for both early-career and veteran guests.
            </p>
            <Link
              href="/contact?type=guest"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-colors text-sm"
            >
              Apply to Be a Guest
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Users size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy">Volunteer</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Help with research, editing, outreach, social media, or web development. We
              welcome volunteers of all ages and skill levels.
            </p>
            <Link
              href="/contact?type=volunteer"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 border border-border text-navy font-semibold rounded-xl hover:bg-navy/5 transition-colors text-sm"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Building2 size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy">Partner</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Schools, nonprofits, and companies — let&apos;s work together to bring career
              exploration to more students. We&apos;re open to partnerships of all kinds.
            </p>
            <Link
              href="/contact?type=partner"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 border border-border text-navy font-semibold rounded-xl hover:bg-navy/5 transition-colors text-sm"
            >
              Partner With Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Suggest & Vote */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Suggest & Vote on a Career
            </h2>
            <p className="mt-3 text-slate max-w-lg mx-auto">
              What career should we cover next? Submit your idea or upvote existing suggestions.
              The most-voted careers get filmed first.
            </p>
          </div>

          <SuggestCareer />
        </div>
      </div>
    </div>
  )
}
