import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Briefcase, DollarSign, GraduationCap, Clock, Play } from 'lucide-react'
import { getCareers, getCareerBySlug, getEpisodeBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getCareers().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const career = getCareerBySlug(slug)
  if (!career) return { title: 'Career Not Found' }
  return {
    title: `How to Become a ${career.title}`,
    description: career.description,
    openGraph: {
      title: `How to Become a ${career.title} | The 13th Grade`,
      description: career.description,
    },
  }
}

export default async function CareerDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const career = getCareerBySlug(slug)
  if (!career) notFound()

  const relatedEpisode = career.relatedEpisode ? getEpisodeBySlug(career.relatedEpisode) : null

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          All Careers
        </Link>

        <span className="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-full mb-4">
          {career.industry}
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
          {career.title}
        </h1>

        <p className="mt-6 text-lg text-slate leading-relaxed">
          {career.description}
        </p>

        {/* Quick facts */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Briefcase size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Industry</span>
            </div>
            <p className="font-semibold text-navy">{career.industry}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 text-gold mb-2">
              <DollarSign size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Salary Range</span>
            </div>
            <p className="font-semibold text-navy">{career.salaryRange}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 text-gold mb-2">
              <GraduationCap size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Episode</span>
            </div>
            {relatedEpisode ? (
              <Link href={`/episodes/${relatedEpisode.slug}`} className="font-semibold text-gold hover:text-gold-dark transition-colors">
                Watch now
              </Link>
            ) : (
              <p className="text-slate text-sm">Coming soon</p>
            )}
          </div>
        </div>

        {/* Day in the life */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-gold" />
            <h2 className="font-serif text-2xl font-bold text-navy">A Day in the Life</h2>
          </div>
          <p className="text-slate leading-relaxed">{career.dayInTheLife}</p>
        </section>

        {/* Typical path */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={20} className="text-gold" />
            <h2 className="font-serif text-2xl font-bold text-navy">How to Get There</h2>
          </div>
          <p className="text-slate leading-relaxed">{career.typicalPath}</p>
        </section>

        {/* Related episode CTA */}
        {relatedEpisode && (
          <div className="mt-12 rounded-2xl bg-navy p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Play size={20} className="text-gold" />
              <span className="text-xs font-bold text-gold uppercase tracking-wider">Watch the Episode</span>
            </div>
            <h3 className="font-serif text-xl font-bold">{relatedEpisode.title}</h3>
            <p className="mt-2 text-sm text-white/80">{relatedEpisode.description}</p>
            <Link
              href={`/episodes/${relatedEpisode.slug}`}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm"
            >
              Watch Episode
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
