import type { Metadata } from 'next'
import QuizEngine from '@/components/QuizEngine'
import { getEpisodes, getCareers } from '@/lib/data'
import quizDataRaw from '@/data/riasec-quiz.json'

const quizData = quizDataRaw as unknown as Parameters<typeof QuizEngine>[0]['quizData']

export const metadata: Metadata = {
  title: 'Career Quiz',
  description:
    'Take our free RIASEC-based career exploration quiz to discover which careers match your interests, strengths, and personality. Tailored for kids, teens, and adults.',
}

export default function QuizPage() {
  const episodes = getEpisodes()
  const careers = getCareers()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <QuizEngine
        quizData={quizData}
        episodes={episodes}
        careers={careers}
      />
    </div>
  )
}
