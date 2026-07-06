'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const mutualFundsRatings = [
  {
    name: 'SBI Bluechip Fund',
    category: 'Large Cap',
    aum: '₹45,230 Cr',
    performance1Y: 18.5,
    expenseRatio: 0.89,
    riskRating: 3,
    fundManager: 8.5,
    aiRecommendation: 'Strong Buy',
    returns3Y: 15.2,
    returns5Y: 16.8,
  },
  {
    name: 'HDFC Top 100 Fund',
    category: 'Large Cap',
    aum: '₹38,450 Cr',
    performance1Y: 17.2,
    expenseRatio: 0.85,
    riskRating: 3,
    fundManager: 8.8,
    aiRecommendation: 'Strong Buy',
    returns3Y: 14.8,
    returns5Y: 16.2,
  },
  {
    name: 'ICICI Prudential Growth',
    category: 'Multi Cap',
    aum: '₹32,100 Cr',
    performance1Y: 16.8,
    expenseRatio: 1.02,
    riskRating: 4,
    fundManager: 8.2,
    aiRecommendation: 'Buy',
    returns3Y: 14.1,
    returns5Y: 15.5,
  },
  {
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    aum: '₹28,900 Cr',
    performance1Y: 19.1,
    expenseRatio: 0.90,
    riskRating: 3,
    fundManager: 8.7,
    aiRecommendation: 'Strong Buy',
    returns3Y: 15.5,
    returns5Y: 17.2,
  },
  {
    name: 'Kotak Standard Multicap',
    category: 'Multi Cap',
    aum: '₹24,560 Cr',
    performance1Y: 15.9,
    expenseRatio: 1.05,
    riskRating: 4,
    fundManager: 7.9,
    aiRecommendation: 'Buy',
    returns3Y: 13.8,
    returns5Y: 15.1,
  },
  {
    name: 'Aditya Birla Sun Life',
    category: 'Large Cap',
    aum: '₹21,340 Cr',
    performance1Y: 17.8,
    expenseRatio: 0.95,
    riskRating: 3,
    fundManager: 8.4,
    aiRecommendation: 'Buy',
    returns3Y: 14.9,
    returns5Y: 16.3,
  },
]

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
          )}
        />
      ))}
      <span className="text-sm text-slate-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

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

export default function MutualFundsRatingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mutual Funds Ratings</h1>
        <p className="text-slate-400">Rating system based on fund performance, expense ratio, risk profile, and fund manager expertise</p>
      </div>

      <div className="grid gap-6">
        {mutualFundsRatings.map((fund) => {
          const recommendationColor =
            fund.aiRecommendation === 'Strong Buy' ? 'bg-green-500/10 text-green-400'
              : 'bg-blue-500/10 text-blue-400'

          return (
            <Card key={fund.name} className="border-slate-700 hover:border-teal-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{fund.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{fund.category}</Badge>
                      <p className="text-sm text-slate-400">AUM: {fund.aum}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={cn('mb-2', recommendationColor)}>
                      {fund.aiRecommendation}
                    </Badge>
                    <p className="text-2xl font-bold text-teal-400 flex items-center justify-end gap-1">
                      <TrendingUp className="h-5 w-5" />
                      {fund.performance1Y}%
                    </p>
                    <p className="text-xs text-slate-400 mt-1">1Y Performance</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Performance Returns */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">3Y Return</p>
                    <p className="text-lg font-bold text-teal-400">{fund.returns3Y}%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">5Y Return</p>
                    <p className="text-lg font-bold text-teal-400">{fund.returns5Y}%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Expense Ratio</p>
                    <p className="text-lg font-bold text-yellow-400">{fund.expenseRatio}%</p>
                  </div>
                </div>

                {/* Ratings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Expense Ratio Score</p>
                    <ScoreBar value={10 - fund.expenseRatio} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Risk Rating</p>
                    <RatingStars rating={5 - (fund.riskRating * 0.7)} />
                  </div>
                </div>

                {/* Fund Manager & Performance */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Fund Manager Score</p>
                    <ScoreBar value={fund.fundManager} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Performance Score</p>
                    <ScoreBar value={Math.min(fund.performance1Y / 2, 10)} />
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
