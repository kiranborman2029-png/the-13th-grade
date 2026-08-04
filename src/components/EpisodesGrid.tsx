'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import EpisodeCard from './EpisodeCard'
import type { Episode } from '@/lib/data'

export default function EpisodesGrid({
  episodes,
  industries,
}: {
  episodes: Episode[]
  industries: string[]
}) {
  const [query, setQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  const filtered = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesIndustry = selectedIndustry === 'All' || ep.industry === selectedIndustry
      const matchesQuery =
        query === '' ||
        [ep.title, ep.job, ep.industry, ep.description, ep.youngGuest.name, ep.youngGuest.role, ep.veteranGuest.name, ep.veteranGuest.role].some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        )
      return matchesIndustry && matchesQuery
    })
  }, [episodes, query, selectedIndustry])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
          <label htmlFor="ep-search" className="sr-only">Search episodes</label>
          <input
            id="ep-search"
            type="text"
            placeholder="Search episodes by job, industry, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-slate focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
          <label htmlFor="ep-industry" className="sr-only">Filter by industry</label>
          <select
            id="ep-industry"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="appearance-none w-full sm:w-auto pl-11 pr-10 py-3 rounded-xl border border-border bg-white text-navy text-sm focus:outline-none focus:border-gold transition-colors cursor-pointer"
          >
            <option value="All">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate mb-6">
        {filtered.length} {filtered.length === 1 ? 'episode' : 'episodes'}
        {selectedIndustry !== 'All' && ` in ${selectedIndustry}`}
        {query && ` matching "${query}"`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate text-lg">No episodes match your search.</p>
          <button
            onClick={() => { setQuery(''); setSelectedIndustry('All') }}
            className="mt-4 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
