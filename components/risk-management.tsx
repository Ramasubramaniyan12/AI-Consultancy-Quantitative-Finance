'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { AlertCircle, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RiskManagement() {
  const [stressScenario, setStressScenario] = useState<'normal' | 'crash5' | 'crash10' | 'rateHike' | 'cryptoCrash'>('normal')
  const [portfolioValue] = useState(500000)

  const scenarios = {
    normal: { label: 'Normal Market', impact: 0, change: '+2.4%', color: 'text-green-500' },
    crash5: { label: 'Market Crash (-5%)', impact: -25000, change: '-5.0%', color: 'text-red-500' },
    crash10: { label: 'Market Crash (-10%)', impact: -50000, change: '-10.0%', color: 'text-red-600' },
    rateHike: { label: 'Interest Rate Hike (+2%)', impact: -18000, change: '-3.6%', color: 'text-orange-500' },
    cryptoCrash: { label: 'Crypto Crash (-40%)', impact: -12000, change: '-2.4%', color: 'text-red-500' },
  }

  const currentScenario = scenarios[stressScenario]
  const projectedValue = portfolioValue + currentScenario.impact

  return (
    <div className="space-y-6">
      {/* Risk Alerts */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="font-medium text-red-900 dark:text-red-100">Concentration Risk</p>
            <p className="text-sm text-red-700 dark:text-red-200">Top 3 holdings represent 32.5% of portfolio (threshold: 30%)</p>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="font-medium text-yellow-900 dark:text-yellow-100">High Volatility</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">Crypto holdings showing 15.2% daily volatility</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="font-medium text-blue-900 dark:text-blue-100">VaR Threshold</p>
            <p className="text-sm text-blue-700 dark:text-blue-200">Daily VaR at 95% confidence: ₹10,500 (2.1% of portfolio)</p>
          </div>
        </CardContent>
      </Card>

      {/* Stress Testing Simulator */}
      <Card>
        <CardHeader>
          <CardTitle>Stress Testing Simulator</CardTitle>
          <p className="text-xs text-muted-foreground mt-2">See how your portfolio performs under different market conditions</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => setStressScenario(key as any)}
                className={cn(
                  'p-4 border rounded-lg text-left transition-all',
                  stressScenario === key ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'hover:border-gray-400'
                )}
              >
                <p className="font-medium">{scenario.label}</p>
                <p className={cn('text-sm mt-2 font-bold', scenario.color)}>
                  {scenario.impact < 0 ? '-' : ''}₹{Math.abs(scenario.impact).toLocaleString()}
                </p>
              </button>
            ))}
          </div>

          {/* Impact Display */}
          <div className="p-6 bg-muted rounded-lg mt-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold">₹{portfolioValue.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Projected Value</p>
                <p className={cn('text-2xl font-bold', currentScenario.change.startsWith('-') ? 'text-red-500' : 'text-green-500')}>
                  ₹{projectedValue.toLocaleString()}
                </p>
                <p className={cn('text-xs mt-1 font-medium', currentScenario.color)}>{currentScenario.change}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VaR Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Value at Risk (VaR) Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Confidence Level: 95%</label>
              <Slider defaultValue={[95]} min={80} max={99} step={1} className="mt-2" />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Daily VaR (95% confidence)</p>
              <p className="text-2xl font-bold text-red-500 mt-1">-₹10,500 (-2.1%)</p>
              <p className="text-xs text-muted-foreground mt-2">There is 95% probability that daily loss won't exceed this amount</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Weekly VaR (95% confidence)</p>
              <p className="text-2xl font-bold text-red-500 mt-1">-₹23,450 (-4.7%)</p>
              <p className="text-xs text-muted-foreground mt-2">There is 95% probability that weekly loss won't exceed this amount</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Position Sizing Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Position Sizing Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Risk per Trade: 1%</label>
              <Slider defaultValue={[1]} min={0.5} max={5} step={0.5} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">₹5,000 per trade</p>
            </div>
            <div>
              <label className="text-sm font-medium">Stop Loss (Pips): 50</label>
              <Slider defaultValue={[50]} min={20} max={200} step={10} className="mt-2" />
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg mt-4">
            <p className="text-sm font-medium">Recommended Position Size</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">2,000 units</p>
            <p className="text-xs text-muted-foreground mt-2">Based on ₹5,000 risk and 50 pips stop loss</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
