import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Play, Brain, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Parents & Educators',
  description:
    'Use The 13th Grade as a free classroom or home resource for career exploration. Trusted, ad-free content built with students in mind.',
}

export default function EducatorsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            For Parents & Educators
          </h1>
          <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">
            Free, trustworthy career exploration content you can confidently recommend to your students or children.
          </p>
        </div>

        {/* Why it matters */}
        <div className="rounded-2xl bg-navy text-white p-10 sm:p-14 mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Why Career Exploration Matters
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Research consistently shows that students who explore careers early make more
            informed decisions about their education, feel less anxious about the future,
            and are more motivated in school. Yet most schools don&apos;t have the time or
            resources to provide meaningful career exposure beyond a single career day.
          </p>
          <p className="mt-4 text-white/80 leading-relaxed">
            The 13th Grade fills that gap with free, engaging content that meets students
            where they are — on their screens, in their language, with stories that feel
            real.
          </p>
        </div>

        {/* How to use it */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-8">
          How to Use The 13th Grade
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Play size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy">In the Classroom</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Show an episode during advisory, homeroom, or career-readiness class. Each
              one is 20-28 minutes — perfect for a class period with discussion time.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Brain size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy">As an Assignment</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Have students take the career quiz, pick a career profile to research, or
              watch an episode and write a reflection. Ready-made engagement.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <BookOpen size={22} className="text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy">At Home</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Watch an episode together at dinner. Use the career library to explore
              options. Start a conversation about what excites your child — not just what
              pays well.
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div className="rounded-2xl border border-border bg-white p-10 mb-16">
          <h2 className="font-serif text-2xl font-bold text-navy mb-6">
            Why You Can Trust Us
          </h2>
          <div className="space-y-4">
            {[
              'Nonprofit — no ads, no sponsored content, no hidden agenda',
              'Student-run — we understand our audience because we are our audience',
              'Real professionals — every guest is verified and shares honest, unscripted stories',
              'Free forever — career exploration shouldn\'t cost anything',
              'Privacy-first — we don\'t collect personal data from students',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-gold shrink-0 mt-0.5" />
                <p className="text-slate text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Bring The 13th Grade to Your School
          </h2>
          <p className="mt-2 text-slate max-w-lg mx-auto">
            Interested in partnering, hosting a screening, or having us present to your
            students? We&apos;d love to hear from you.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white font-bold rounded-xl hover:bg-navy-light transition-colors"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/episodes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-navy font-bold rounded-xl hover:bg-navy/5 transition-colors"
            >
              Browse Episodes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
