'use client'

import { useState } from 'react'
import { MarketSentimentGauge } from './market-sentiment-gauge'
import { ChevronRight } from 'lucide-react'

interface IndexCardProps {
  label: string
  price: string
  change: string
  isNegative: boolean
}

function IndexCard({ label, price, change, isNegative }: IndexCardProps) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)]">
      <p className="text-xs font-medium text-[var(--text-label)]">{label}</p>
      <p className="text-2xl font-bold text-[var(--text-primary)]">{price}</p>
      <p className={`text-base font-medium ${isNegative ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
        {isNegative ? '▼' : '▲'} {change}
      </p>
    </div>
  )
}

interface DailyPerformanceProps {
  day: string
  percentage: number
  time?: string
}

function DailyPerformanceChart({ day, percentage, time }: DailyPerformanceProps) {
  const positivePercentage = Math.max(0, percentage)
  const negativePercentage = Math.max(0, -percentage)
  const total = positivePercentage + negativePercentage || 1

  const positiveAngle = (positivePercentage / total) * 360
  const negativeAngle = (negativePercentage / total) * 360

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Positive arc (green) */}
          {positivePercentage > 0 && (
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#16A34A"
              strokeWidth="3"
              strokeDasharray={`${positiveAngle * 0.628} 360`}
              strokeLinecap="round"
            />
          )}
          {/* Negative arc (red) */}
          {negativePercentage > 0 && (
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#DC2626"
              strokeWidth="3"
              strokeDasharray={`${negativeAngle * 0.628} 360`}
              strokeDashoffset={`-${positiveAngle * 0.628}`}
              strokeLinecap="round"
            />
          )}
        </svg>
        <p className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
          {Math.abs(Math.round(percentage))}%
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-[var(--text-primary)]">{day}</p>
        {time && <p className="text-xs text-[var(--text-muted)]">{time}</p>}
      </div>
    </div>
  )
}

export function MarketOverviewBanner() {
  const [scrollPosition, setScrollPosition] = useState(0)

  return (
    <div className="w-full bg-[var(--bg-card)] border-b border-[var(--border-color)] rounded-xl overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Top section - Index cards and sentiment gauge */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left - Index cards */}
          <div className="flex gap-4 flex-shrink-0">
            <IndexCard label="NIFTY 50" price="23,946.25" change="109.75" isNegative={true} />
            <IndexCard label="SENSEX" price="76,728.37" change="372.10" isNegative={true} />
          </div>

          {/* Middle - Sentiment gauge */}
          <div className="flex-shrink-0">
            <MarketSentimentGauge sentiment="greed" value={72} />
          </div>

          {/* Right - Daily performance charts */}
          <div className="flex gap-3 overflow-x-auto pb-2 flex-1">
            <DailyPerformanceChart day="MON" percentage={2.1} />
            <DailyPerformanceChart day="TUE" percentage={-1.5} />
            <DailyPerformanceChart day="WED" percentage={0.8} />
            <DailyPerformanceChart day="THU" percentage={-0.5} />
            <DailyPerformanceChart day="TODAY" percentage={1.2} time="3:57pm" />
          </div>

          {/* Far right - Scroll indicator on mobile */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0 text-[var(--text-muted)]">
            <ChevronRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
