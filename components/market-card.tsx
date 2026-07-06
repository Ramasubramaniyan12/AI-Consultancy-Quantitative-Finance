"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { SkeletonLoader } from "@/components/skeleton-loader"

interface MarketCardProps {
  name: string
  value: string
  change: number
  changePercent: number
  loading?: boolean
}

export function MarketCard({ name, value, change, changePercent, loading }: MarketCardProps) {
  const isPositive = change >= 0

  return (
    <div className="flex items-center justify-between p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:shadow-md transition-all">
      <div>
        <p className="text-sm text-[var(--text-label)]">{name}</p>
        {loading ? (
          <SkeletonLoader className="mt-1 h-6 w-24" />
        ) : (
          <p className="text-xl font-bold mt-0.5 text-[var(--text-primary)]">{value}</p>
        )}
      </div>
      <div className={cn(
        "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
        isPositive 
          ? "bg-[var(--icon-green-bg)] text-[var(--icon-green-text)]" 
          : "bg-[var(--icon-red-bg)] text-[var(--icon-red-text)]"
      )}>
        {isPositive ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
        <span>{isPositive ? "+" : ""}{changePercent.toFixed(2)}%</span>
      </div>
    </div>
  )
}
