import Link from 'next/link'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <img
        src="/images/logo.png"
        alt="The 13th Grade"
        className="h-10 sm:h-12 w-auto"
      />
    </Link>
  )
}
