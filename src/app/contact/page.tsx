import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with The 13th Grade. Suggest a career, apply to be a guest, partner with us, or just say hello.',
}

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">
            Have a question, want to suggest a career, apply to be a guest, or explore a
            partnership? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail size={18} className="text-gold" />
                <h3 className="font-serif text-lg font-bold text-navy">Email</h3>
              </div>
              <a href="mailto:the13thgrade2026@gmail.com" className="text-sm text-gold hover:text-gold-dark transition-colors">
                the13thgrade2026@gmail.com
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-gold" />
                <h3 className="font-serif text-lg font-bold text-navy">Based In</h3>
              </div>
              <p className="text-sm text-slate">
                Moraga, California<br />
                Campolindo High School
              </p>
            </div>
            <div className="rounded-xl bg-navy/5 p-6">
              <p className="text-sm text-slate leading-relaxed">
                <strong className="text-navy">Response time:</strong> We&apos;re students, so we
                do our best to respond within a few days. Thanks for your patience!
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
