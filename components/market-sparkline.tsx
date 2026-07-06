'use client'

import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface MarketSparklineProps {
  data: Array<{ value: number }>
  isPositive: boolean
}

export function MarketSparkline({ data, isPositive }: MarketSparklineProps) {
  const color = isPositive ? '#16A34A' : '#DC2626'
  const fillColor = isPositive ? '#DCFCE7' : '#FEE2E2'

  return (
    <div className="w-12 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={fillColor}
            isAnimationActive={false}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
