'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PortfolioGaugeProps {
  score?: number
}

export function PortfolioGauge({ score = 72 }: PortfolioGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayScore(prev => {
        if (prev < score) return Math.min(prev + 1, score)
        return prev
      })
    }, 20)
    return () => clearInterval(timer)
  }, [score])

  const getStatus = (s: number) => {
    if (s >= 80) return { label: 'Excellent', color: 'text-green-500', bg: 'from-green-500 to-emerald-500' }
    if (s >= 60) return { label: 'Good', color: 'text-blue-500', bg: 'from-blue-500 to-cyan-500' }
    if (s >= 40) return { label: 'Moderate Risk', color: 'text-yellow-500', bg: 'from-yellow-500 to-orange-500' }
    if (s >= 20) return { label: 'High Risk', color: 'text-orange-500', bg: 'from-orange-500 to-red-500' }
    return { label: 'Poor', color: 'text-red-500', bg: 'from-red-500 to-rose-500' }
  }

  const status = getStatus(displayScore)
  const rotation = (displayScore / 100) * 180 - 90

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Health Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-48 h-48 rounded-full border-8 border-muted bg-muted/50 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <div className={cn('absolute w-1 h-20 bg-gradient-to-r', status.bg)} style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center 100px' }} />
            </div>
            <div className="text-center">
              <p className={cn('text-5xl font-bold', status.color)}>{displayScore}</p>
              <p className="text-xs text-muted-foreground mt-1">out of 100</p>
            </div>
          </div>
          <p className={cn('text-lg font-semibold mt-4', status.color)}>{status.label}</p>

          {/* Status Indicators */}
          <div className="w-full mt-8 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Diversification: Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">Volatility: Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm">Risk/Return: Balanced</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
