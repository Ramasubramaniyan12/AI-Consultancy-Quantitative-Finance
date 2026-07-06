'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface Metric {
  label: string
  value: string
  interpretation: string
}

const metrics: Metric[] = [
  { label: 'Sharpe Ratio', value: '1.45', interpretation: 'Good risk-adjusted return' },
  { label: 'Beta', value: '0.92', interpretation: 'Slightly less volatile than market' },
  { label: 'Alpha', value: '+2.8%', interpretation: 'Outperforming benchmark' },
  { label: 'Standard Deviation', value: '14.2%', interpretation: 'Moderate volatility' },
  { label: 'Sortino Ratio', value: '1.78', interpretation: 'Strong downside protection' },
  { label: 'Max Drawdown', value: '-12.4%', interpretation: 'Within acceptable range' },
  { label: 'R-Squared', value: '0.85', interpretation: 'High correlation to benchmark' },
  { label: 'CAGR', value: '18.6%', interpretation: 'Since inception' },
]

export function QuantitativeMetrics() {
  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
      <CardHeader>
        <CardTitle className="text-lg text-[var(--text-primary)]">Quantitative Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Grid of metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-lg p-4 space-y-2"
            >
              <p className="text-xs font-semibold text-[var(--text-label)]">{metric.label}</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{metric.value}</p>
              <p className="text-xs text-[var(--text-muted)]">{metric.interpretation}</p>
            </div>
          ))}
        </div>

        {/* Benchmark comparison */}
        <div className="border-t border-[var(--border-color)] pt-4">
          <div className="flex items-center justify-between p-4 bg-[var(--icon-green-bg)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--icon-green-text)]/10">
                <TrendingUp className="h-4 w-4 text-[var(--icon-green-text)]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--text-primary)]">Portfolio vs NIFTY 50</p>
                <p className="text-xs text-[var(--text-secondary)]">+6.2% outperformance (1Y)</p>
              </div>
            </div>
            <span className="text-lg font-bold text-[var(--icon-green-text)]">+6.2%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
