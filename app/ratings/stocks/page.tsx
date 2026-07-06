'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const stocksRatings = [
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    recommendation: 'Buy',
    quality: 8.2,
    valuation: 7.5,
    momentum: 8.8,
    risk: 4.2,
    confidence: 92,
    price: '₹1,485.50',
    change: 2.45,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    recommendation: 'Hold',
    quality: 8.9,
    valuation: 6.8,
    momentum: 6.5,
    risk: 3.8,
    confidence: 85,
    price: '₹3,650.25',
    change: -1.20,
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    recommendation: 'Buy',
    quality: 8.5,
    valuation: 8.2,
    momentum: 7.9,
    risk: 5.1,
    confidence: 88,
    price: '₹2,645.75',
    change: 3.65,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    recommendation: 'Buy',
    quality: 9.1,
    valuation: 7.8,
    momentum: 8.2,
    risk: 4.5,
    confidence: 94,
    price: '₹1,925.40',
    change: 1.85,
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Limited',
    recommendation: 'Sell',
    quality: 7.8,
    valuation: 5.9,
    momentum: 4.2,
    risk: 6.8,
    confidence: 81,
    price: '₹425.60',
    change: -2.35,
  },
  {
    symbol: 'BAJAJFINSV',
    name: 'Bajaj Finserv Limited',
    recommendation: 'Hold',
    quality: 8.3,
    valuation: 7.2,
    momentum: 7.1,
    risk: 5.5,
    confidence: 79,
    price: '₹1,856.30',
    change: 0.45,
  },
]

const ScoreBar = ({ value, max = 10 }: { value: number; max?: number }) => {
  const percentage = (value / max) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-300 w-8">{value.toFixed(1)}</span>
    </div>
  )
}

export default function StocksRatingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Stocks Ratings</h1>
        <p className="text-slate-400">AI-powered stock recommendations based on quality, valuation, momentum, and risk analysis</p>
      </div>

      <div className="grid gap-6">
        {stocksRatings.map((stock) => {
          const isPositive = stock.change >= 0
          const recommendationColor =
            stock.recommendation === 'Buy' ? 'bg-green-500/10 text-green-400'
              : stock.recommendation === 'Sell' ? 'bg-red-500/10 text-red-400'
              : 'bg-yellow-500/10 text-yellow-400'

          return (
            <Card key={stock.symbol} className="border-slate-700 hover:border-teal-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div>
                        <CardTitle className="text-xl">{stock.symbol}</CardTitle>
                        <p className="text-sm text-slate-400 mt-1">{stock.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={cn('mb-2', recommendationColor)}>
                      {stock.recommendation}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xl font-bold">{stock.price}</p>
                      <p className={cn(
                        'text-sm font-medium flex items-center justify-end gap-1',
                        isPositive ? 'text-green-400' : 'text-red-400'
                      )}>
                        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {isPositive ? '+' : ''}{stock.change}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Scores Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Quality Score</p>
                    <ScoreBar value={stock.quality} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Valuation Score</p>
                    <ScoreBar value={stock.valuation} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Momentum Score</p>
                    <ScoreBar value={stock.momentum} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Risk Score</p>
                    <ScoreBar value={stock.risk} />
                  </div>
                </div>

                {/* AI Confidence */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-teal-400" />
                      <span className="text-slate-300">AI Confidence Score</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                          style={{ width: `${stock.confidence}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-teal-400 w-12">{stock.confidence}%</span>
                    </div>
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
