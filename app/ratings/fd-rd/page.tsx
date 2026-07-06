'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const fdrdRatings = [
  {
    name: 'State Bank of India FD',
    provider: 'SBI',
    type: 'Bank FD',
    rate: 7.1,
    tenure: '1 Year',
    safetyScore: 9.8,
    taxEfficiency: 6.5,
    liquidityScore: 7.2,
    interestRateScore: 8.2,
    fdic: true,
  },
  {
    name: 'HDFC Bank Senior FD',
    provider: 'HDFC Bank',
    type: 'Bank FD',
    rate: 7.3,
    tenure: '1 Year',
    safetyScore: 9.9,
    taxEfficiency: 6.8,
    liquidityScore: 7.5,
    interestRateScore: 8.5,
    fdic: true,
  },
  {
    name: 'Axis Bank Tax Saver FD',
    provider: 'Axis Bank',
    type: 'Tax-Saving FD',
    rate: 8.0,
    tenure: '5 Year',
    safetyScore: 9.8,
    taxEfficiency: 9.2,
    liquidityScore: 5.0,
    interestRateScore: 9.1,
    fdic: true,
  },
  {
    name: 'Bajaj Finance FD',
    provider: 'Bajaj Finance',
    type: 'NBFC FD',
    rate: 8.5,
    tenure: '1 Year',
    safetyScore: 8.2,
    taxEfficiency: 7.0,
    liquidityScore: 6.5,
    interestRateScore: 9.5,
    fdic: false,
  },
  {
    name: 'ICICI Prudential RD',
    provider: 'ICICI Bank',
    type: 'Recurring Deposit',
    rate: 6.8,
    tenure: 'Monthly',
    safetyScore: 9.9,
    taxEfficiency: 6.2,
    liquidityScore: 4.5,
    interestRateScore: 7.8,
    fdic: true,
  },
  {
    name: 'Kotak Bank FD',
    provider: 'Kotak Mahindra',
    type: 'Bank FD',
    rate: 7.25,
    tenure: '1 Year',
    safetyScore: 9.8,
    taxEfficiency: 6.6,
    liquidityScore: 7.3,
    interestRateScore: 8.3,
    fdic: true,
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

export default function FDRDRatingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">FD/RD Products Ratings</h1>
        <p className="text-slate-400">Fixed Deposits and Recurring Deposits rated on safety, returns, tax efficiency, and liquidity</p>
      </div>

      <div className="grid gap-6">
        {fdrdRatings.map((product) => {
          const overallScore = (product.safetyScore + product.interestRateScore + product.taxEfficiency + product.liquidityScore) / 4

          return (
            <Card key={product.name} className="border-slate-700 hover:border-teal-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{product.type}</Badge>
                      <Badge variant="outline" className="bg-slate-800">{product.provider}</Badge>
                      <p className="text-sm text-slate-400">Tenure: {product.tenure}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {product.fdic && (
                        <Shield className="h-5 w-5 text-green-400" title="FDIC Protected" />
                      )}
                    </div>
                    <p className="text-3xl font-bold text-teal-400 mt-2">{product.rate}%</p>
                    <p className="text-xs text-slate-400 mt-1">Interest Rate</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Overall Score */}
                <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-lg p-4 border border-teal-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Overall Rating</span>
                    <span className="text-2xl font-bold text-teal-400">{overallScore.toFixed(1)}/10</span>
                  </div>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      <p className="text-sm text-slate-400">Safety Score</p>
                    </div>
                    <ScoreBar value={product.safetyScore} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <p className="text-sm text-slate-400">Interest Rate Score</p>
                    </div>
                    <ScoreBar value={product.interestRateScore} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Tax Efficiency Score</p>
                    <ScoreBar value={product.taxEfficiency} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Liquidity Score</p>
                    <ScoreBar value={product.liquidityScore} />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400">
                    {product.fdic ? '✓ Bank FD - Deposits insured up to ₹5 lakhs' : '⚠ NBFC FD - Check credit rating before investing'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
