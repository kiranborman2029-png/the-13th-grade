import episodesData from '@/data/episodes.json'
import careersData from '@/data/careers.json'
import quizData from '@/data/quiz.json'

export type Episode = {
  slug: string
  title: string
  job: string
  industry: string
  runtime: string
  description: string
  youngGuest: { name: string; role: string }
  veteranGuest: { name: string; role: string }
  youtubeId: string
  thumbnail: string
  date: string
}

export type Career = {
  slug: string
  title: string
  industry: string
  description: string
  dayInTheLife: string
  typicalPath: string
  salaryRange: string
  relatedEpisode: string | null
}

export type QuizOption = {
  text: string
  scores: Record<string, number>
}

export type QuizQuestion = {
  id: number
  question: string
  options: QuizOption[]
}

export type IndustryInfo = {
  label: string
  description: string
  icon: string
}

export function getEpisodes(): Episode[] {
  return episodesData as Episode[]
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return (episodesData as Episode[]).find((e) => e.slug === slug)
}

export function getFeaturedEpisodes(count = 3): Episode[] {
  return (episodesData as Episode[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export function getCareers(): Career[] {
  return careersData as Career[]
}

export function getCareerBySlug(slug: string): Career | undefined {
  return (careersData as Career[]).find((c) => c.slug === slug)
}

export function getQuizQuestions(): QuizQuestion[] {
  return quizData.questions as unknown as QuizQuestion[]
}

export function getIndustries(): Record<string, IndustryInfo> {
  return quizData.industries as unknown as Record<string, IndustryInfo>
}

export function getAllIndustryNames(): string[] {
  const industries = new Set<string>()
  for (const ep of episodesData) industries.add(ep.industry)
  for (const c of careersData) industries.add(c.industry)
  return Array.from(industries).sort()
}
