import { GraduationCap, Sprout, Users, DoorOpen, Sparkles } from 'lucide-react'

const values = [
  {
    icon: GraduationCap,
    label: 'Education',
    description: 'Real-world knowledge school doesn\'t teach',
  },
  {
    icon: Sprout,
    label: 'Growth',
    description: 'Every career starts with a single step',
  },
  {
    icon: Users,
    label: 'Community',
    description: 'Connecting students with professionals who care',
  },
  {
    icon: DoorOpen,
    label: 'Opportunity',
    description: 'Opening doors you didn\'t know existed',
  },
  {
    icon: Sparkles,
    label: 'Impact',
    description: 'Helping you find work that matters to you',
  },
]

export default function ValuesRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {values.map((value) => (
        <div key={value.label} className="text-center group">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <value.icon size={28} className="text-gold" />
          </div>
          <h3 className="mt-3 font-serif text-base font-bold text-navy">{value.label}</h3>
          <p className="mt-1 text-xs text-slate leading-relaxed">{value.description}</p>
        </div>
      ))}
    </div>
  )
}
