import Link from 'next/link'
import { Youtube, Instagram, Mail } from 'lucide-react'
import Logo from './Logo'
import NewsletterForm from './NewsletterForm'

const footerNav = [
  {
    title: 'Explore',
    links: [
      { href: '/episodes', label: 'Episodes' },
      { href: '/careers', label: 'Career Library' },
      { href: '/quiz', label: 'Career Quiz' },
    ],
  },
  {
    title: 'About',
    links: [
      { href: '/mission', label: 'Our Mission' },
      { href: '/educators', label: 'For Educators' },
      { href: '/get-involved', label: 'Get Involved' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

const socialLinks = [
  { href: 'https://youtube.com/@the13thgrade26?si=qwGjlT2CP-mnlJzC', icon: Youtube, label: 'YouTube' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: 'mailto:the13thgrade2026@gmail.com', icon: Mail, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="The 13th Grade"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Discovering futures, one career at a time. A nonprofit media brand helping young people explore what comes after school.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold/20 hover:text-gold flex items-center justify-center transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="font-serif text-lg font-semibold text-gold mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold mb-4">Stay Connected</h3>
            <p className="text-sm text-white/70 mb-4">
              Get new episodes and career tips delivered to your inbox.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} The 13th Grade. A student-run nonprofit.
        </div>
      </div>
    </footer>
  )
}
