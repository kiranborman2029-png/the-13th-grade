'use client'

import { useState } from 'react'

export default function PlaceholderImage({
  src,
  alt,
  label,
  aspectClass = 'aspect-[21/9]',
  className = '',
}: {
  src: string
  alt: string
  label: string
  aspectClass?: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`${aspectClass} rounded-2xl overflow-hidden bg-gradient-to-br from-navy/5 via-gold/10 to-navy/5 relative ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-slate/40 text-sm font-medium">
          <span className="bg-white/60 px-4 py-2 rounded-lg">{label}</span>
        </div>
      )}
    </div>
  )
}
