'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const bondsRatings = [
  {
    name: 'Government Securities 10Y',
    type: 'Government Bond',
    rating: 'AAA',
    yieldRating: 8.5,
    durationRisk: 2.1,
    defaultRisk: 1.0,
    currentYield: 6.95,
    aiRecommendation: 'Strong Buy',
    maturity: '2034',
  },
  {
    name: 'State Development Loan 9Y',
    type: 'SDL',
    rating: 'AAA',
    yieldRating: 8.2,
    durationRisk: 1.9,
    defaultRisk: 1.1,
    currentYield: 7.25,
    aiRecommendation: 'Strong Buy',
    maturity: '2033',
  },
  {
    name: 'HDFC Bank Senior Unsecured',
    type: 'Corporate Bond',
    rating: 'AAA',
    yieldRating: 7.8,
    durationRisk: 3.2,
    defaultRisk: 1.5,
    currentYield: 7.85,
    aiRecommendation: 'Buy',
    maturity: '2028',
  },
  {
    name: 'ICICI Bank Senior Unsecured',
    type: 'Corporate Bond',
    rating: 'AA+',
    yieldRating: 7.5,
    durationRisk: 2.8,
    defaultRisk: 2.0,
    currentYield: 8.15,
    aiRecommendation: 'Buy',
    maturity: '2027',
  },
  {
    name: 'Reliance Industries',
    type: 'Corporate Bond',
    rating: 'AA',
    yieldRating: 7.2,
    durationRisk: 3.5,
    defaultRisk: 2.5,
    currentYield: 8.45,
    aiRecommendation: 'Hold',
    maturity: '2029',
  },
  {
    name: 'Tata Steel PSU Bond',
    type: 'PSU Bond',
    rating: 'AA-',
    yieldRating: 6.8,
    durationRisk: 4.1,
    defaultRisk: 3.2,
    currentYield: 8.75,
    aiRecommendation: 'Hold',
    maturity: '2030',
  },
]

const RatingBadge = ({ rating }: { rating: string }) => {
  const colorMap: Record<string, string> = {
    'AAA': 'bg-green-500/10 text-green-400',
    'AA+': 'bg-green-500/10 text-green-400',
    'AA': 'bg-teal-500/10 text-teal-400',
    'AA-': 'bg-yellow-500/10 text-yellow-400',
  }
  return <Badge className={colorMap[rating] || 'bg-slate-700 text-slate-300'}>{rating}</Badge>
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

export default function BondsRatingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bonds Ratings</h1>
        <p className="text-slate-400">Government, PSU, and corporate bond ratings based on credit quality, yields, and risk profile</p>
      </div>

      <div className="grid gap-6">
        {bondsRatings.map((bond) => {
          const recommendationColor =
            bond.aiRecommendation === 'Strong Buy' ? 'bg-green-500/10 text-green-400'
              : bond.aiRecommendation === 'Buy' ? 'bg-blue-500/10 text-blue-400'
              : 'bg-yellow-500/10 text-yellow-400'

          return (
            <Card key={bond.name} className="border-slate-700 hover:border-teal-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{bond.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{bond.type}</Badge>
                      <p className="text-sm text-slate-400">Maturity: {bond.maturity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <RatingBadge rating={bond.rating} />
                    </div>
                    <Badge className={cn('mt-2', recommendationColor)}>
                      {bond.aiRecommendation}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Current Yield */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-teal-400" />
                      <span className="text-slate-300">Current Yield to Maturity</span>
                    </div>
                    <span className="text-2xl font-bold text-teal-400">{bond.currentYield}%</span>
                  </div>
                </div>

                {/* Ratings */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Yield Rating</p>
                    <ScoreBar value={bond.yieldRating} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Duration Risk</p>
                    <ScoreBar value={10 - bond.durationRisk} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Default Risk</p>
                    <ScoreBar value={10 - bond.defaultRisk} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Overall Score</p>
                    <ScoreBar value={(bond.yieldRating + (10 - bond.durationRisk) + (10 - bond.defaultRisk)) / 3} />
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
