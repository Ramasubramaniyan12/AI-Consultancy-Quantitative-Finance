'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  tooltip: string
  unit?: string
  trend?: number
}

function MetricCard({ label, value, tooltip, unit = '', trend }: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-bold mt-2">{value}{unit}</p>
          {trend !== undefined && (
            <p className={cn('text-xs mt-1 font-medium', trend >= 0 ? 'text-green-500' : 'text-red-500')}>
              {trend >= 0 ? '+' : ''}{trend.toFixed(2)}%
            </p>
          )}
        </div>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Info className="w-4 h-4" />
          </button>
          {showTooltip && (
            <div className="absolute right-8 top-0 w-48 p-2 bg-popover border rounded-lg shadow-lg text-xs whitespace-normal z-50">
              {tooltip}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function QuantMetricsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quantitative Metrics</CardTitle>
          <p className="text-xs text-muted-foreground mt-2">Hover over info icons for detailed explanations</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              label="Sharpe Ratio"
              value="2.34"
              tooltip="Measures risk-adjusted returns. Higher is better. > 1 is good, > 2 is excellent."
              trend={0.45}
            />
            <MetricCard
              label="Sortino Ratio"
              value="3.12"
              tooltip="Like Sharpe Ratio but only penalizes downside volatility. More useful than Sharpe for real portfolios."
              trend={0.78}
            />
            <MetricCard
              label="Alpha"
              value="4.5"
              unit="%"
              tooltip="Excess return above the benchmark. Positive alpha means outperformance."
              trend={1.2}
            />
            <MetricCard
              label="Beta"
              value="0.85"
              tooltip="Measures portfolio sensitivity to market movements. 1.0 = market, < 1 = less volatile than market."
              trend={-0.15}
            />
            <MetricCard
              label="CAGR"
              value="18.5"
              unit="%"
              tooltip="Compound Annual Growth Rate - annualized return over the investment period."
              trend={2.3}
            />
            <MetricCard
              label="Max Drawdown"
              value="-12.4"
              unit="%"
              tooltip="Largest peak-to-trough decline during investment period. Lower (closer to 0) is better."
              trend={0.05}
            />
            <MetricCard
              label="Portfolio Volatility"
              value="8.2"
              unit="%"
              tooltip="Standard deviation of returns. Measures portfolio risk. Lower = more stable."
              trend={-0.3}
            />
            <MetricCard
              label="Value at Risk (VaR 95%)"
              value="-2.1"
              unit="%"
              tooltip="95% confidence that daily loss won't exceed this percentage. Conservative risk measure."
              trend={0}
            />
            <MetricCard
              label="Diversification Score"
              value="7.8"
              unit="/10"
              tooltip="Measures how well portfolio is diversified across assets. 10 = perfectly diversified."
              trend={0.4}
            />
            <MetricCard
              label="Concentration Risk"
              value="32.5"
              unit="%"
              tooltip="Percentage of portfolio in top 3 holdings. Lower is better for diversification."
              trend={-1.2}
            />
            <MetricCard
              label="Correlation"
              value="0.42"
              tooltip="Average correlation between portfolio holdings. Lower = better diversification benefits."
              trend={-0.08}
            />
            <MetricCard
              label="Sector Concentration"
              value="28.3"
              unit="%"
              tooltip="Percentage of portfolio in top sector. Diversify if > 30%."
              trend={0.6}
            />
          </div>
        </CardContent>
      </Card>

      {/* Correlation Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Correlation Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block">
              {/* Simplified correlation matrix visualization */}
              <div className="grid gap-2 p-4">
                {[
                  ['INFY', '1.00', '0.45', '-0.12', '0.67'],
                  ['RELIANCE', '0.45', '1.00', '0.23', '0.34'],
                  ['GOLD', '-0.12', '0.23', '1.00', '-0.45'],
                  ['BTC', '0.67', '0.34', '-0.45', '1.00'],
                ].map((row, i) => (
                  <div key={i} className="flex gap-2">
                    {row.map((cell, j) => {
                      const val = parseFloat(cell)
                      const isNaN = !cell.match(/\d/)
                      const color = isNaN ? 'bg-gray-200' : val > 0.5 ? 'bg-red-400' : val > 0.2 ? 'bg-yellow-300' : val > -0.2 ? 'bg-green-300' : 'bg-blue-400'
                      return (
                        <div key={j} className={cn('w-20 h-12 flex items-center justify-center rounded text-xs font-medium', color, 'text-black')}>
                          {cell}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
