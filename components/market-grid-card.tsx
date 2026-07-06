'use client'

import { MarketSparkline } from './market-sparkline'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { SkeletonLoader } from '@/components/skeleton-loader'

interface MarketGridCardProps {
  name: string
  price: string
  change: number
  sparklineData: Array<{ value: number }>
  onClick?: () => void
  loading?: boolean
}

export function MarketGridCard(props: MarketGridCardProps) {
  const { name, price, change, sparklineData, onClick, loading = false } = props
  const isPositive = change >= 0
  const changeColor = isPositive ? 'var(--icon-green-text)' : 'var(--icon-red-text)'

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] cursor-pointer transition-all duration-200 hover:scale-102 hover:shadow-md"
      style={{
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {/* Sparkline */}
      <div className="flex-shrink-0">
        <MarketSparkline data={sparklineData} isPositive={isPositive} />
      </div>

      {/* Text data */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{name}</p>
        {loading ? (
          <SkeletonLoader className="mt-2 h-6 w-24" />
        ) : (
          <p className="text-lg font-bold text-[var(--text-primary)] mt-0.5">{price}</p>
        )}
        <div className="flex items-center gap-1 mt-1" style={{ color: changeColor }}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span className="text-xs font-medium">
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}
