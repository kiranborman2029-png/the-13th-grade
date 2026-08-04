import Link from 'next/link'
import { Briefcase, DollarSign, ArrowRight } from 'lucide-react'
import type { Career } from '@/lib/data'

export default function CareerCard({ career }: { career: Career }) {
  return (
    <Link
      href={`/careers/${career.slug}`}
      className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="px-2.5 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-full">
            {career.industry}
          </span>
          <ArrowRight size={16} className="text-slate group-hover:text-gold transition-colors mt-0.5" />
        </div>
        <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
          {career.title}
        </h3>
        <p className="mt-2 text-sm text-slate line-clamp-2 leading-relaxed">
          {career.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-navy/70">
          <span className="flex items-center gap-1">
            <Briefcase size={12} className="text-gold" />
            {career.industry}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={12} className="text-gold" />
            {career.salaryRange}
          </span>
        </div>
        {career.relatedEpisode && (
          <div className="mt-4 pt-3 border-t border-border">
            <span className="text-xs font-semibold text-gold">Episode available</span>
          </div>
        )}
      </div>
    </Link>
  )
}
