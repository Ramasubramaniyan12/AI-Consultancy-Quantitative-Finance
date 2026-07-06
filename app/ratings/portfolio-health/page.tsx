'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const portfolios = [
  {
    name: 'Conservative Portfolio',
    totalValue: '₹25,00,000',
    diversificationScore: 8.2,
    riskScore: 2.5,
    assetAllocationScore: 8.8,
    volatilityScore: 1.8,
    healthScore: 8.6,
    status: 'Excellent',
    allocation: [
      { name: 'Debt', value: 60, color: '#06B6D4' },
      { name: 'Equity', value: 30, color: '#0EA5E9' },
      { name: 'Gold', value: 10, color: '#F59E0B' },
    ],
  },
  {
    name: 'Balanced Growth Portfolio',
    totalValue: '₹45,00,000',
    diversificationScore: 7.8,
    riskScore: 4.2,
    assetAllocationScore: 7.5,
    volatilityScore: 3.5,
    healthScore: 7.6,
    status: 'Good',
    allocation: [
      { name: 'Equity', value: 50, color: '#10B981' },
      { name: 'Debt', value: 35, color: '#06B6D4' },
      { name: 'Alternatives', value: 15, color: '#8B5CF6' },
    ],
  },
  {
    name: 'Aggressive Growth Portfolio',
    totalValue: '₹68,00,000',
    diversificationScore: 6.5,
    riskScore: 6.8,
    assetAllocationScore: 6.2,
    volatilityScore: 5.9,
    healthScore: 6.4,
    status: 'Fair',
    allocation: [
      { name: 'Equity', value: 85, color: '#EF4444' },
      { name: 'Debt', value: 10, color: '#06B6D4' },
      { name: 'Cash', value: 5, color: '#6B7280' },
    ],
  },
  {
    name: 'Income Generation Portfolio',
    totalValue: '₹32,50,000',
    diversificationScore: 8.1,
    riskScore: 3.2,
    assetAllocationScore: 8.5,
    volatilityScore: 2.5,
    healthScore: 8.3,
    status: 'Excellent',
    allocation: [
      { name: 'Bonds', value: 55, color: '#06B6D4' },
      { name: 'Dividend Stocks', value: 30, color: '#10B981' },
      { name: 'FD/MFs', value: 15, color: '#0EA5E9' },
    ],
  },
]

const ScoreBar = ({ value, max = 10, showLabel = true }: { value: number; max?: number; showLabel?: boolean }) => {
  const percentage = (value / max) * 100
  const getColor = () => {
    if (value >= 8) return 'from-green-500 to-teal-500'
    if (value >= 6) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={cn('h-full bg-gradient-to-r transition-all duration-300', getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && <span className="text-sm font-medium text-slate-300 w-8">{value.toFixed(1)}</span>}
    </div>
  )
}

const HealthStatus = ({ score }: { score: number }) => {
  if (score >= 8) return <Badge className="bg-green-500/10 text-green-400">Excellent</Badge>
  if (score >= 7) return <Badge className="bg-blue-500/10 text-blue-400">Good</Badge>
  if (score >= 6) return <Badge className="bg-yellow-500/10 text-yellow-400">Fair</Badge>
  return <Badge className="bg-red-500/10 text-red-400">Needs Review</Badge>
}

export default function PortfolioHealthRatingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Portfolio Health Ratings</h1>
        <p className="text-slate-400">Comprehensive portfolio analysis covering diversification, risk, allocation, and volatility</p>
      </div>

      <div className="grid gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.name} className="border-slate-700 hover:border-teal-500/30 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{portfolio.name}</CardTitle>
                  <p className="text-sm text-slate-400 mt-1">Portfolio Value: {portfolio.totalValue}</p>
                </div>
                <div className="text-right">
                  <HealthStatus score={portfolio.healthScore} />
                  <p className="text-3xl font-bold text-teal-400 mt-2">{portfolio.healthScore.toFixed(1)}/10</p>
                  <p className="text-xs text-slate-400 mt-1">Health Score</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Asset Allocation Pie Chart */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-slate-400 mb-3">Asset Allocation</p>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolio.allocation}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {portfolio.allocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-2">
                  {portfolio.allocation.map((asset) => (
                    <div key={asset.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: asset.color }}
                      />
                      <div>
                        <p className="text-xs text-slate-400">{asset.name}</p>
                        <p className="text-sm font-bold text-slate-200">{asset.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Metrics */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Diversification Score</p>
                  <ScoreBar value={portfolio.diversificationScore} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Risk Score</p>
                  <ScoreBar value={portfolio.riskScore} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Asset Allocation Score</p>
                  <ScoreBar value={portfolio.assetAllocationScore} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Volatility Score</p>
                  <ScoreBar value={portfolio.volatilityScore} />
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 space-y-2">
                <div className="flex items-start gap-2">
                  {portfolio.healthScore >= 7 ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-slate-300">
                      {portfolio.healthScore >= 8
                        ? 'Your portfolio is well-diversified with optimal risk-adjusted returns. Continue current strategy.'
                        : portfolio.healthScore >= 6
                          ? 'Consider rebalancing to improve diversification and reduce concentration risk.'
                          : 'Review your portfolio allocation to better align with your risk tolerance and goals.'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
