import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Target, Users, Linkedin } from 'lucide-react'
import PlaceholderImage from '@/components/PlaceholderImage'

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'The 13th Grade is a nonprofit media brand by two Campolindo High School students, helping young people explore careers and discover what comes after school.',
}

export default function MissionPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Our Mission
          </h1>
          <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">
            Helping young people explore careers and discover what&apos;s next.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="prose-like text-slate leading-relaxed text-lg">
          <p>
            The 13th Grade is a nonprofit dedicated to helping young people explore careers and discover what comes after school. We believe every student deserves an honest, inside look at the paths available to them — not just the well-known jobs, but the ones they&apos;ve never heard of. School ends at 12th grade, but the most important lessons about work and life come next. That&apos;s the 13th grade. Through real conversations with real professionals at every stage of their careers, we bring students the stories, insight, and inspiration they need to imagine their own future — one career at a time.
          </p>
        </div>

        {/* PLACEHOLDER: Replace public/images/mission-hero.jpg with a photo representing career discovery, mentorship, or young people looking forward */}
        <PlaceholderImage
          src="/images/mission-hero.jpg"
          alt="Students discovering their futures"
          label="Mission Image Placeholder"
          aspectClass="aspect-[21/9]"
          className="mt-12"
        />

        {/* Values cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
              <Heart size={24} className="text-gold" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-navy">Student-Run</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              Built by high school students who understand what it&apos;s like to face the
              &ldquo;what&apos;s next?&rdquo; question without a roadmap.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
              <Target size={24} className="text-gold" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-navy">Nonprofit</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              No ads, no paywalls, no hidden agenda. Our content is free because career
              exploration shouldn&apos;t cost anything.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
              <Users size={24} className="text-gold" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-navy">Community-Driven</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              You tell us what careers to cover. You vote on what matters. This platform
              belongs to the students using it.
            </p>
          </div>
        </div>

        {/* The name */}
        <div className="mt-16 rounded-2xl bg-navy text-white p-10 sm:p-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Why &ldquo;The 13<sup className="text-gold">th</sup> Grade&rdquo;?
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Because school officially ends at 12th grade — but the real education about
            careers, adulting, and figuring out your path? That&apos;s the grade nobody
            teaches. We&apos;re here to fill that gap: the 13th grade is the one where you
            discover what you actually want to do, hear from people who&apos;ve done it, and
            start building a future on your own terms.
          </p>
        </div>

        {/* Meet the Founders */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy text-center mb-10">
            Meet the Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kiran */}
            <div className="rounded-2xl border border-border bg-white p-8 text-center">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden bg-navy/10 mb-4 ring-4 ring-gold/20">
                <img
                  src="/images/kiran.png"
                  alt="Kiran Borman"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">Kiran Borman</h3>
              <p className="text-sm font-semibold text-gold mt-1">Co-Founder</p>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Kiran Borman is a co-founder of The 13th Grade and a student at Campolindo High School. With a passion for building things that matter and a strong interest in fields like technology and economics, he launched The 13th Grade to close the gap between what school teaches and what the real world looks like. Through the stories of people actually living out their careers, he hopes to help students explore the paths available to them.
              </p>
              <a
                href="https://www.linkedin.com/in/kiran-borman-779385403/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kiran Borman on LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 mt-4 rounded-full bg-navy/5 hover:bg-gold/10 hover:text-gold text-navy/60 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>

            {/* Nathan */}
            <div className="rounded-2xl border border-border bg-white p-8 text-center">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden bg-navy/10 mb-4 ring-4 ring-gold/20">
                <img
                  src="/images/nathan.png"
                  alt="Nathan Pang"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">Nathan Pang</h3>
              <p className="text-sm font-semibold text-gold mt-1">Co-Founder</p>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Nathan Pang is a co-founder of The 13th Grade and a student at Campolindo High School. Passionate about connecting young people with real-world opportunity, he helped build The 13th Grade to make career exploration accessible, engaging, and honest for students of every age.
              </p>
              <a
                href="https://www.linkedin.com/in/nathan-pang-22b419403/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nathan Pang on LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 mt-4 rounded-full bg-navy/5 hover:bg-gold/10 hover:text-gold text-navy/60 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-2xl font-bold text-navy">Want to be part of this?</h2>
          <p className="mt-2 text-slate">
            We&apos;re always looking for professionals to interview, schools to partner with, and students to join our community.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              Get Involved
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-navy font-bold rounded-xl hover:bg-navy/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
