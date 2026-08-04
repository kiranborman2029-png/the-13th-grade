import type { Metadata } from 'next'
import { getEpisodes, getAllIndustryNames } from '@/lib/data'
import EpisodesGrid from '@/components/EpisodesGrid'

export const metadata: Metadata = {
  title: 'Episodes',
  description:
    'Browse our full library of career interview episodes. Each one features two professionals in the same job — one early-career, one veteran.',
}

export default function EpisodesPage() {
  const episodes = getEpisodes()
  const industries = getAllIndustryNames()

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Episodes
          </h1>
          <p className="mt-4 text-lg text-slate leading-relaxed">
            Every episode pairs someone just starting out with a veteran in the same
            career. Pick an industry, search by keyword, or just browse — your future
            might be one click away.
          </p>
        </div>

        <EpisodesGrid episodes={episodes} industries={industries} />
      </div>
    </div>
  )
}
