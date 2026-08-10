import Link from 'next/link'
import { ArrowRight, Lightbulb, BookOpen, Users } from 'lucide-react'
import EpisodeCard from '@/components/EpisodeCard'
import ValuesRow from '@/components/ValuesRow'
import NewsletterForm from '@/components/NewsletterForm'
import PlaceholderImage from '@/components/PlaceholderImage'
import { getFeaturedEpisodes } from '@/lib/data'

export default function HomePage() {
  const featuredEpisodes = getFeaturedEpisodes(3)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Diagonal accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
                A nonprofit by students, for students
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Discovering futures,{' '}
                <span className="text-gold">one career at a time.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                Real conversations with real professionals. Every episode pairs someone just starting out
                with a veteran in the same career — so you can see the full arc of a job before you
                commit.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-colors text-base"
                >
                  Take the Career Quiz
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/episodes"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-base border border-white/20"
                >
                  Explore Episodes
                </Link>
              </div>
            </div>
            {/* PLACEHOLDER: Replace public/images/hero-students.jpg with a photo of diverse students exploring careers or collaborating */}
            <div className="hidden lg:block">
              <PlaceholderImage
                src="/images/hero-students.jpg"
                alt="Students exploring careers together"
                label="Hero Image Placeholder"
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS THE 13TH GRADE? ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              What is The 13<sup className="text-gold">th</sup> Grade?
            </h2>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              School takes you through 12th grade — but then what? The 13th Grade is the
              education that traditional school never gives you: honest, human stories about
              what real careers actually look like. We interview two people in the same
              job — one just starting out and one who&apos;s been at it for years — so you can
              see the full picture before you choose your path.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-border text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                <BookOpen size={24} className="text-gold" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-navy">Watch Real Stories</h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                Each episode is an honest conversation with two people in the same career — no scripts, no sugar-coating.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                <Lightbulb size={24} className="text-gold" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-navy">Discover Your Fit</h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                Take our career quiz, browse the career library, and find paths that match your interests and strengths.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                <Users size={24} className="text-gold" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-navy">Join the Community</h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                Suggest careers, vote on what we cover next, and connect with a community that&apos;s figuring it out together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED EPISODES ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                Latest Episodes
              </h2>
              <p className="mt-2 text-slate">
                New careers, new perspectives, every month.
              </p>
            </div>
            <Link
              href="/episodes"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
            >
              View all episodes
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEpisodes.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/episodes"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
            >
              View all episodes
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy text-center">
            Who This Is For
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              {/* PLACEHOLDER: Replace public/images/students-exploring.jpg with a photo of students in a learning/exploring setting */}
              <PlaceholderImage
                src="/images/students-exploring.jpg"
                alt="Students exploring career options"
                label="Students Image Placeholder"
                aspectClass="aspect-[16/7]"
                className="rounded-none"
              />
              <div className="p-8 sm:p-10">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                <span className="text-2xl" role="img" aria-label="Student">&#x1F393;</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-navy">Students</h3>
              <p className="mt-3 text-slate leading-relaxed">
                You&apos;re told to &ldquo;pick a major&rdquo; or &ldquo;figure out your future,&rdquo; but nobody
                shows you what jobs actually look like day-to-day. We do. Watch real people in real
                careers, take a quiz to discover what fits you, and explore a library of job profiles
                that go way beyond a job title.
              </p>
              <Link
                href="/quiz"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
              >
                Take the career quiz
                <ArrowRight size={16} />
              </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              {/* PLACEHOLDER: Replace public/images/educators-parents.jpg with a photo of parents/educators helping students learn */}
              <PlaceholderImage
                src="/images/educators-parents.jpg"
                alt="Parents and educators supporting students"
                label="Educators Image Placeholder"
                aspectClass="aspect-[16/7]"
                className="rounded-none"
              />
              <div className="p-8 sm:p-10">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                <span className="text-2xl" role="img" aria-label="Educator">&#x1F4DA;</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-navy">Parents & Educators</h3>
              <p className="mt-3 text-slate leading-relaxed">
                You want to help the young people in your life explore their options — but the world of
                careers has changed since you were their age. Use our episodes, career library, and quiz
                as free classroom or dinner-table resources. Trusted, ad-free, and built with your
                students in mind.
              </p>
              <Link
                href="/educators"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
              >
                Resources for educators
                <ArrowRight size={16} />
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy text-center mb-12">
            What We Believe
          </h2>
          <ValuesRow />
        </div>
      </section>

      {/* ── SUGGEST A CAREER ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-navy p-10 sm:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                What career should we cover next?
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">
                We make episodes about the careers YOU want to learn about. Suggest a job title and
                vote on what other students have suggested.
              </p>
              <Link
                href="/get-involved"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-colors"
              >
                Suggest a Career
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Stay in the Loop
            </h2>
            <p className="mt-4 text-slate">
              New episodes, career tips, and stories from professionals — straight to your inbox. No spam, ever.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
