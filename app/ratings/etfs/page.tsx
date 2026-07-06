'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const etfsRatings = [
  {
    name: 'Nifty 50 Index ETF',
    category: 'Index ETF',
    trackingError: 0.15,
    expenseRatio: 0.05,
    liquidityScore: 9.8,
    diversificationScore: 9.2,
    aum: '₹8,450 Cr',
    nav: '₹18,245.50',
    change: 1.45,
  },
  {
    name: 'Sensex ETF',
    category: 'Index ETF',
    trackingError: 0.12,
    expenseRatio: 0.08,
    liquidityScore: 9.5,
    diversificationScore: 9.0,
    aum: '₹6,230 Cr',
    nav: '₹61,856.75',
    change: 1.65,
  },
  {
    name: 'GOLD ETF',
    category: 'Commodity ETF',
    trackingError: 0.35,
    expenseRatio: 0.12,
    liquidityScore: 8.5,
    diversificationScore: 7.8,
    aum: '₹4,125 Cr',
    nav: '₹5,425.30',
    change: -0.85,
  },
  {
    name: 'Technology ETF',
    category: 'Sectoral ETF',
    trackingError: 0.28,
    expenseRatio: 0.18,
    liquidityScore: 8.2,
    diversificationScore: 8.5,
    aum: '₹3,560 Cr',
    nav: '₹12,585.40',
    change: 2.35,
  },
  {
    name: 'Banking ETF',
    category: 'Sectoral ETF',
    trackingError: 0.22,
    expenseRatio: 0.15,
    liquidityScore: 8.8,
    diversificationScore: 8.9,
    aum: '₹5,890 Cr',
    nav: '₹35,245.60',
    change: 1.85,
  },
  {
    name: 'International ETF (US)',
    category: 'International ETF',
    trackingError: 0.45,
    expenseRatio: 0.22,
    liquidityScore: 7.5,
    diversificationScore: 9.1,
    aum: '₹2,340 Cr',
    nav: '₹2,856.85',
    change: -1.20,
  },
]

const ScoreBar = ({ value, max = 10 }: { value: number; max?: number }) => {
  const percentage = (value / max) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-300 w-8">{value.toFixed(1)}</span>
    </div>
  )
}

export default function ETFsRatingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ETFs Ratings</h1>
        <p className="text-slate-400">Exchange-traded funds rated on tracking efficiency, cost-effectiveness, and portfolio benefits</p>
      </div>

      <div className="grid gap-6">
        {etfsRatings.map((etf) => {
          const isPositive = etf.change >= 0

          return (
            <Card key={etf.name} className="border-slate-700 hover:border-teal-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{etf.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{etf.category}</Badge>
                      <p className="text-sm text-slate-400">AUM: {etf.aum}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{etf.nav}</p>
                    <p className={cn(
                      'text-sm font-medium flex items-center justify-end gap-1 mt-1',
                      isPositive ? 'text-green-400' : 'text-red-400'
                    )}>
                      {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {isPositive ? '+' : ''}{etf.change}%
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Cost Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Expense Ratio</p>
                    <p className="text-lg font-bold text-teal-400">{etf.expenseRatio.toFixed(2)}%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Tracking Error</p>
                    <p className="text-lg font-bold text-yellow-400">{etf.trackingError.toFixed(2)}%</p>
                  </div>
                </div>

                {/* Performance Scores */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Liquidity Score</p>
                    <ScoreBar value={etf.liquidityScore} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Diversification Score</p>
                    <ScoreBar value={etf.diversificationScore} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Tracking Efficiency</p>
                    <ScoreBar value={10 - etf.trackingError} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Cost Efficiency</p>
                    <ScoreBar value={10 - (etf.expenseRatio * 10)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
