'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const chartData = [
  { month: 'Feb', value: 1000000 },
  { month: 'Mar', value: 1050000 },
  { month: 'Apr', value: 1120000 },
  { month: 'May', value: 1180000 },
  { month: 'Jun', value: 1150000 },
  { month: 'Jul', value: 1220000 },
  { month: 'Aug', value: 1310000 },
  { month: 'Sep', value: 1280000 },
  { month: 'Oct', value: 1350000 },
  { month: 'Nov', value: 1320000 },
  { month: 'Dec', value: 1324500 },
]

export function PortfolioChart() {
  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
      <CardHeader>
        <CardTitle className="text-lg text-[var(--text-primary)]">Portfolio Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--icon-green-text)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--icon-green-text)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke="var(--text-muted)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: `1px solid var(--border-color)`,
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
              formatter={(value) => `₹${(value as number).toLocaleString('en-IN')}`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--icon-green-text)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
