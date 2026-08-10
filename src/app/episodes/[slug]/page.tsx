import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import { getEpisodes, getEpisodeBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getEpisodes().map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const episode = getEpisodeBySlug(slug)
  if (!episode) return { title: 'Episode Not Found' }
  return {
    title: episode.title,
    description: episode.description,
    openGraph: {
      title: `${episode.title} | The 13th Grade`,
      description: episode.description,
    },
  }
}

export default async function EpisodeDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const episode = getEpisodeBySlug(slug)
  if (!episode) notFound()

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/episodes"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          All Episodes
        </Link>

        {/* Industry tag */}
        <span className="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-full mb-4">
          {episode.industry}
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
          {episode.title}
        </h1>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gold" />
            {episode.runtime}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gold" />
            {new Date(episode.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-10 relative aspect-video rounded-2xl overflow-hidden bg-navy/5 border border-border flex items-center justify-center">
          <div className="text-center px-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <Clock size={32} className="text-gold" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">This episode is coming soon!</h2>
            <p className="mt-3 text-slate max-w-md mx-auto">
              We&apos;re working hard to bring you this episode. Check back soon or subscribe to our newsletter to get notified when it drops.
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-10 text-lg text-slate leading-relaxed">
          {episode.description}
        </p>

        {/* Guests */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-gold" />
              <span className="text-xs font-semibold text-gold uppercase tracking-wider">Early Career</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-navy">{episode.youngGuest.name}</h3>
            <p className="mt-1 text-sm text-slate">{episode.youngGuest.role}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-gold" />
              <span className="text-xs font-semibold text-gold uppercase tracking-wider">Veteran</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-navy">{episode.veteranGuest.name}</h3>
            <p className="mt-1 text-sm text-slate">{episode.veteranGuest.role}</p>
          </div>
        </div>

        {/* Related career link */}
        <div className="mt-12 rounded-xl bg-navy/5 border border-border p-6 text-center">
          <p className="text-sm text-slate mb-3">Want to learn more about this career?</p>
          <Link
            href={`/careers/${episode.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-colors text-sm"
          >
            View Career Profile: {episode.job}
          </Link>
        </div>
      </div>
    </div>
  )
}
