'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import CareerCard from './CareerCard'
import type { Career } from '@/lib/data'

export default function CareersGrid({
  careers,
  industries,
}: {
  careers: Career[]
  industries: string[]
}) {
  const [query, setQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry
      const matchesQuery =
        query === '' ||
        [c.title, c.industry, c.description].some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        )
      return matchesIndustry && matchesQuery
    })
  }, [careers, query, selectedIndustry])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
          <label htmlFor="career-search" className="sr-only">Search careers</label>
          <input
            id="career-search"
            type="text"
            placeholder="Search careers by title, industry, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-slate focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
          <label htmlFor="career-industry" className="sr-only">Filter by industry</label>
          <select
            id="career-industry"
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
        {filtered.length} {filtered.length === 1 ? 'career' : 'careers'}
        {selectedIndustry !== 'All' && ` in ${selectedIndustry}`}
        {query && ` matching "${query}"`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c) => (
            <CareerCard key={c.slug} career={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate text-lg">No careers match your search.</p>
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
