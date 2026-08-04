import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The 13th Grade — Discovering Futures, One Career at a Time',
    template: '%s | The 13th Grade',
  },
  description:
    'A nonprofit media brand helping young people explore careers and discover what comes after school. Watch interviews with real professionals — one early-career, one veteran — in the same job.',
  openGraph: {
    title: 'The 13th Grade — Discovering Futures, One Career at a Time',
    description:
      'Helping young people explore careers and discover what comes after school.',
    siteName: 'The 13th Grade',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
