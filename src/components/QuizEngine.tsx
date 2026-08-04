'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Play,
  BookOpen,
  Share2,
  ChevronRight,
} from 'lucide-react'
import type { Episode, Career } from '@/lib/data'

/* ── Types ── */
type QuizOption = { text: string; scores: Record<string, number> }
type QuizQuestion = { id: number; question: string; options: QuizOption[] }
type AgeGroup = { id: string; label: string; sublabel: string }
type RIASECType = {
  name: string
  nickname: string
  color: string
  description: string
  kidDescription: string
  careers: string[]
}

type QuizData = {
  ageGroups: AgeGroup[]
  riasecTypes: Record<string, RIASECType>
  riasecToIndustry: Record<string, string[]>
  questions: Record<string, QuizQuestion[]>
}

type QuizEngineProps = {
  quizData: QuizData
  episodes: Episode[]
  careers: Career[]
}

/* ── Radar Chart (pure SVG) ── */
function RadarChart({
  scores,
  types,
}: {
  scores: Record<string, number>
  types: Record<string, RIASECType>
}) {
  const keys = ['R', 'I', 'A', 'S', 'E', 'C']
  const maxScore = Math.max(...Object.values(scores), 1)
  const cx = 150
  const cy = 150
  const r = 120

  const angleSlice = (Math.PI * 2) / keys.length

  function getPoint(index: number, value: number) {
    const angle = angleSlice * index - Math.PI / 2
    const radius = (value / maxScore) * r
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  }

  const gridLevels = [0.25, 0.5, 0.75, 1]
  const dataPoints = keys.map((key, i) => getPoint(i, scores[key] || 0))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
      {/* Grid */}
      {gridLevels.map((level) => {
        const points = keys
          .map((_, i) => {
            const angle = angleSlice * i - Math.PI / 2
            const radius = level * r
            return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`
          })
          .join(' ')
        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
        )
      })}

      {/* Axis lines */}
      {keys.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        )
      })}

      {/* Data area */}
      <path d={dataPath} fill="rgba(212,166,64,0.3)" stroke="#D4A640" strokeWidth="2.5" />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill={types[keys[i]]?.color || '#D4A640'} />
      ))}

      {/* Labels */}
      {keys.map((key, i) => {
        const angle = angleSlice * i - Math.PI / 2
        const labelR = r + 28
        const x = cx + labelR * Math.cos(angle)
        const y = cy + labelR * Math.sin(angle)
        return (
          <text
            key={key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.9)"
            fontSize="11"
            fontWeight="600"
          >
            {types[key]?.name?.slice(0, 3).toUpperCase() || key}
          </text>
        )
      })}
    </svg>
  )
}

/* ── Score Bar ── */
function ScoreBar({
  label,
  nickname,
  percentage,
  color,
  delay,
}: {
  label: string
  nickname: string
  percentage: number
  color: string
  delay: number
}) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), delay)
    return () => clearTimeout(timer)
  }, [percentage, delay])

  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-semibold text-white/90">
          {label}{' '}
          <span className="text-white/50 font-normal text-xs">({nickname})</span>
        </span>
        <span className="text-xs text-white/60">{Math.round(percentage)}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

/* ── Main Component ── */
export default function QuizEngine({ quizData, episodes, careers }: QuizEngineProps) {
  const [phase, setPhase] = useState<'intro' | 'age' | 'quiz' | 'results'>('intro')
  const [ageGroup, setAgeGroup] = useState<string | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [slideDir, setSlideDir] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const questions = ageGroup ? quizData.questions[ageGroup] || [] : []
  const totalQuestions = questions.length

  const handleSelectAge = useCallback((id: string) => {
    setAgeGroup(id)
    setSlideDir('forward')
    setAnimating(true)
    setTimeout(() => {
      setPhase('quiz')
      setAnimating(false)
    }, 400)
  }, [])

  const handleSelectAnswer = useCallback(
    (optionIndex: number) => {
      if (animating) return
      setAnswers((prev) => ({ ...prev, [currentQ]: optionIndex }))
      setSlideDir('forward')
      setAnimating(true)
      setTimeout(() => {
        if (currentQ < totalQuestions - 1) {
          setCurrentQ((q) => q + 1)
        } else {
          setPhase('results')
        }
        setAnimating(false)
      }, 400)
    },
    [currentQ, totalQuestions, animating]
  )

  const goBack = useCallback(() => {
    if (animating) return
    setSlideDir('back')
    setAnimating(true)
    setTimeout(() => {
      if (phase === 'results') {
        setPhase('quiz')
      } else if (currentQ > 0) {
        setCurrentQ((q) => q - 1)
      } else {
        setPhase('age')
      }
      setAnimating(false)
    }, 400)
  }, [phase, currentQ, animating])

  const restart = useCallback(() => {
    setPhase('intro')
    setAgeGroup(null)
    setCurrentQ(0)
    setAnswers({})
    setSlideDir('forward')
    setAnimating(false)
  }, [])

  /* ── Scoring ── */
  const riasecScores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  Object.entries(answers).forEach(([qIdx, optIdx]) => {
    const question = questions[Number(qIdx)]
    if (!question) return
    const option = question.options[optIdx]
    if (!option) return
    Object.entries(option.scores).forEach(([type, pts]) => {
      riasecScores[type] = (riasecScores[type] || 0) + pts
    })
  })

  const totalScore = Object.values(riasecScores).reduce((a, b) => a + b, 0) || 1
  const percentages: Record<string, number> = {}
  Object.entries(riasecScores).forEach(([key, val]) => {
    percentages[key] = (val / totalScore) * 100
  })

  const sortedTypes = Object.entries(riasecScores).sort(([, a], [, b]) => b - a)
  const topTypes = sortedTypes.slice(0, 3).filter(([, score]) => score > 0)
  const hollandCode = topTypes.map(([key]) => key).join('')

  // Map top RIASEC types to industries for episode/career matching
  const matchedIndustries = new Set<string>()
  topTypes.forEach(([type]) => {
    const industries = quizData.riasecToIndustry[type] || []
    industries.forEach((ind) => matchedIndustries.add(ind))
  })

  const matchedEpisodes = episodes.filter((ep) => matchedIndustries.has(ep.industry))
  const matchedCareers = careers.filter((c) => matchedIndustries.has(c.industry))

  // Build friendly result label
  const topTypeNames = topTypes.map(([key]) => quizData.riasecTypes[key]?.nickname?.replace('The ', '') || key)
  const isKid = ageGroup === 'kids'
  const friendlyLabel = isKid
    ? `You're a ${topTypeNames.slice(0, 2).join(' and ')}!`
    : `You're a ${topTypeNames.slice(0, 2).join('-')}!`

  const friendlyDescription = isKid
    ? `You love ${topTypes
        .slice(0, 2)
        .map(([key]) => quizData.riasecTypes[key]?.kidDescription?.toLowerCase().replace('you love ', '') || '')
        .join(' and ')} That's awesome!`
    : topTypes
        .slice(0, 2)
        .map(([key]) => quizData.riasecTypes[key]?.description || '')
        .join(' ')

  // Share text
  const shareText = `I just took The 13th Grade Career Quiz and got ${hollandCode} (${topTypeNames.join(
    '-'
  )})! Find your career match at`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My 13th Grade Career Quiz Results',
          text: shareText,
          url: window.location.href,
        })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`)
      alert('Results link copied to clipboard!')
    }
  }

  /* ── Progress ── */
  const progress =
    phase === 'results'
      ? 100
      : phase === 'quiz'
        ? ((currentQ + 1) / totalQuestions) * 100
        : 0

  /* ── Slide animation class ── */
  const slideClass = animating
    ? slideDir === 'forward'
      ? 'opacity-0 translate-x-8'
      : 'opacity-0 -translate-x-8'
    : 'opacity-100 translate-x-0'

  /* ══════════════════════════════════════════ */
  /* ──          INTRO SCREEN                ── */
  /* ══════════════════════════════════════════ */
  if (phase === 'intro') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className={`transition-all duration-500 ${slideClass}`}>
          {/* Glowing icon */}
          <div className="relative mx-auto mb-8">
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gold/20 blur-xl animate-pulse" />
            <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <Sparkles size={40} className="text-navy" />
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight">
            Discover Your
            <br />
            <span className="text-gold">Career Type</span>
          </h1>

          <p className="mt-6 text-lg text-slate max-w-lg mx-auto leading-relaxed">
            Answer a few questions and we'll reveal the career paths that match your
            interests, strengths, and personality.
          </p>

          <div className="mt-6 rounded-xl bg-navy/5 border border-navy/10 px-6 py-4 max-w-lg mx-auto">
            <p className="text-sm text-slate leading-relaxed">
              This quiz is based on the <strong className="text-navy">RIASEC framework</strong>, a
              career-interest model used by the U.S. Department of Labor and career
              counselors for over 70 years.
            </p>
          </div>

          <button
            onClick={() => {
              setSlideDir('forward')
              setAnimating(true)
              setTimeout(() => {
                setPhase('age')
                setAnimating(false)
              }, 400)
            }}
            className="mt-10 group inline-flex items-center gap-3 px-10 py-5 bg-gold text-navy font-bold rounded-2xl text-lg hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20"
          >
            Start the Quiz
            <ChevronRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <p className="mt-4 text-xs text-slate/60">
            Free. No sign-up. Takes 3-8 minutes.
          </p>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════════ */
  /* ──         AGE SELECTION                ── */
  /* ══════════════════════════════════════════ */
  if (phase === 'age') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className={`w-full max-w-lg transition-all duration-500 ${slideClass}`}>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Step 1
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy text-center mb-3">
            How old are you?
          </h2>
          <p className="text-center text-slate mb-10">
            We'll tailor the questions to your age so the quiz feels right for you.
          </p>

          <div className="space-y-4">
            {quizData.ageGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleSelectAge(group.id)}
                className="w-full text-left px-8 py-6 rounded-2xl border-2 border-border bg-white hover:border-gold hover:shadow-lg hover:shadow-gold/10 hover:scale-[1.01] active:scale-[0.99] transition-all group"
              >
                <span className="block text-lg font-bold text-navy group-hover:text-gold transition-colors">
                  {group.label}
                </span>
                <span className="block text-sm text-slate mt-1">{group.sublabel}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSlideDir('back')
              setAnimating(true)
              setTimeout(() => {
                setPhase('intro')
                setAnimating(false)
              }, 400)
            }}
            className="mt-8 mx-auto flex items-center gap-1.5 text-sm font-medium text-slate hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════════ */
  /* ──          RESULTS SCREEN              ── */
  /* ══════════════════════════════════════════ */
  if (phase === 'results') {
    const topRecommendedCareers = topTypes.flatMap(
      ([key]) => quizData.riasecTypes[key]?.careers?.slice(0, 4) || []
    )
    // deduplicate
    const uniqueCareers = [...new Set(topRecommendedCareers)].slice(0, 8)

    return (
      <div ref={containerRef}>
        {/* Results Hero */}
        <div className="rounded-3xl bg-navy text-white p-8 sm:p-12 mb-10 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
          </div>

          <div className="relative">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full">
                <Sparkles size={16} className="text-gold" />
                <span className="text-sm font-semibold text-gold">Your Results</span>
              </div>
            </div>

            {/* Holland Code */}
            <div className="text-center mb-8">
              <div className="flex justify-center gap-2 mb-4">
                {topTypes.map(([key]) => (
                  <span
                    key={key}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold"
                    style={{ backgroundColor: quizData.riasecTypes[key]?.color || '#D4A640' }}
                  >
                    {key}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
                {friendlyLabel}
              </h2>
              <p className="text-white/70 max-w-lg mx-auto text-sm leading-relaxed">
                {friendlyDescription}
              </p>
            </div>

            {/* Radar Chart */}
            <div className="mb-8">
              <RadarChart scores={riasecScores} types={quizData.riasecTypes} />
            </div>

            {/* Score Bars */}
            <div className="max-w-md mx-auto">
              {sortedTypes.map(([key, _score], idx) => {
                const typeInfo = quizData.riasecTypes[key]
                if (!typeInfo) return null
                return (
                  <ScoreBar
                    key={key}
                    label={typeInfo.name}
                    nickname={typeInfo.nickname}
                    percentage={percentages[key] || 0}
                    color={typeInfo.color}
                    delay={idx * 150}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Top Type Explanation Cards */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl font-bold text-navy mb-6">Your Top Types</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTypes.map(([key], idx) => {
              const typeInfo = quizData.riasecTypes[key]
              if (!typeInfo) return null
              return (
                <div
                  key={key}
                  className="rounded-2xl p-6 border-2"
                  style={{ borderColor: typeInfo.color + '40' }}
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white font-bold text-sm mb-3"
                    style={{ backgroundColor: typeInfo.color }}
                  >
                    {key}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-navy">
                    {typeInfo.name}
                  </h4>
                  <p className="text-xs font-semibold text-gold mt-1 mb-2">
                    {idx === 0 ? 'Top Match' : `#${idx + 1} Match`}
                  </p>
                  <p className="text-sm text-slate leading-relaxed">
                    {isKid ? typeInfo.kidDescription : typeInfo.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recommended Career Fields */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl font-bold text-navy mb-2">
            Career Fields That Match You
          </h3>
          <p className="text-sm text-slate mb-6">
            Based on your RIASEC profile, here are career fields to explore:
          </p>
          <div className="flex flex-wrap gap-3">
            {uniqueCareers.map((career) => (
              <span
                key={career}
                className="px-4 py-2 bg-navy/5 text-navy text-sm font-medium rounded-full border border-navy/10"
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* Matched Episodes */}
        {matchedEpisodes.length > 0 && (
          <div className="mb-10">
            <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-2">
              <Play size={20} className="text-gold" />
              Episodes for You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchedEpisodes.map((ep) => (
                <Link
                  key={ep.slug}
                  href={`/episodes/${ep.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:border-gold/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                    <Play size={18} className="text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{ep.title}</p>
                    <p className="text-xs text-slate">
                      {ep.industry} &middot; {ep.runtime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Matched Careers */}
        {matchedCareers.length > 0 && (
          <div className="mb-10">
            <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-gold" />
              Career Profiles to Explore
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchedCareers.map((c) => (
                <Link
                  key={c.slug}
                  href={`/careers/${c.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:border-gold/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{c.title}</p>
                    <p className="text-xs text-slate">
                      {c.industry} &middot; {c.salaryRange}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-8">
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy rounded-xl text-sm font-bold hover:bg-gold-light transition-colors"
          >
            <Share2 size={16} />
            Share Your Results
          </button>
          <button
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-semibold text-navy hover:bg-navy/5 transition-colors"
          >
            <RotateCcw size={16} />
            Retake Quiz
          </button>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy-light transition-colors"
          >
            Browse All Careers
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════════ */
  /* ──        QUESTION SCREEN               ── */
  /* ══════════════════════════════════════════ */
  const question = questions[currentQ]
  if (!question) return null

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress bar */}
      <div className="mb-2">
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-slate">
            Question {currentQ + 1} of {totalQuestions}
          </p>
          <p className="text-xs text-slate/60">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className={`transition-all duration-400 ${slideClass}`}>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-10 leading-snug">
            {question.question}
          </h2>

          {/* Answer Cards */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQ] === idx
              const letter = String.fromCharCode(65 + idx)
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={animating}
                  className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-200 group ${
                    isSelected
                      ? 'bg-navy text-white border-navy scale-[1.01] shadow-lg'
                      : 'bg-white text-navy border-border hover:border-gold/50 hover:shadow-md hover:scale-[1.005]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-gold text-navy'
                          : 'bg-navy/5 text-navy/60 group-hover:bg-gold/10 group-hover:text-gold'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-snug">
                      {option.text}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 pb-2">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-gold transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={restart}
          className="text-xs text-slate/50 hover:text-slate transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  )
}
