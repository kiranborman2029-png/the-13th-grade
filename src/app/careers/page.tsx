import type { Metadata } from 'next'
import { getCareers, getAllIndustryNames } from '@/lib/data'
import CareersGrid from '@/components/CareersGrid'

export const metadata: Metadata = {
  title: 'Career Library',
  description:
    'Explore our growing directory of career profiles. Learn what different jobs are really like — day-to-day, education, salary, and more.',
}

export default function CareersPage() {
  const careers = getCareers()
  const industries = getAllIndustryNames()

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Career Library
          </h1>
          <p className="mt-4 text-lg text-slate leading-relaxed">
            Honest, detailed profiles for dozens of careers — what the job is really like
            day-to-day, how to get started, and what you can expect to earn. No fluff, no
            gatekeeping.
          </p>
        </div>

        <CareersGrid careers={careers} industries={industries} />
      </div>
    </div>
  )
}
