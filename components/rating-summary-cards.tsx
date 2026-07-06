'use client'

import { Star, TrendingUp, Brain, Clock } from 'lucide-react'

interface SummaryCard {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
  subtext?: string
}

const summaryCards: SummaryCard[] = [
  {
    icon: <Star className="h-6 w-6" />,
    iconBg: "bg-[var(--icon-amber-bg)]",
    value: "1,240+",
    label: "Assets Rated",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    iconBg: "bg-[var(--icon-green-bg)]",
    value: "342",
    label: "Strong Buy Ratings",
    subtext: "27.6% of rated assets",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    iconBg: "bg-[var(--icon-purple-bg)]",
    value: "98.5%",
    label: "AI Coverage",
    subtext: "1,221 assets analyzed",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    iconBg: "bg-[var(--icon-blue-bg)]",
    value: "Live",
    label: "Rating Updates",
    subtext: "Updated every market day",
  },
]

export function RatingSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {summaryCards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 hover:shadow-md transition-all"
        >
          <div
            className={`${card.iconBg} rounded-lg inline-flex p-3 mb-4`}
            style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--icon-amber-text)',
            }}
          >
            {card.icon}
          </div>
          <p className="text-3xl font-bold text-[var(--text-primary)] mb-1">{card.value}</p>
          <p className="text-sm font-medium text-[var(--text-label)]">{card.label}</p>
          {card.subtext && (
            <p className="text-xs text-[var(--text-muted)] mt-1">{card.subtext}</p>
          )}
        </div>
      ))}
    </div>
  )
}
