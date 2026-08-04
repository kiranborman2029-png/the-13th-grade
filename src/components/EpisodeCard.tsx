import Link from 'next/link'
import { Play, Clock, User } from 'lucide-react'
import type { Episode } from '@/lib/data'

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300"
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video bg-navy/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={24} className="text-navy ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-navy/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {episode.industry}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/90 text-xs">
          <Clock size={12} />
          {episode.runtime}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors">
          {episode.title}
        </h3>
        <p className="mt-2 text-sm text-slate line-clamp-2 leading-relaxed">
          {episode.description}
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2 text-xs text-navy/70">
            <User size={12} className="mt-0.5 shrink-0 text-gold" />
            <span><span className="font-semibold">Early career:</span> {episode.youngGuest.name}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-navy/70">
            <User size={12} className="mt-0.5 shrink-0 text-gold" />
            <span><span className="font-semibold">Veteran:</span> {episode.veteranGuest.name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
